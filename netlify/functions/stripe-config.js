/**
 * NETLIFY FUNCTION : stripe-config
 *
 * Expose la publishable key Stripe au frontend. Pas de secret ici.
 * Utilisée comme fallback si create-checkout-session ne renvoie pas la clé.
 */

const { enTetesCors } = require('./_lib/cors');

exports.handler = async (event) => {
    const headers = enTetesCors(event, { 'Cache-Control': 'public, max-age=300' });
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || null
        })
    };
};
