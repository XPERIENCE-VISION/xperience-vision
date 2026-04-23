/**
 * NETLIFY FUNCTION : test-email (DEV UNIQUEMENT)
 *
 * Déclenche manuellement l'envoi des 2 emails XPERIENCE VISION (admin + client) avec des
 * données fictives, pour tester la config SMTP sans passer par Stripe.
 *
 * Usage :
 *   http://localhost:8888/.netlify/functions/test-email
 *   http://localhost:8888/.netlify/functions/test-email?to=ton-email@test.com
 *
 * Cette route est désactivée automatiquement en production (NODE_ENV=production).
 */

const { sendMail } = require('./_lib/mailer');
const { adminOrder, clientOrder } = require('./_lib/templates');

exports.handler = async (event) => {
    // Sécurité : désactivé en prod
    if (process.env.NODE_ENV === 'production') {
        return {
            statusCode: 403,
            body: JSON.stringify({ error: 'Disabled in production' })
        };
    }

    const params = event.queryStringParameters || {};
    const clientEmail = params.to || 'eliot.isidore@gmail.com';
    const adminEmail = process.env.CONTACT_EMAIL || 'contact@xperience-vision.fr';

    // Session Stripe fictive
    const fakeSession = {
        id: 'cs_test_' + Math.random().toString(36).slice(2, 15).toUpperCase(),
        payment_intent: 'pi_test_' + Math.random().toString(36).slice(2, 15),
        customer_details: { email: clientEmail, phone: '0612345678' },
        shipping_details: null,
        customer_email: clientEmail
    };

    // Items de test : 1 service (écran) + 1 produit (accessoire)
    const items = [
        { id: 'ECR-PRE', qty: 1, name: 'Écran plafond 17.3" FHD Premium', unitPrice: 109900, type: 'service' },
        { id: 'INT-001', qty: 2, name: 'Tapis de sol premium',            unitPrice: 8900,   type: 'produit' }
    ];

    // Client de test
    const customer = {
        prenom: 'Jean',
        nom: 'Dupont',
        email: clientEmail,
        telephone: '06 12 34 56 78',
        adresse: '12 rue de la Paix',
        code_postal: '75002',
        ville: 'Paris',
        marque: 'Tesla',
        modele: 'Model Y',
        immatriculation: 'AA-123-BB'
    };

    // Lieu RDV : domicile
    const lieuRdv = {
        type: 'domicile',
        label: 'À domicile',
        adresse: '12 rue de la Paix · 75002 Paris'
    };

    // Booking Cal fictif
    const booking = {
        uid: 'fake-' + Math.random().toString(36).slice(2, 10),
        startTime: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString() // dans 7 jours
    };

    const commonArgs = {
        session: fakeSession,
        items,
        customer,
        lieuRdv,
        booking,
        hasServices: true,
        hasProducts: true
    };

    const results = { admin: null, client: null };

    // 1. Email admin
    try {
        const info = await sendMail({
            to: adminEmail,
            subject: `[TEST XPERIENCE VISION] Nouvelle commande mixte — ${customer.prenom} ${customer.nom}`,
            html: adminOrder(commonArgs)
        });
        results.admin = { ok: true, to: adminEmail, messageId: info.messageId };
    } catch (err) {
        results.admin = { ok: false, to: adminEmail, error: err.message };
    }

    // 2. Email client
    try {
        const info = await sendMail({
            to: clientEmail,
            replyTo: adminEmail,
            subject: '[TEST] Confirmation de votre commande XPERIENCE VISION',
            html: clientOrder(commonArgs)
        });
        results.client = { ok: true, to: clientEmail, messageId: info.messageId };
    } catch (err) {
        results.client = { ok: false, to: clientEmail, error: err.message };
    }

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: 'Test email envoyé — vérifie les boîtes (spams inclus)',
            env: {
                SMTP_HOST: process.env.SMTP_HOST || '(missing)',
                SMTP_PORT: process.env.SMTP_PORT || '(missing)',
                SMTP_USER: process.env.SMTP_USER ? process.env.SMTP_USER : '(missing)',
                SMTP_PASS: process.env.SMTP_PASS ? '••••••' : '(missing)',
                EMAIL_FROM: process.env.EMAIL_FROM || '(missing)',
                CONTACT_EMAIL: process.env.CONTACT_EMAIL || '(missing)'
            },
            results
        }, null, 2)
    };
};
