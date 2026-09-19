/**
 * STOCKAGE — persistance des commandes et des events Stripe
 *
 * Jusqu'ici, une commande payée n'existait nulle part côté XPERIENCE VISION :
 * si l'envoi d'e-mail échouait, la commande était perdue. On écrit donc chaque
 * commande AVANT d'envoyer le moindre e-mail.
 *
 * Deux registres, via @netlify/blobs (déjà utilisé par le module Avis) :
 *   - `commandes`         : une entrée par session Stripe payée
 *   - `evenements-stripe` : une entrée par event, pour l'idempotence
 *
 * Deux règles de conception :
 *
 * 1. Le stockage ne doit JAMAIS faire échouer une commande. Si les blobs sont
 *    indisponibles, on journalise la commande complète en clair dans les logs
 *    Netlify avec un marqueur repérable, et on continue.
 *
 * 2. Le stockage ne doit JAMAIS bloquer la fonction. Chaque appel est plafonné
 *    en durée : une fonction Netlify qui dépasse son temps d'exécution est tuée
 *    sans passer par les blocs d'erreur, et la commande serait perdue.
 */

const REGISTRE_COMMANDES = 'commandes';
const REGISTRE_EVENEMENTS = 'evenements-stripe';

const DELAI_MAX_MS = 3000;
// Au-delà de ce délai, un event marqué « en cours » est considéré comme
// abandonné (fonction tuée en plein traitement) et peut être repris.
const PEREMPTION_EN_COURS_MS = 2 * 60 * 1000;

async function registre(nom) {
    const { getStore } = await import('@netlify/blobs');
    return getStore(nom);
}

/** Plafonne la durée d'une promesse. Rejette au-delà du délai. */
function avecDelai(promesse, libelle) {
    let minuteur;
    const limite = new Promise((_, rejeter) => {
        minuteur = setTimeout(
            () => rejeter(new Error(`${libelle} : délai de ${DELAI_MAX_MS} ms dépassé`)),
            DELAI_MAX_MS
        );
    });
    return Promise.race([promesse, limite]).finally(() => clearTimeout(minuteur));
}

/**
 * Enregistre une commande payée. Ne lève jamais, ne bloque jamais.
 * @returns {Promise<boolean>} true si l'écriture a réussi
 */
async function enregistrerCommande(sessionId, commande) {
    try {
        const store = await avecDelai(registre(REGISTRE_COMMANDES), 'ouverture du registre commandes');
        await avecDelai(
            store.setJSON(sessionId, { ...commande, enregistree_le: new Date().toISOString() }),
            'écriture de la commande'
        );
        console.log(`[stockage] ✔ Commande ${sessionId} enregistrée`);
        return true;
    } catch (err) {
        console.error(
            `[stockage] ⚠ COMMANDE NON ENREGISTRÉE — ${sessionId} — ${err.message}\n` +
            `⚠ COMMANDE NON ENREGISTRÉE — contenu intégral ci-dessous :\n` +
            JSON.stringify(commande)
        );
        return false;
    }
}

/**
 * Ouvre le traitement d'un event Stripe.
 *
 * Trois cas de figure :
 *   - event déjà terminé          → false (doublon, ne rien refaire)
 *   - event « en cours » récent   → false (Stripe l'a livré deux fois en même temps)
 *   - event « en cours » périmé   → true  (la fonction précédente est morte, on reprend)
 *
 * @returns {Promise<boolean>} true s'il faut traiter l'event
 */
async function marquerEvenement(eventId, type) {
    try {
        const store = await avecDelai(registre(REGISTRE_EVENEMENTS), 'ouverture du registre events');
        const entree = await avecDelai(store.get(eventId, { type: 'json' }), 'lecture de l\'event');

        if (entree) {
            if (entree.termine) {
                console.log(`[stockage] Event ${eventId} déjà traité — on ignore`);
                return false;
            }
            const age = Date.now() - new Date(entree.debut || 0).getTime();
            if (age < PEREMPTION_EN_COURS_MS) {
                console.log(`[stockage] Event ${eventId} en cours de traitement ailleurs — on ignore`);
                return false;
            }
            console.warn(
                `[stockage] ⚠ Event ${eventId} marqué « en cours » depuis ${Math.round(age / 1000)} s ` +
                `— traitement précédent interrompu, on reprend`
            );
        }

        await avecDelai(
            store.setJSON(eventId, { type, termine: false, debut: new Date().toISOString() }),
            'ouverture de l\'event'
        );
        return true;
    } catch (err) {
        // Stockage indisponible : on préfère traiter deux fois que zéro fois.
        console.error(`[stockage] Contrôle d'idempotence impossible (${err.message}) — on traite quand même`);
        return true;
    }
}

/**
 * Clôt un event dont le traitement a réussi. C'est cette marque, et elle seule,
 * qui fait qu'une réémission Stripe sera ignorée.
 */
async function terminerEvenement(eventId, type) {
    try {
        const store = await avecDelai(registre(REGISTRE_EVENEMENTS), 'ouverture du registre events');
        await avecDelai(
            store.setJSON(eventId, { type, termine: true, fin: new Date().toISOString() }),
            'clôture de l\'event'
        );
    } catch (err) {
        // Non clôturé : au pire Stripe réémettra et on retraitera. Un doublon
        // d'e-mail est moins grave qu'une commande perdue.
        console.error(`[stockage] ⚠ Event ${eventId} non clôturé : ${err.message}`);
    }
}

/**
 * Retire la marque d'un event dont le traitement a échoué, pour que la
 * réémission par Stripe soit reprise immédiatement plutôt qu'après péremption.
 */
async function demarquerEvenement(eventId) {
    try {
        const store = await avecDelai(registre(REGISTRE_EVENEMENTS), 'ouverture du registre events');
        await avecDelai(store.delete(eventId), 'suppression de l\'event');
        console.log(`[stockage] Event ${eventId} démarqué — la réémission Stripe sera traitée`);
    } catch (err) {
        console.error(`[stockage] ⚠ Impossible de démarquer l'event ${eventId} : ${err.message}`);
    }
}

module.exports = {
    enregistrerCommande,
    marquerEvenement,
    terminerEvenement,
    demarquerEvenement
};
