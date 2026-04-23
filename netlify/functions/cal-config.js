/**
 * NETLIFY FUNCTION : cal-config
 *
 * Expose la config Cal.com publique : 2 event types différents selon le lieu
 * du RDV choisi par le client (domicile ou garage XPERIENCE VISION).
 *
 * Variables attendues :
 *   CAL_EVENT_DOMICILE : slug de l'event "installation à domicile"
 *     (ex: "xperiencevision/installation-domicile") — location = adresse du participant
 *   CAL_EVENT_GARAGE : slug de l'event "installation au garage"
 *     (ex: "xperiencevision/installation-garage") — location = adresse de l'organisateur
 *
 * Fallback : si CAL_EVENT_TYPE_ID est défini, il sert pour les deux.
 */

exports.handler = async () => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
    };
    const fallback = process.env.CAL_EVENT_TYPE_ID || null;
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            calLinkDomicile: process.env.CAL_EVENT_DOMICILE || fallback,
            calLinkGarage:   process.env.CAL_EVENT_GARAGE   || fallback,
            // Conservé pour rétro-compat si du code ancien consomme encore `calLink`
            calLink: fallback
        })
    };
};
