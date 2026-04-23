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
const { cancelBooking, getBooking } = require('./_lib/cal');

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
        return { statusCode: 200, body: JSON.stringify({ received: true }) };
    } catch (err) {
        console.error(`[webhook] Handler error for ${stripeEvent.type}:`, err);
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
    const items = parseItems(meta.items || '');
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

    if (!customer.email) {
        console.error('[webhook] No customer email in session, cannot send confirmation');
        return;
    }

    const adminEmail = process.env.CONTACT_EMAIL || 'contact@xperience-vision.fr';
    const customerFullName = `${customer.prenom} ${customer.nom}`.trim() || 'Client';

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
    try {
        await cancelBooking(calBookingUid, 'Paiement non finalisé dans le délai imparti (1h)');
        console.log(`[webhook] Cancelled Cal booking ${calBookingUid} after Stripe session expired`);
    } catch (err) {
        console.error(`[webhook] Failed to cancel Cal booking ${calBookingUid}:`, err.message);
    }
}

// ----------------- Utils -----------------

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
