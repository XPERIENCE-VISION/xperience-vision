/* ============================================================
   CATALOGUE — XPERIENCE VISION
   - 2 sections indépendantes (Produits / Services) avec filtres internes
   - 2 paniers indépendants (accessoires + services)
   - Persistance localStorage
   ============================================================ */

(function () {
    'use strict';

    // ---------- BURGER MENU ----------
    document.getElementById('burger-btn')?.addEventListener('click', () => {
        const menu = document.getElementById('mobile-dropdown');
        menu.classList.toggle('hidden');
        menu.classList.toggle('show');
    });

    // ============================================================
    // FILTRES IN-SECTION
    // ============================================================

    const STORAGE_KEY_FILTERS = 'xv-cat-filters-v2';

    // Default state pour chaque section (cat + 1re sub)
    const DEFAULTS = {
        produits: { cat: 'divers',  sub: 'sac' },
        services: { cat: 'ecrans',  sub: 'universel' }
    };

    // Première sous-cat à activer pour chaque (section, cat)
    const FIRST_SUB = {
        'produits-divers':    'sac',
        'services-ecrans':    'universel',
        'services-interieur': 'protection',
        'services-exterieur': 'toit'
    };

    let state = loadFilters();

    function loadFilters() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY_FILTERS);
            if (raw) {
                const p = JSON.parse(raw);
                return {
                    produits: { ...DEFAULTS.produits, ...(p.produits || {}) },
                    services: { ...DEFAULTS.services, ...(p.services || {}) }
                };
            }
        } catch (e) {}
        return JSON.parse(JSON.stringify(DEFAULTS));
    }

    function saveFilters() {
        try { localStorage.setItem(STORAGE_KEY_FILTERS, JSON.stringify(state)); } catch (e) {}
    }

    /**
     * Met à jour l'affichage d'une section (filtres + contenu).
     * @param {string} sectionName 'produits' | 'services'
     */
    function applySection(sectionName) {
        const section = document.querySelector(`[data-section="${sectionName}"]`);
        if (!section) return;
        const { cat, sub } = state[sectionName];

        // 1) Boutons catégories : marquer l'actif
        section.querySelectorAll('.cat-filter-cat').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.cat === cat);
            btn.setAttribute('aria-pressed', btn.dataset.cat === cat ? 'true' : 'false');
        });

        // 2) Rangées sous-catégories : afficher uniquement celle qui correspond à la cat active
        section.querySelectorAll('.cat-filter-row[data-level="sub"]').forEach(row => {
            row.hidden = row.dataset.forCat !== cat;
        });

        // 3) Boutons sous-catégories : marquer l'actif
        const activeSubRow = section.querySelector(`.cat-filter-row[data-level="sub"][data-for-cat="${cat}"]`);
        if (activeSubRow) {
            activeSubRow.querySelectorAll('.cat-filter-sub').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.sub === sub);
                btn.setAttribute('aria-pressed', btn.dataset.sub === sub ? 'true' : 'false');
            });
        }

        // 4) Blocs de contenu : afficher uniquement (cat, sub) actif
        section.querySelectorAll('.cat-content-block').forEach(block => {
            const match = block.dataset.cat === cat && block.dataset.sub === sub;
            block.hidden = !match;
        });

        saveFilters();
    }

    function applyAll() {
        applySection('produits');
        applySection('services');
    }

    function selectCat(sectionName, cat) {
        state[sectionName].cat = cat;
        const subKey = `${sectionName}-${cat}`;
        state[sectionName].sub = FIRST_SUB[subKey] || null;
        applySection(sectionName);
    }

    function selectSub(sectionName, sub) {
        state[sectionName].sub = sub;
        applySection(sectionName);
    }

    // Listeners — délégation par section
    document.querySelectorAll('[data-section]').forEach(section => {
        const sectionName = section.dataset.section;

        section.querySelectorAll('.cat-filter-cat').forEach(btn => {
            btn.addEventListener('click', () => selectCat(sectionName, btn.dataset.cat));
        });
        section.querySelectorAll('.cat-filter-sub').forEach(btn => {
            btn.addEventListener('click', () => selectSub(sectionName, btn.dataset.sub));
        });
    });

    applyAll();

    // ============================================================
    // PANIERS (accessoires + services)
    // ============================================================

    const STORAGE_KEY_CART = 'xv-cat-carts';

    function loadCarts() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY_CART);
            if (raw) {
                const p = JSON.parse(raw);
                return {
                    accessoires: p.accessoires || {},
                    services:    p.services    || {}
                };
            }
        } catch (e) {}
        return { accessoires: {}, services: {} };
    }

    function saveCarts() {
        try { localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(carts)); } catch (e) {}
    }

    const carts = loadCarts();

    function addToCart(type, id, name, price) {
        const cart = carts[type];
        if (cart[id]) {
            cart[id].qty += 1;
        } else {
            cart[id] = { name, price: Number(price) || 0, qty: 1 };
        }
        saveCarts();
        updateCounts();
        flashAddedFeedback(type);
    }

    function removeFromCart(type, id) {
        delete carts[type][id];
        saveCarts();
        updateCounts();
        renderDrawer();
    }

    function changeQty(type, id, delta) {
        const item = carts[type][id];
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) delete carts[type][id];
        saveCarts();
        updateCounts();
        renderDrawer();
    }

    function totalCount(type) {
        return Object.values(carts[type]).reduce((s, it) => s + it.qty, 0);
    }

    function totalPrice(type) {
        return Object.values(carts[type]).reduce((s, it) => s + it.price * it.qty, 0);
    }

    function updateCounts() {
        ['accessoires', 'services'].forEach(type => {
            const n = totalCount(type);
            document.querySelectorAll(`[data-cart-count="${type}"]`).forEach(el => {
                el.textContent = n;
                el.classList.toggle('has-items', n > 0);
            });
        });
    }

    function flashAddedFeedback(type) {
        document.querySelectorAll(`.cat-fab-cart[data-open-cart="${type}"]`).forEach(btn => {
            btn.classList.remove('flash');
            void btn.offsetWidth;
            btn.classList.add('flash');
        });
    }

    document.querySelectorAll('.cat-acc-add').forEach(btn => {
        btn.addEventListener('click', () => addToCart('accessoires', btn.dataset.addAcc, btn.dataset.name, btn.dataset.price));
    });
    document.querySelectorAll('.cat-srv-add').forEach(btn => {
        btn.addEventListener('click', () => addToCart('services', btn.dataset.addService, btn.dataset.name, btn.dataset.price));
    });

    updateCounts();

    // ============================================================
    // DRAWER PANIER
    // ============================================================

    const drawer = document.getElementById('cart-drawer');
    const drawerPanel = drawer.querySelector('.cart-drawer-panel');
    const drawerOverlay = drawer.querySelector('.cart-drawer-overlay');
    const drawerClose = drawer.querySelector('.cart-drawer-close');
    const drawerList = drawer.querySelector('.cart-drawer-list');
    const drawerEmpty = drawer.querySelector('.cart-drawer-empty');
    const drawerTitle = drawer.querySelector('.cart-drawer-title-text');
    const drawerIcon = drawer.querySelector('.cart-drawer-icon');
    const drawerTotal = drawer.querySelector('.cart-drawer-total-value');
    const drawerCta = drawer.querySelector('.cart-drawer-cta');
    const drawerCtaText = drawer.querySelector('.cart-drawer-cta-text');
    const drawerNote = drawer.querySelector('.cart-drawer-note');

    let activeCartType = 'accessoires';

    function openDrawer(type) {
        activeCartType = type;
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        renderDrawer();
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function fmtPrice(n) {
        return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
    }

    function renderDrawer() {
        const cart = carts[activeCartType];
        const items = Object.entries(cart);

        if (activeCartType === 'accessoires') {
            drawerTitle.textContent = 'Panier — Accessoires';
            drawerIcon.className = 'cart-drawer-icon fa-solid fa-bag-shopping';
            drawerCtaText.textContent = 'Payer maintenant (Stripe)';
            drawerCta.classList.remove('cart-drawer-cta-gold');
            drawerNote.textContent = 'Livraison incluse · Paiement sécurisé Stripe';
            drawerPanel.classList.remove('cart-drawer-panel-gold');
        } else {
            drawerTitle.textContent = 'Panier — Services';
            drawerIcon.className = 'cart-drawer-icon fa-solid fa-calendar-check';
            drawerCtaText.textContent = 'Choisir un créneau de RDV';
            drawerCta.classList.add('cart-drawer-cta-gold');
            drawerNote.textContent = 'RDV → Paiement de l\'acompte → Validation';
            drawerPanel.classList.add('cart-drawer-panel-gold');
        }

        drawerList.innerHTML = '';
        drawerEmpty.hidden = items.length > 0;
        drawerCta.disabled = items.length === 0;

        items.forEach(([id, item]) => {
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div class="cart-item-info">
                    <p class="cart-item-name">${escapeHtml(item.name)}</p>
                    <p class="cart-item-price">${item.price > 0 ? fmtPrice(item.price) + ' / unité' : 'Sur devis'}</p>
                </div>
                <div class="cart-item-qty">
                    <button class="cart-qty-btn" data-action="dec" aria-label="Diminuer">−</button>
                    <span class="cart-qty-value">${item.qty}</span>
                    <button class="cart-qty-btn" data-action="inc" aria-label="Augmenter">+</button>
                </div>
                <span class="cart-item-total">${item.price > 0 ? fmtPrice(item.price * item.qty) : '—'}</span>
                <button class="cart-item-remove" data-action="remove" aria-label="Retirer">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            li.querySelector('[data-action="dec"]').addEventListener('click', () => changeQty(activeCartType, id, -1));
            li.querySelector('[data-action="inc"]').addEventListener('click', () => changeQty(activeCartType, id, 1));
            li.querySelector('[data-action="remove"]').addEventListener('click', () => removeFromCart(activeCartType, id));
            drawerList.appendChild(li);
        });

        drawerTotal.textContent = fmtPrice(totalPrice(activeCartType));
    }

    document.querySelectorAll('[data-open-cart]').forEach(btn => {
        btn.addEventListener('click', () => openDrawer(btn.dataset.openCart));
    });
    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });

    // ============================================================
    // CTA PANIER → MODAL DEMO
    // ============================================================

    const modal = document.getElementById('demo-modal');
    const modalText = modal.querySelector('.demo-modal-text');

    function showModal(message) {
        modalText.textContent = message;
        modal.classList.add('show');
    }

    drawerCta.addEventListener('click', () => {
        if (drawerCta.disabled) return;
        if (Object.keys(carts[activeCartType]).length === 0) return;

        if (activeCartType === 'accessoires') {
            const total = totalPrice('accessoires');
            showModal(`Vous seriez maintenant redirigé vers Stripe Checkout pour payer ${fmtPrice(total)} (livraison incluse). Cette étape sera connectée une fois les clés API Stripe configurées.`);
        } else {
            showModal('Vous seriez maintenant redirigé vers le module de prise de RDV (Calendly/cal.com) pour choisir un créneau. Le paiement de l\'acompte via Stripe valide ensuite la réservation.');
        }
    });

    modal.querySelector('.demo-modal-close').addEventListener('click', () => modal.classList.remove('show'));
    modal.querySelector('.demo-modal-ok').addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('show')) modal.classList.remove('show');
    });

    // ============================================================
    // SCROLLSPY — surbrillance subnav selon la section visible
    // ============================================================
    const subnavBtns = document.querySelectorAll('.cat-subnav-btn');
    const sectionIds = ['section-best', 'section-produits', 'section-services'];
    const sectionEls = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    if (subnavBtns.length && sectionEls.length) {
        const setActiveSubnav = (id) => {
            subnavBtns.forEach(btn => {
                const isActive = btn.dataset.target === id;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        };

        // Détecte la section dont le top est passé sous la subnav
        const ssObserver = new IntersectionObserver((entries) => {
            // Trouve la section la plus en haut qui est visible
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
            if (visible) setActiveSubnav(visible.target.id);
        }, {
            // La zone "active" : juste sous la subnav, sur ~40% de la hauteur
            rootMargin: '-170px 0px -55% 0px',
            threshold: 0
        });

        sectionEls.forEach(el => ssObserver.observe(el));
    }

})();
