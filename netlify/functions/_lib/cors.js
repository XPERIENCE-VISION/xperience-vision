/**
 * CORS — liste blanche d'origines
 *
 * Remplace `Access-Control-Allow-Origin: '*'`, qui laissait n'importe quel site
 * appeler nos fonctions depuis le navigateur d'un visiteur.
 *
 * Sont autorisés :
 *   - xperiencevision.com et www.xperiencevision.com
 *   - la valeur de SITE_URL (utile si le domaine change)
 *   - les previews Netlify du projet : *--xperience-vision.netlify.app
 *     (et xperience-vision.netlify.app lui-même)
 *   - localhost:8888 et 127.0.0.1:8888 pour `netlify dev`
 *
 * Une origine inconnue ne reçoit tout simplement pas d'en-tête
 * Access-Control-Allow-Origin : le navigateur bloque alors la lecture de la
 * réponse. Les appels serveur à serveur (sans en-tête Origin) ne sont pas
 * concernés — CORS est une protection de navigateur, pas un contrôle d'accès.
 */

const ORIGINES_FIXES = [
    'https://xperiencevision.com',
    'https://www.xperiencevision.com',
    'http://localhost:8888',
    'http://127.0.0.1:8888'
];

const HOTE_NETLIFY = 'xperience-vision.netlify.app';

/**
 * Renvoie l'origine normalisée si elle est autorisée, sinon null.
 * @param {string} origine - contenu brut de l'en-tête Origin
 * @returns {string|null}
 */
function origineAutorisee(origine) {
    if (!origine || typeof origine !== 'string') return null;

    let url;
    try {
        url = new URL(origine);
    } catch {
        return null;
    }

    const normalisee = url.origin;

    if (ORIGINES_FIXES.includes(normalisee)) return normalisee;

    const site = (process.env.SITE_URL || '').replace(/\/$/, '');
    if (site) {
        try {
            if (new URL(site).origin === normalisee) return normalisee;
        } catch { /* SITE_URL mal formée : on ignore */ }
    }

    // Previews Netlify du projet uniquement, en HTTPS et sans port.
    if (url.protocol === 'https:' && !url.port) {
        const hote = url.hostname;
        if (hote === HOTE_NETLIFY || hote.endsWith('--' + HOTE_NETLIFY)) {
            return normalisee;
        }
    }

    return null;
}

/**
 * Construit les en-têtes de réponse d'une fonction.
 * @param {Object} event - l'event Netlify
 * @param {Object} [supplementaires] - en-têtes à ajouter
 * @returns {Object}
 */
function enTetesCors(event, supplementaires = {}) {
    const brute = (event && event.headers)
        ? (event.headers.origin || event.headers.Origin || '')
        : '';
    const autorisee = origineAutorisee(brute);

    const entetes = {
        'Content-Type': 'application/json',
        // Indispensable : la réponse dépend de l'origine, les caches doivent le savoir.
        'Vary': 'Origin',
        ...supplementaires
    };

    if (autorisee) {
        entetes['Access-Control-Allow-Origin'] = autorisee;
    }

    return entetes;
}

module.exports = { origineAutorisee, enTetesCors };
