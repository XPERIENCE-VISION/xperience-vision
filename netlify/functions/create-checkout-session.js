/**
 * NETLIFY FUNCTION : create-checkout-session
 *
 * Crée une session Stripe Checkout en mode EMBEDDED (affichée dans une modal
 * du site, pas en redirection). Le frontend récupère le clientSecret pour
 * monter l'embedded checkout via Stripe.js.
 *
 * Body attendu :
 * {
 *   "items": { "<id-produit>": <quantité>, ... },
 *   "customer": {
 *       "prenom": "...", "nom": "...", "email": "...",
 *       "telephone": "...", "adresse": "...",
 *       "marque": "...", "modele": "...", "immatriculation": "..."  // si service
 *   },
 *   "lieuRdv": { "type": "domicile"|"garage", "label": "...", "adresse": "..." } | null,
 *   "calBookingUid": "abc-123" | null    // requis si au moins 1 service
 * }
 *
 * Réponse : { "clientSecret": "cs_...", "publishableKey": "pk_..." }
 *
 * Le panier peut mixer produits + services. La présence d'au moins un service
 * déclenche : expires_at=+1h, collecte plaque/marque/modèle/lieu RDV, email
 * de confirmation RDV supplémentaire (côté webhook).
 */

const Stripe = require('stripe');
const { getProduct } = require('./_lib/products');

function getStripe() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY missing');
    return new Stripe(key, { apiVersion: '2024-10-28.acacia' });
}

const HOLD_DURATION_SECONDS = 60 * 60; // 1 heure

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    let payload;
    try {
        payload = JSON.parse(event.body || '{}');
    } catch {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
    }

    const { items, customer, lieuRdv, calBookingUid } = payload;

    if (!items || typeof items !== 'object' || Object.keys(items).length === 0) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'items must be a non-empty object' }) };
    }
    if (!customer || typeof customer !== 'object') {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'customer is required' }) };
    }
    if (!customer.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'customer.email is required and must be valid' }) };
    }

    // ---------- Validation server-side des items et construction des line_items ----------
    const lineItems = [];
    const itemsForMetadata = [];
    let hasServices = false;
    let hasProducts = false;

    for (const [productId, qty] of Object.entries(items)) {
        const qtyNum = Math.max(1, Math.min(99, parseInt(qty, 10) || 0));
        const product = getProduct(productId);

        if (!product) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: `Unknown product: ${productId}` }) };
        }
        if (product.price <= 0) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: `Product ${productId} is on quote only — please contact us` }) };
        }

        if (product.type === 'service') hasServices = true;
        if (product.type === 'produit') hasProducts = true;

        lineItems.push({
            quantity: qtyNum,
            price_data: {
                currency: 'eur',
                unit_amount: product.price,
                product_data: { name: product.name }
            }
        });
        itemsForMetadata.push(`${productId}:${qtyNum}`);
    }

    // Si au moins un service → on exige les infos véhicule + lieu RDV + booking
    if (hasServices) {
        if (!customer.marque || !customer.modele || !customer.immatriculation) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Vehicle info (marque/modele/immatriculation) required for services' }) };
        }
        if (!lieuRdv || (lieuRdv.type !== 'domicile' && lieuRdv.type !== 'garage')) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'lieuRdv required for services (domicile|garage)' }) };
        }
        if (!calBookingUid) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'calBookingUid required for services' }) };
        }
    }

    // ---------- Construction de la session Stripe ----------
    const stripe = getStripe();
    const siteUrl = (process.env.SITE_URL || 'http://localhost:8888').replace(/\/$/, '');

    const customerFullName = `${customer.prenom || ''} ${customer.nom || ''}`.trim();

    const sessionParams = {
        mode: 'payment',
        ui_mode: 'embedded',
        line_items: lineItems,
        locale: 'fr',
        allow_promotion_codes: false,
        return_url: `${siteUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        customer_email: customer.email,

        // Métadonnées passées au webhook
        metadata: {
            items: itemsForMetadata.join(',').slice(0, 480),
            has_services: hasServices ? 'true' : 'false',
            has_products: hasProducts ? 'true' : 'false',
            customer_prenom: (customer.prenom || '').slice(0, 50),
            customer_nom: (customer.nom || '').slice(0, 50),
            customer_tel: (customer.telephone || '').slice(0, 30),
            customer_adresse: (customer.adresse || '').slice(0, 200),
            customer_cp: (customer.code_postal || '').slice(0, 10),
            customer_ville: (customer.ville || '').slice(0, 80),
            customer_marque: (customer.marque || '').slice(0, 40),
            customer_modele: (customer.modele || '').slice(0, 40),
            customer_immat: (customer.immatriculation || '').slice(0, 15),
            lieu_rdv_type: lieuRdv?.type || '',
            lieu_rdv_label: (lieuRdv?.label || '').slice(0, 80),
            lieu_rdv_adresse: (lieuRdv?.adresse || '').slice(0, 200),
            cal_booking_uid: calBookingUid || ''
        },
        payment_intent_data: {
            metadata: {
                has_services: hasServices ? 'true' : 'false',
                cal_booking_uid: calBookingUid || ''
            }
        }
    };

    // Descriptif de commande dans Stripe (indicatif)
    if (customerFullName) {
        sessionParams.payment_intent_data.description =
            `Commande XperienceVision — ${customerFullName}${hasServices ? ' (service + RDV)' : ''}`;
    }

    // CGV — toujours requis
    sessionParams.consent_collection = { terms_of_service: 'required' };
    sessionParams.custom_text = {
        submit: {
            message: hasServices
                ? 'En validant, vous acceptez les CGV. Votre RDV sera confirmé après paiement.'
                : 'Livraison sous 3 à 5 jours ouvrés. En validant, vous acceptez les CGV.'
        },
        terms_of_service_acceptance: {
            message: `J'accepte les [Conditions Générales de Vente](${siteUrl}/cgv.html).`
        }
    };

    // ----- Spécifique SERVICES : hold 1h -----
    if (hasServices) {
        sessionParams.expires_at = Math.floor(Date.now() / 1000) + HOLD_DURATION_SECONDS;
    }

    // ----- Spécifique PRODUITS (livraison) -----
    if (hasProducts) {
        sessionParams.shipping_address_collection = {
            allowed_countries: ['FR']
        };
        sessionParams.shipping_options = [{
            shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: { amount: 0, currency: 'eur' },
                display_name: 'Livraison standard offerte',
                delivery_estimate: {
                    minimum: { unit: 'business_day', value: 3 },
                    maximum: { unit: 'business_day', value: 5 }
                }
            }
        }];
    }

    try {
        const session = await stripe.checkout.sessions.create(sessionParams);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                clientSecret: session.client_secret,
                id: session.id,
                publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || null
            })
        };
    } catch (err) {
        console.error('[Stripe] create session error:', err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Stripe error', detail: err.message || String(err) })
        };
    }
};
