/**
 * NETLIFY FUNCTION : stripe-webhook
 *
 * Reçoit les events Stripe (POST avec signature HMAC).
 *
 * Events gérés :
 *   - checkout.session.completed → emails (admin + client commande + client RDV si service)
 *   - checkout.session.expired   → annule le booking Cal (pas payé dans la fenêtre 1h)
 *   - checkout.session.async_payment_succeeded → comme completed
 *   - checkout.session.async_payment_failed   → annule booking Cal
 */

const Stripe = require('stripe');
const { getProduct } = require('./_lib/products');
const { sendMail } = require('./_lib/mailer');
const { adminOrder, clientOrder } = require('./_lib/templates');
const { cancelBooking, getBooking, controlerAppartenance } = require('./_lib/cal');
const { enregistrerCommande, marquerEvenement, terminerEvenement, demarquerEvenement } = require('./_lib/stockage');

function getStripe() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY missing');
    return new Stripe(key, { apiVersion: '2024-10-28.acacia' });
}

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const sig = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !secret) {
        console.error('[webhook] Missing signature or webhook secret');
        return { statusCode: 400, body: 'Missing signature or secret' };
    }

    const stripe = getStripe();
    let stripeEvent;

    try {
        const rawBody = event.isBase64Encoded
            ? Buffer.from(event.body, 'base64').toString('utf8')
            : event.body;
        stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, secret);
    } catch (err) {
        console.error('[webhook] Signature verification failed:', err.message);
        return { statusCode: 400, body: `Webhook signature verification failed: ${err.message}` };
    }

    console.log(`[webhook] Received event: ${stripeEvent.type} (id=${stripeEvent.id})`);

    // Idempotence en deux temps. Stripe réémet un event tant qu'il n'a pas reçu
    // de 200, et peut l'émettre plusieurs fois même après : sans garde-fou, le
    // client recevait deux fois le même e-mail et l'atelier deux fois le même bon.
    // L'event est d'abord ouvert, puis clôturé seulement si le traitement a
    // réussi. Un event ouvert mais jamais clôturé (fonction tuée en plein vol)
    // redevient traitable au bout de deux minutes — sinon la commande serait
    // perdue en silence, ce qui est bien pire qu'un e-mail en double.
    const aTraiter = await marquerEvenement(stripeEvent.id, stripeEvent.type);
    if (!aTraiter) {
        return { statusCode: 200, body: JSON.stringify({ received: true, duplicate: true }) };
    }

    try {
        switch (stripeEvent.type) {
            case 'checkout.session.completed':
            case 'checkout.session.async_payment_succeeded':
                await handlePaid(stripe, stripeEvent.data.object);
                break;

            case 'checkout.session.expired':
            case 'checkout.session.async_payment_failed':
                await handleNotPaid(stripeEvent.data.object);
                break;

            default:
                console.log(`[webhook] Event ${stripeEvent.type} ignored`);
        }
        await terminerEvenement(stripeEvent.id, stripeEvent.type);
        return { statusCode: 200, body: JSON.stringify({ received: true }) };
    } catch (err) {
        console.error(`[webhook] Handler error for ${stripeEvent.type}:`, err);
        // Le traitement a échoué : on retire la marque d'idempotence pour que
        // la réémission de Stripe soit bien reprise, sinon la commande est perdue.
        await demarquerEvenement(stripeEvent.id);
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};

// ----------------- Handlers -----------------

