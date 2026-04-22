/* ============================================================
   REVIEWS — XPERIENCE VISION
   Charge data/reviews.json et rend les avis dans la section #avis
   À remplacer par l'API Google Places en phase 2
   ============================================================ */

(function () {
    'use strict';

    const SECTION_ID = 'avis';
    const section = document.getElementById(SECTION_ID);
    if (!section) return;

    const grid = section.querySelector('.reviews-grid');
    if (!grid) return;

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[c]);
    }

    function formatDate(iso) {
        try {
            const d = new Date(iso);
            return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
        } catch (e) {
            return '';
        }
    }

    function stars(n) {
        return '★'.repeat(Math.max(0, Math.min(5, n))) + '☆'.repeat(Math.max(0, 5 - n));
    }

    function render(reviews) {
        grid.innerHTML = reviews.map(r => `
            <article class="review-card">
                <header class="review-head">
                    <div class="review-stars" aria-label="${r.note} étoiles sur 5">${stars(r.note)}</div>
                    <span class="review-date">${formatDate(r.date)}</span>
                </header>
                <blockquote class="review-text">«&nbsp;${escapeHtml(r.texte)}&nbsp;»</blockquote>
                <p class="review-signature">— ${escapeHtml(r.auteur)}${r.vehicule ? ` · <span class="review-vehicle-inline">${escapeHtml(r.vehicule)}</span>` : ''}</p>
            </article>
        `).join('');
    }

    fetch('data/reviews.json')
        .then(r => r.json())
        .then(data => render(data.reviews || []))
        .catch(err => {
            console.error('[XV] Impossible de charger reviews.json', err);
            grid.innerHTML = '<p class="reviews-error">Avis indisponibles pour le moment.</p>';
        });

})();
