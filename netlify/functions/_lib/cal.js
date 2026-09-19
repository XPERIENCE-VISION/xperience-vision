/**
 * CAL.COM API — création/annulation de bookings côté serveur
 *
 * Utilisé pour le flow "RDV avant paiement" :
 *   1. Le frontend collecte la sélection de créneau via embed Cal.com
 *   2. On crée le booking via API avec metadata "pending_payment"
 *   3. Si paiement OK → webhook Stripe ne touche à rien (le booking est déjà actif)
 *   4. Si paiement expiré → webhook Stripe appelle cancelBooking()
 *
 * Doc API : https://cal.com/docs/api-reference
 */

const CAL_API_BASE = 'https://api.cal.com/v1';

function getApiKey() {
    const key = process.env.CAL_API_KEY;
    if (!key) throw new Error('CAL_API_KEY missing — récupère sur app.cal.com/settings/developer/api-keys');
    return key;
}

/**
 * Annule un booking Cal.com par son UID.
 * @param {string} bookingUid - UID retourné par Cal.com lors de la création
 * @param {string} [reason] - raison affichée dans Cal et envoyée au client si Cal envoie un email
 * @returns {Promise<Object>}
 */
async function cancelBooking(bookingUid, reason = 'Paiement non finalisé dans le délai imparti') {
    const apiKey = getApiKey();
    const url = `${CAL_API_BASE}/bookings/${encodeURIComponent(bookingUid)}/cancel?apiKey=${encodeURIComponent(apiKey)}`;

    const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
    });

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Cal.com cancelBooking failed (${res.status}): ${text.slice(0, 200)}`);
    }
    return res.json().catch(() => ({}));
}

/**
 * Récupère les détails d'un booking par son UID.
 * Utilisé pour récupérer la date/heure/lieu au moment d'envoyer les emails de confirmation.
 */
async function getBooking(bookingUid) {
    const apiKey = getApiKey();
    const url = `${CAL_API_BASE}/bookings/${encodeURIComponent(bookingUid)}?apiKey=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url);
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Cal.com getBooking failed (${res.status}): ${text.slice(0, 200)}`);
    }
    return res.json();
}

/**
 * Extrait l'objet booking d'une réponse Cal.com v1, qui l'enveloppe parfois
 * dans { booking: {...} } et parfois non.
 */
function extraireBooking(reponse) {
    if (!reponse || typeof reponse !== 'object') return null;
    if (reponse.booking && typeof reponse.booking === 'object') return reponse.booking;
    return reponse;
}

/**
 * Le rendez-vous appartient-il bien à cet acheteur ?
 *
 * Sans ce contrôle, n'importe qui pouvait passer l'UID du rendez-vous d'un
 * autre client : à la création pour s'approprier son créneau, et surtout au
 * moment de l'annulation, où une session Stripe abandonnée aurait annulé le
 * rendez-vous d'un tiers.
 *
 * @param {Object} reponse - réponse brute de getBooking()
 * @param {string} email - e-mail de l'acheteur
 * @returns {{ trouve: boolean, appartient: boolean, statut: string|null }}
 */
function controlerAppartenance(reponse, email) {
    const booking = extraireBooking(reponse);
    if (!booking || (!booking.uid && !booking.id)) {
        return { trouve: false, appartient: false, statut: null };
    }

    const statut = String(booking.status || '').toLowerCase() || null;
    const attendu = String(email || '').trim().toLowerCase();
    if (!attendu) return { trouve: true, appartient: false, statut };

    const candidats = [];
    if (Array.isArray(booking.attendees)) {
        booking.attendees.forEach(a => { if (a && a.email) candidats.push(a.email); });
    }
    if (booking.attendeeEmail) candidats.push(booking.attendeeEmail);
    if (booking.responses && booking.responses.email) candidats.push(booking.responses.email);

    const appartient = candidats.some(e => String(e).trim().toLowerCase() === attendu);
    return { trouve: true, appartient, statut };
}

module.exports = { cancelBooking, getBooking, controlerAppartenance, extraireBooking };