async function handlePaid(stripe, session) {
    // Récupère la session complète
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items', 'customer_details', 'shipping_details', 'payment_intent']
    });

    const meta = fullSession.metadata || {};
    // Source de vérité : les line_items Stripe. Le champ metadata.items est
    // tronqué à 480 caractères par l'API Stripe, donc faux au-delà d'une
    // quarantaine d'articles — le bon de commande était alors incomplet.
    const items = itemsDepuisStripe(fullSession) || parseItems(meta.items || '');
    const hasServices = meta.has_services === 'true';
    const hasProducts = meta.has_products === 'true';
    const calBookingUid = meta.cal_booking_uid || null;

    // Le customer vient désormais du formulaire pré-paiement (metadata), pas de Stripe
    const customer = {
        prenom: meta.customer_prenom || '',
        nom: meta.customer_nom || '',
        email: fullSession.customer_details?.email || fullSession.customer_email || '',
        telephone: meta.customer_tel || fullSession.customer_details?.phone || '',
        adresse: meta.customer_adresse || '',
        code_postal: meta.customer_cp || '',
        ville: meta.customer_ville || '',
        marque: meta.customer_marque || '',
        modele: meta.customer_modele || '',
        immatriculation: meta.customer_immat || ''
    };

    const lieuRdv = meta.lieu_rdv_type ? {
        type: meta.lieu_rdv_type,
        label: meta.lieu_rdv_label || '',
        adresse: meta.lieu_rdv_adresse || ''
    } : null;

    // Récupère le booking Cal pour avoir la date/heure du RDV
    let booking = null;
    if (calBookingUid) {
        try {
            booking = await getBooking(calBookingUid);
        } catch (err) {
            console.error(`[webhook] Cannot fetch Cal booking ${calBookingUid}:`, err.message);
        }
    }

    const adminEmail = process.env.CONTACT_EMAIL || 'contact@xperience-vision.fr';
    const customerFullName = `${customer.prenom} ${customer.nom}`.trim() || 'Client';

    // La commande est enregistrée AVANT tout le reste — y compris avant le
    // garde-fou sur l'e-mail manquant. C'est précisément le cas où la commande
    // est payée mais non confirmable qu'il ne faut surtout pas perdre.
    await enregistrerCommande(fullSession.id, {
        session_id: fullSession.id,
        payment_intent: typeof fullSession.payment_intent === 'object'
            ? fullSession.payment_intent?.id
            : fullSession.payment_intent || null,
        amount_total: fullSession.amount_total,
        currency: fullSession.currency,
        payment_status: fullSession.payment_status,
        client: customer,
        articles: items,
        lieu_rdv: lieuRdv,
        cal_booking_uid: calBookingUid,
        adresse_livraison: fullSession.shipping_details || fullSession.collected_information?.shipping_details || null,
        a_des_services: hasServices,
        a_des_produits: hasProducts
    });

    if (!customer.email) {
        console.error(`[webhook] ⚠ Commande ${fullSession.id} PAYÉE mais sans e-mail client : ` +
                      `enregistrée, aucune confirmation envoyable. À traiter à la main.`);
        return;
    }

    console.log(`[webhook] Envoi emails — admin=${adminEmail} · client=${customer.email}`);

    // 1. EMAIL ADMIN — récap complet de la commande
    try {
        const info = await sendMail({
            to: adminEmail,
            subject: `[XPERIENCE VISION] Nouvelle commande ${hasServices ? (hasProducts ? 'mixte' : 'service') : 'produit'} — ${customerFullName}`,
            html: adminOrder({ session: fullSession, items, customer, lieuRdv, booking, hasServices, hasProducts })
        });
        console.log(`[webhook] ✔ Email admin envoyé à ${adminEmail} — ${info.messageId || ''}`);
    } catch (err) {
        console.error('[webhook] ✗ Admin email FAILED:', err.message);
        console.error(err);
    }

    // 2. EMAIL CLIENT — confirmation de commande
    try {
        const info = await sendMail({
            to: customer.email,
            replyTo: adminEmail,
            subject: 'Confirmation de votre commande XPERIENCE VISION',
            html: clientOrder({ session: fullSession, items, customer, lieuRdv, booking, hasServices, hasProducts })
        });
        console.log(`[webhook] ✔ Email client envoyé à ${customer.email} — ${info.messageId || ''}`);
    } catch (err) {
        console.error('[webhook] ✗ Client email FAILED:', err.message);
        console.error(err);
    }

    // Note : l'email "RDV confirmé" est désormais géré par Cal.com (qui envoie
    // automatiquement un email booking au client avec fichier ICS + lien manage,
    // et un email au propriétaire du calendrier). Inutile de doublonner.

    console.log(`[webhook] handlePaid OK for session ${session.id}`);
}

