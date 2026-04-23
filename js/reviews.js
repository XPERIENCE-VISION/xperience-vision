/* ============================================================
   REVIEWS — XPERIENCE VISION
   Charge data/reviews.json et rend les avis (avec photo) dans #avis
   Filtre : seuls les avis avec champ "photo" sont affichés
   Limite : MAX_REVIEWS cartes max pour ne pas surcharger la section
   Lightbox : clic photo ouvre un modal avec photo + avis + nav prev/next
   ============================================================ */

(function () {
    'use strict';

    const SECTION_ID = 'avis';
    const MAX_REVIEWS = 6;
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

    function pictureHtml(photo, alt) {
        const base = escapeHtml(photo);
        return `
            <picture>
                <source srcset="img/${base}.webp" type="image/webp">
                <img src="img/${base}.jpeg" alt="${escapeHtml(alt)}">
            </picture>
        `;
    }

    function render(reviews) {
        const withPhoto = reviews.filter(r => r && r.photo).slice(0, MAX_REVIEWS);

        if (!withPhoto.length) {
            grid.innerHTML = '<p class="reviews-error">Aucun avis à afficher pour le moment.</p>';
            return;
        }

        grid.innerHTML = withPhoto.map((r, idx) => {
            const alt = `Installation réalisée par XPERIENCE VISION — avis de ${r.auteur}`;
            return `
                <article class="review-card review-card--with-photo">
                    <button type="button" class="review-photo-btn" data-review-index="${idx}" aria-label="Agrandir la photo de l'avis de ${escapeHtml(r.auteur)}">
                        <span class="review-photo">${pictureHtml(r.photo, alt)}</span>
                    </button>
                    <div class="review-body">
                        <header class="review-head">
                            <div class="review-stars" aria-label="${r.note} étoiles sur 5">${stars(r.note)}</div>
                            <span class="review-date">${formatDate(r.date)}</span>
                        </header>
                        <blockquote class="review-text">«&nbsp;${escapeHtml(r.texte)}&nbsp;»</blockquote>
                        <p class="review-signature">— ${escapeHtml(r.auteur)}${r.vehicule ? ` · <span class="review-vehicle-inline">${escapeHtml(r.vehicule)}</span>` : ''}</p>
                    </div>
                </article>
            `;
        }).join('');

        initLightbox(withPhoto);
    }

    function initLightbox(reviews) {
        let currentIndex = 0;

        const modal = document.createElement('div');
        modal.className = 'review-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Détail de l\'avis client');
        modal.innerHTML = `
            <div class="review-modal-inner">
                <button type="button" class="review-modal-close" aria-label="Fermer">✕</button>
                <button type="button" class="review-modal-prev" aria-label="Avis précédent">‹</button>
                <button type="button" class="review-modal-next" aria-label="Avis suivant">›</button>
                <div class="review-modal-photo"></div>
                <div class="review-modal-body">
                    <div class="review-modal-stars" aria-label=""></div>
                    <blockquote class="review-modal-text"></blockquote>
                    <p class="review-modal-signature"></p>
                    <span class="review-modal-date"></span>
                </div>
                <span class="review-modal-counter"></span>
            </div>
        `;
        document.body.appendChild(modal);

        const photoBox = modal.querySelector('.review-modal-photo');
        const starsEl = modal.querySelector('.review-modal-stars');
        const textEl = modal.querySelector('.review-modal-text');
        const signatureEl = modal.querySelector('.review-modal-signature');
        const dateEl = modal.querySelector('.review-modal-date');
        const counterEl = modal.querySelector('.review-modal-counter');
        const inner = modal.querySelector('.review-modal-inner');

        function update(index) {
            currentIndex = (index + reviews.length) % reviews.length;
            const r = reviews[currentIndex];
            const alt = `Installation réalisée par XPERIENCE VISION — avis de ${r.auteur}`;
            photoBox.innerHTML = pictureHtml(r.photo, alt);
            starsEl.textContent = stars(r.note);
            starsEl.setAttribute('aria-label', `${r.note} étoiles sur 5`);
            textEl.innerHTML = `«&nbsp;${escapeHtml(r.texte)}&nbsp;»`;
            signatureEl.innerHTML = `— ${escapeHtml(r.auteur)}${r.vehicule ? ` · <span class="review-vehicle-inline">${escapeHtml(r.vehicule)}</span>` : ''}`;
            dateEl.textContent = formatDate(r.date);
            counterEl.textContent = `${currentIndex + 1} / ${reviews.length}`;
        }

        function open(index) {
            update(index);
            modal.classList.add('is-open');
            document.body.classList.add('review-modal-open');
        }

        function close() {
            modal.classList.remove('is-open');
            document.body.classList.remove('review-modal-open');
        }

        function next() { update(currentIndex + 1); }
        function prev() { update(currentIndex - 1); }

        grid.addEventListener('click', (e) => {
            const btn = e.target.closest('.review-photo-btn');
            if (!btn) return;
            const idx = parseInt(btn.dataset.reviewIndex, 10);
            if (!isNaN(idx)) open(idx);
        });

        modal.querySelector('.review-modal-close').addEventListener('click', close);
        modal.querySelector('.review-modal-prev').addEventListener('click', prev);
        modal.querySelector('.review-modal-next').addEventListener('click', next);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });

        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('is-open')) return;
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowLeft') prev();
            else if (e.key === 'ArrowRight') next();
        });
    }

    fetch('data/reviews.json')
        .then(r => r.json())
        .then(data => render(data.reviews || []))
        .catch(err => {
            console.error('[XPERIENCE VISION] Impossible de charger reviews.json', err);
            grid.innerHTML = '<p class="reviews-error">Avis indisponibles pour le moment.</p>';
        });

})();
