/**
 * NETLIFY FUNCTION : stripe-config
 *
 * Expose la publishable key Stripe au frontend. Pas de secret ici.
 * Utilisée comme fallback si create-checkout-session ne renvoie pas la clé.
 */

exports.handler = async () => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
    };
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || null
        })
    };
};