async function handleNotPaid(session) {
    const calBookingUid = session.metadata?.cal_booking_uid;
    if (!calBookingUid) {
        console.log(`[webhook] Session ${session.id} expired without booking, nothing to cancel`);
        return;
    }

    // Barrière décisive : on ne détruit le rendez-vous de personne sans avoir
    // vérifié qu'il appartient bien à l'acheteur de cette session. Une session
    // abandonnée portant l'UID d'un tiers aurait sinon annulé son créneau.
    // On lit l'e-mail à trois endroits : sur une session expirée, customer_details
    // peut être vide. Sans e-mail, le contrôle d'appartenance refuse d'annuler et
    // le créneau resterait bloqué pour rien.
    const emailAcheteur = session.customer_details?.email
        || session.customer_email
        || session.metadata?.customer_email
        || '';
    try {
        const reponse = await getBooking(calBookingUid);
        const { trouve, appartient, statut } = controlerAppartenance(reponse, emailAcheteur);

        if (!trouve) {
            console.log(`[webhook] Rendez-vous ${calBookingUid} introuvable — rien à annuler`);
            return;
        }
        if (statut === 'cancelled' || statut === 'rejected') {
            console.log(`[webhook] Rendez-vous ${calBookingUid} déjà inactif (${statut}) — rien à faire`);
            return;
        }
        if (!appartient) {
            console.warn(
                `[webhook] ⚠ ANNULATION REFUSÉE — le rendez-vous ${calBookingUid} n'appartient pas ` +
                `à ${emailAcheteur || '(e-mail inconnu)'} (session ${session.id}). Aucun créneau touché.`
            );
            return;
        }
    } catch (err) {
        // API Cal.com injoignable : on s'abstient. Un rendez-vous gardé en trop se
        // règle par un appel ; un rendez-vous annulé à tort fait perdre un client.
        console.error(
            `[webhook] Contrôle d'appartenance impossible pour ${calBookingUid} (${err.message}) ` +
            `— annulation NON effectuée par précaution`
        );
        return;
    }

    try {
        await cancelBooking(calBookingUid, 'Paiement non finalisé dans le délai imparti (1h)');
        console.log(`[webhook] Cancelled Cal booking ${calBookingUid} after Stripe session expired`);
    } catch (err) {
        console.error(`[webhook] Failed to cancel Cal booking ${calBookingUid}:`, err.message);
    }
}

// ----------------- Utils -----------------

/**
 * Reconstruit la liste des articles depuis les line_items Stripe.
 * Les métadonnées ne servent plus qu'à retrouver le type (produit / service).
 * Renvoie null si les line_items ne sont pas exploitables — l'appelant retombe
 * alors sur parseItems().
 */
function itemsDepuisStripe(fullSession) {
    const lignes = fullSession?.line_items?.data;
    if (!Array.isArray(lignes) || lignes.length === 0) return null;

    // metadata.items donne le type de chaque référence, dans le même ordre.
    const typesParNom = new Map();
    for (const entree of String(fullSession.metadata?.items || '').split(',')) {
        const id = entree.split(':')[0];
        const produit = id && getProduct(id);
        if (produit) typesParNom.set(produit.name, { id, type: produit.type });
    }

    return lignes.map(ligne => {
        const nom = ligne.description || ligne.price?.product?.name || 'Article';
        const connu = typesParNom.get(nom);
        const qty = ligne.quantity || 1;
        return {
            id: connu?.id || nom,
            qty,
            name: nom,
            unitPrice: typeof ligne.price?.unit_amount === 'number'
                ? ligne.price.unit_amount
                : Math.round((ligne.amount_total || 0) / Math.max(1, qty)),
            type: connu?.type || 'unknown'
        };
    });
}

function parseItems(metadataString) {
    // Format : "PROD-001:2,PROD-002:1,..."
    if (!metadataString) return [];
    return metadataString.split(',').map(entry => {
        const [id, qtyStr] = entry.split(':');
        const product = getProduct(id);
        return {
            id,
            qty: parseInt(qtyStr, 10) || 1,
            name: product?.name || id,
            unitPrice: product?.price || 0,
            type: product?.type || 'unknown'
        };
    }).filter(it => it.id);
}
