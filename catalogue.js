/* ============================================================
   CATALOGUE — XPERIENCE VISION
   - Panier unifié (produits + services mélangés, type par item)
   - Flow checkout en 3 popups : formulaire → Cal.com → Stripe embedded
   ============================================================ */

(function () {
    'use strict';

    // ============================================================
    // TOAST — feedback non-bloquant
    // ============================================================
    let toastStack = document.getElementById('xv-toast-stack');
    if (!toastStack) {
        toastStack = document.createElement('div');
        toastStack.id = 'xv-toast-stack';
        toastStack.className = 'xv-toast-stack';
        toastStack.setAttribute('aria-live', 'polite');
        toastStack.setAttribute('aria-atomic', 'true');
        document.body.appendChild(toastStack);
    }

    function showToast(message, opts = {}) {
        const { variant = 'success', duration = 2500 } = opts;
        const toast = document.createElement('div');
        toast.className = 'xv-toast' + (variant === 'gold' ? ' xv-toast-gold' : variant === 'error' ? ' xv-toast-error' : '');
        toast.innerHTML = `
            <span class="xv-toast-icon"><i class="fa-solid ${variant === 'error' ? 'fa-triangle-exclamation' : 'fa-check'}"></i></span>
            <span>${escapeHtml(message)}</span>
        `;
        toastStack.appendChild(toast);
        const remove = () => {
            toast.classList.add('xv-toast-out');
            setTimeout(() => toast.remove(), 350);
        };
        setTimeout(remove, duration);
        toast.addEventListener('click', remove);
    }

    function escapeHtml(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[c]);
    }

    // ============================================================
    // FOCUS MANAGEMENT — trap + restitution
    // ============================================================
    const FOCUSABLE_SELECTOR = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function getFocusables(container) {
        return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
            .filter(el => !el.hidden && el.offsetParent !== null);
    }

    function trapFocus(container, e) {
        if (e.key !== 'Tab') return;
        const focusables = getFocusables(container);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }

    // ============================================================
    // FILTRES IN-SECTION (inchangé)
    // ============================================================

    const STORAGE_KEY_FILTERS = 'xv-cat-filters-v3';
    const DEFAULTS = {
        accessoires:  { cat: 'interieur', sub: 'all' },
        installation: { cat: 'ecrans',    sub: 'tous' }
    };
    const FIRST_SUB = {
        'accessoires-interieur': 'all',
        'accessoires-exterieur': 'all',
        'accessoires-recharge':  'all',
        'installation-ecrans':   'tous'
    };

    let state = loadFilters();

    function loadFilters() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY_FILTERS);
            if (raw) {
                const p = JSON.parse(raw);
                return {
                    accessoires:  { ...DEFAULTS.accessoires,  ...(p.accessoires  || {}) },
                    installation: { ...DEFAULTS.installation, ...(p.installation || {}) }
                };
            }
        } catch (e) {}
        return JSON.parse(JSON.stringify(DEFAULTS));
    }

    function saveFilters() {
        try { localStorage.setItem(STORAGE_KEY_FILTERS, JSON.stringify(state)); } catch (e) {}
    }

    const CAT_LABELS = {
        ecrans: 'Écrans', interieur: 'Accessoires Intérieur', exterieur: 'Accessoires Extérieur',
        divers: 'Accessoires divers'
    };
    const SUB_LABELS = {
        universel: 'Universel', byd: 'BYD', tesla: 'Tesla', xpeng: 'XPeng',
        bmw: 'BMW', mercedes: 'Mercedes', rangerover: 'Range Rover',
        protection: 'Protection', rangement: 'Rangement', tech: 'Tech & Multimédia',
        toit: 'Toit & Transport', esthetique: 'Films & Esthétique',
        sac: 'Sac', aspiration: 'Aspiration', serviettes: 'Serviettes & gants',
        nettoyage: 'Nettoyage', brosses: 'Brosses détailing', vitres: 'Vitres & Tableau de bord',
        kits: 'Kits'
    };

    function ensureSrTitle(block, cat, sub) {
        let title = block.querySelector('.cat-block-title-sr');
        if (!title) {
            title = document.createElement('h3');
            title.className = 'cat-block-title-sr sr-only';
            block.insertBefore(title, block.firstChild);
        }
        title.textContent = `${CAT_LABELS[cat] || cat} — ${SUB_LABELS[sub] || sub}`;
    }

    function applySection(sectionName) {
        const section = document.querySelector(`[data-section="${sectionName}"]`);
        if (!section) return;
        const { cat, sub } = state[sectionName];

        section.querySelectorAll('.cat-filter-cat').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.cat === cat);
            btn.setAttribute('aria-pressed', btn.dataset.cat === cat ? 'true' : 'false');
        });
        section.querySelectorAll('.cat-filter-row[data-level="sub"]').forEach(row => {
            row.hidden = row.dataset.forCat !== cat;
        });
        const activeSubRow = section.querySelector(`.cat-filter-row[data-level="sub"][data-for-cat="${cat}"]`);
        if (activeSubRow) {
            activeSubRow.querySelectorAll('.cat-filter-sub').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.sub === sub);
                btn.setAttribute('aria-pressed', btn.dataset.sub === sub ? 'true' : 'false');
            });
        }
        section.querySelectorAll('.cat-content-block').forEach(block => {
            const match = block.dataset.cat === cat && block.dataset.sub === sub;
            block.hidden = !match;
            if (match) ensureSrTitle(block, cat, sub);
        });
        saveFilters();
    }

    function applyAll() {
        applySection('accessoires');
        applySection('installation');
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
    // PANIER UNIFIÉ — un seul panier, type par item
    // ============================================================

    const STORAGE_KEY_CART = 'xv-cart';
    const LEGACY_KEY_CART = 'xv-cat-carts';

    // Boutons "add" du HTML : déterminer le type via la classe CSS
    // - .cat-srv-add → service
    // - .cat-acc-add → produit
    function getButtonType(btn) {
        if (btn.classList.contains('cat-srv-add')) return 'service';
        if (btn.classList.contains('cat-acc-add')) return 'produit';
        return btn.dataset.type || 'produit';
    }

    // Map id → type pour migration de l'ancien format
    const LEGACY_TYPE_MAP = {};
    document.querySelectorAll('.cat-srv-add').forEach(btn => {
        const id = btn.dataset.addService;
        if (id) LEGACY_TYPE_MAP[id] = 'service';
    });
    document.querySelectorAll('.cat-acc-add').forEach(btn => {
        const id = btn.dataset.addAcc;
        if (id) LEGACY_TYPE_MAP[id] = 'produit';
    });

    function loadCart() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY_CART);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && typeof parsed === 'object') return parsed;
            }
        } catch (e) {}

        // Migration depuis l'ancien format { accessoires: {...}, services: {...} }
        try {
            const legacyRaw = localStorage.getItem(LEGACY_KEY_CART);
            if (legacyRaw) {
                const legacy = JSON.parse(legacyRaw);
                const merged = {};
                for (const [id, it] of Object.entries(legacy.accessoires || {})) {
                    merged[id] = { ...it, type: 'produit' };
                }
                for (const [id, it] of Object.entries(legacy.services || {})) {
                    merged[id] = { ...it, type: 'service' };
                }
                try { localStorage.removeItem(LEGACY_KEY_CART); } catch (e) {}
                return merged;
            }
        } catch (e) {}

        return {};
    }

    function saveCart() {
        try { localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart)); } catch (e) {}
    }

    let cart = loadCart();

    // API publique pour les autres modules
    window.XVCart = {
        getItems: () => ({ ...cart }),
        getCount: () => Object.values(cart).reduce((s, it) => s + it.qty, 0),
        getTotal: () => Object.values(cart).reduce((s, it) => s + it.price * it.qty, 0),
        hasServices: () => Object.values(cart).some(it => it.type === 'service'),
        hasProducts: () => Object.values(cart).some(it => it.type === 'produit'),
        clear: () => { cart = {}; saveCart(); updateCount(); }
    };

    function addToCart(id, name, price, type) {
        if (cart[id]) {
            cart[id].qty += 1;
        } else {
            cart[id] = { name, price: Number(price) || 0, qty: 1, type: type || 'produit' };
        }
        saveCart();
        updateCount();
        flashCartBtn();
        const label = type === 'service' ? 'au panier (RDV)' : 'au panier';
        showToast(`Ajouté ${label}`, { variant: type === 'service' ? 'gold' : 'success' });
    }

    function removeFromCart(id) {
        delete cart[id];
        saveCart();
        updateCount();
        renderDrawer();
    }

    function changeQty(id, delta) {
        const item = cart[id];
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) delete cart[id];
        saveCart();
        updateCount();
        renderDrawer();
    }

    function totalCount() {
        return Object.values(cart).reduce((s, it) => s + it.qty, 0);
    }

    function totalPrice() {
        return Object.values(cart).reduce((s, it) => s + it.price * it.qty, 0);
    }

    function updateCount() {
        const n = totalCount();
        document.querySelectorAll('[data-cart-count]').forEach(el => {
            el.textContent = n;
            el.classList.toggle('has-items', n > 0);
        });
        document.dispatchEvent(new CustomEvent('xv-cart-changed', {
            detail: { count: n, hasServices: window.XVCart.hasServices() }
        }));
    }

    function flashCartBtn() {
        document.querySelectorAll('.nav-cart-btn').forEach(btn => {
            btn.classList.remove('flash');
            void btn.offsetWidth;
            btn.classList.add('flash');
        });
    }

    // Ajout au panier — event delegation globale (capture aussi les boutons
    // ajoutés dynamiquement, ex : résultats du configurateur)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.cat-acc-add, .cat-srv-add');
        if (!btn) return;
        const id = btn.dataset.addAcc || btn.dataset.addService;
        const name = btn.dataset.name;
        const price = btn.dataset.price;
        const type = getButtonType(btn);
        if (!id) return;
        if (Number(price) <= 0) {
            showToast('Produit sur devis — contactez-nous', { variant: 'gold', duration: 3000 });
            return;
        }
        addToCart(id, name, price, type);
    });

    // API publique pour ajouter au panier depuis d'autres scripts (configurateur)
    window.XVCartAdd = addToCart;

    updateCount();

    // ============================================================
    // DRAWER PANIER
    // ============================================================

    const drawer = document.getElementById('cart-drawer');
    const drawerPanel = drawer.querySelector('.cart-drawer-panel');
    const drawerOverlay = drawer.querySelector('.cart-drawer-overlay');
    const drawerClose = drawer.querySelector('.cart-drawer-close');
    const drawerList = drawer.querySelector('.cart-drawer-list');
    const drawerEmpty = drawer.querySelector('.cart-drawer-empty');
    const drawerTotal = drawer.querySelector('.cart-drawer-total-value');
    const drawerCta = drawer.querySelector('.cart-drawer-cta');
    const drawerCtaText = drawer.querySelector('.cart-drawer-cta-text');
    const drawerNote = drawer.querySelector('.cart-drawer-note');
    const drawerBreakdown = drawer.querySelector('[data-cart-breakdown]');
    const drawerSubtotalHt = drawer.querySelector('[data-cart-subtotal-ht]');
    const drawerTva = drawer.querySelector('[data-cart-tva]');
    const drawerShippingRow = drawer.querySelector('[data-cart-shipping]');

    const TVA_RATE = 0.20;

    let drawerLastFocus = null;

    function openDrawer() {
        drawerLastFocus = document.activeElement;
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        renderDrawer();
        document.body.style.overflow = 'hidden';
        setTimeout(() => drawerClose?.focus(), 50);
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (drawerLastFocus?.focus) drawerLastFocus.focus();
        drawerLastFocus = null;
    }

    function fmtPrice(n) {
        const num = Number(n) || 0;
        const hasCents = Math.round(num * 100) % 100 !== 0;
        return num.toLocaleString('fr-FR', hasCents
            ? { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            : { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €';
    }

    function renderDrawer() {
        const items = Object.entries(cart);
        drawerList.innerHTML = '';
        drawerEmpty.hidden = items.length > 0;
        drawerCta.disabled = items.length === 0;

        const hasServices = window.XVCart.hasServices();
        const hasProducts = window.XVCart.hasProducts();

        // CTA dynamique selon le contenu
        if (hasServices) {
            drawerCtaText.textContent = 'Commander · RDV + Paiement';
            drawerCta.classList.add('cart-drawer-cta-gold');
            drawerNote.textContent = 'Vos infos → RDV → Paiement. Le RDV se valide au paiement.';
        } else if (items.length > 0) {
            drawerCtaText.textContent = 'Commander';
            drawerCta.classList.remove('cart-drawer-cta-gold');
            drawerNote.textContent = 'Livraison offerte · Expédition sous 3-5 jours ouvrés';
        } else {
            drawerCtaText.textContent = 'Commander';
            drawerCta.classList.remove('cart-drawer-cta-gold');
            drawerNote.textContent = '';
        }

        // Ligne "Livraison offerte" si au moins un produit
        if (drawerShippingRow) {
            drawerShippingRow.hidden = !hasProducts;
        }

        items.forEach(([id, item]) => {
            const badge = item.type === 'service'
                ? '<span class="cart-item-type-badge cart-item-type-badge-gold">Service</span>'
                : '<span class="cart-item-type-badge">Produit</span>';

            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div class="cart-item-info">
                    <p class="cart-item-name">${escapeHtml(item.name)} ${badge}</p>
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
            li.querySelector('[data-action="dec"]').addEventListener('click', () => changeQty(id, -1));
            li.querySelector('[data-action="inc"]').addEventListener('click', () => changeQty(id, 1));
            li.querySelector('[data-action="remove"]').addEventListener('click', () => removeFromCart(id));
            drawerList.appendChild(li);
        });

        const totalTtc = totalPrice();
        const totalHt = totalTtc / (1 + TVA_RATE);
        const totalTva = totalTtc - totalHt;

        if (drawerBreakdown) drawerBreakdown.hidden = items.length === 0;
        if (drawerSubtotalHt) drawerSubtotalHt.textContent = fmtPrice(totalHt);
        if (drawerTva) drawerTva.textContent = fmtPrice(totalTva);
        drawerTotal.textContent = fmtPrice(totalTtc);
    }

    document.querySelectorAll('[data-open-cart]').forEach(btn => {
        btn.addEventListener('click', openDrawer);
    });
    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => {
        if (!drawer.classList.contains('open')) return;
        if (e.key === 'Escape') { closeDrawer(); return; }
        trapFocus(drawerPanel, e);
    });

    // ============================================================
    // MODAL — helpers génériques
    // ============================================================

    function openXvModal(modalEl) {
        modalEl._lastFocus = document.activeElement;
        modalEl.classList.add('open');
        modalEl.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        const focusables = getFocusables(modalEl.querySelector('.xv-modal-card'));
        setTimeout(() => (focusables[0] || modalEl.querySelector('[data-close]'))?.focus(), 50);
    }

    function closeXvModal(modalEl) {
        modalEl.classList.remove('open');
        modalEl.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (modalEl._lastFocus?.focus) modalEl._lastFocus.focus();
        modalEl._lastFocus = null;
    }

    document.querySelectorAll('.xv-modal').forEach(modal => {
        modal.querySelectorAll('[data-close]').forEach(el => {
            el.addEventListener('click', () => closeXvModal(modal));
        });
        document.addEventListener('keydown', e => {
            if (!modal.classList.contains('open')) return;
            if (e.key === 'Escape') { closeXvModal(modal); return; }
            trapFocus(modal.querySelector('.xv-modal-card'), e);
        });
    });

    // ============================================================
    // MODAL DÉTAIL PRODUIT — clic sur cat-card / cat-bs-card
    // ============================================================

    const productModal = document.getElementById('product-modal');

    function openProductModalFromCard(card) {
        if (!productModal) return;

        const picture = card.querySelector('.cat-card-media picture, .cat-bs-media picture');
        const img = card.querySelector('.cat-card-media img, .cat-bs-media img');
        const mediaEl = productModal.querySelector('[data-product-media]');
        if (picture) {
            mediaEl.innerHTML = picture.outerHTML;
            const clonedImg = mediaEl.querySelector('img');
            if (clonedImg) clonedImg.loading = 'eager';
        } else if (img) {
            mediaEl.innerHTML = img.outerHTML;
        } else {
            mediaEl.innerHTML = '';
        }

        const title = (card.querySelector('h3, h4')?.textContent || '').trim();
        const tag = (card.querySelector('.cat-bs-card-tag')?.textContent || '').trim();
        const cible = (card.querySelector('.cat-bs-cible')?.textContent || '').trim();
        // Description longue (data-description) si présente, sinon on prend celle affichée dans la card
        const descLong = (card.dataset.description || '').trim();
        const descShort = (card.querySelector('.cat-card-body p')?.textContent || '').trim();
        const desc = descLong || descShort;
        const listEl = card.querySelector('.cat-bs-list');
        const bottomBtn = card.querySelector('.cat-buy-btn, .cat-rdv-btn');

        // Prix — reconstruit depuis data-price du bouton pour cohérence (inclut les centimes)
        let priceText = (card.querySelector('.cat-price, .cat-bs-price')?.textContent || '').trim();
        if (bottomBtn && bottomBtn.dataset.price) {
            priceText = bottomBtn.dataset.price + ' €';
        }

        productModal.querySelector('[data-product-title]').textContent = title;
        productModal.querySelector('[data-product-desc]').textContent = desc || cible;
        productModal.querySelector('[data-product-price]').textContent = priceText;

        const tagTarget = productModal.querySelector('[data-product-tag]');
        if (tag) { tagTarget.textContent = tag; tagTarget.hidden = false; }
        else { tagTarget.hidden = true; }

        const cibleTarget = productModal.querySelector('[data-product-cible]');
        if (cible && cible !== desc) { cibleTarget.textContent = cible; cibleTarget.hidden = false; }
        else { cibleTarget.hidden = true; }

        const listTarget = productModal.querySelector('[data-product-list]');
        if (listEl) { listTarget.innerHTML = listEl.innerHTML; listTarget.hidden = false; }
        else { listTarget.hidden = true; }

        const actionsEl = productModal.querySelector('[data-product-actions]');
        actionsEl.innerHTML = '';

        if (bottomBtn) {
            const cloned = bottomBtn.cloneNode(true);
            // Ferme la modal 400ms après l'ajout au panier (le toast de catalogue.js reste visible)
            cloned.addEventListener('click', () => {
                setTimeout(() => closeXvModal(productModal), 400);
            });
            actionsEl.appendChild(cloned);
        }

        // Bouton "Un doute ? Contactez-nous" — UNIQUEMENT pour les services RDV (écrans)
        const contactEl = productModal.querySelector('[data-product-contact]');
        if (contactEl) {
            const isRdvService = !!(bottomBtn && bottomBtn.classList.contains('cat-rdv-btn'));
            if (isRdvService) {
                contactEl.hidden = false;
                contactEl.href = 'contact.html?sujet=question&produit=' + encodeURIComponent(title);
            } else {
                contactEl.hidden = true;
            }
        }

        openXvModal(productModal);
    }

    if (productModal) {
        document.body.addEventListener('click', (e) => {
            // Ignorer les clics sur tout élément interactif DANS la card (boutons, liens)
            if (e.target.closest('button, a, input, select, textarea')) return;
            const card = e.target.closest('.cat-card, .cat-bs-card');
            if (!card) return;
            // Ignorer si on est déjà dans le modal (évite réouverture quand on clique dans la modal)
            if (e.target.closest('.xv-modal')) return;
            openProductModalFromCard(card);
        });
    }

    // ============================================================
    // ============================================================
    // CHECKOUT FLOW — orchestrateur 3 popups
    // ============================================================

    const FUNCTIONS_BASE = '/.netlify/functions';

    const formModal = document.getElementById('checkout-form-modal');
    const bookingModal = document.getElementById('booking-modal');
    const stripeModal = document.getElementById('stripe-modal');
    const form = document.getElementById('checkout-form');
    const formErrorEl = form.querySelector('[data-form-error]');
    const formSubmitBtn = form.querySelector('.xv-form-submit');
    const formSubmitLabel = form.querySelector('[data-form-submit-label]');
    const servicesGroup = form.querySelector('[data-services-group]');

    let checkoutData = null; // { customer, lieuRdv }
    let calBookingUid = null;
    let stripeInstance = null;
    let embeddedCheckout = null;

    function getStripe() {
        if (!stripeInstance && window.Stripe) {
            // La publishable key sera récupérée au lancement de la session (renvoyée par le backend)
            // Pour éviter l'aller-retour on l'injecte via meta tag si besoin, sinon on la fetche.
        }
        return stripeInstance;
    }

    // Récupère la publishable key côté backend (pour ne pas la hardcoder côté front)
    let publishableKeyCache = null;
    async function fetchPublishableKey() {
        if (publishableKeyCache) return publishableKeyCache;
        try {
            const r = await fetch(`${FUNCTIONS_BASE}/stripe-config`);
            if (r.ok) {
                const data = await r.json();
                publishableKeyCache = data.publishableKey || null;
            }
        } catch (e) {}
        return publishableKeyCache;
    }

    // Sync affichage du groupe services selon panier
    function syncFormServicesGroup() {
        const hasServices = window.XVCart.hasServices();
        servicesGroup.hidden = !hasServices;
        servicesGroup.querySelectorAll('[data-services-required]').forEach(el => {
            if (hasServices) {
                el.setAttribute('required', 'required');
            } else {
                el.removeAttribute('required');
                el.value = '';
            }
        });
        formSubmitLabel.textContent = hasServices ? 'Continuer vers le RDV' : 'Continuer vers le paiement';
    }

    function startCheckoutFlow() {
        if (Object.keys(cart).length === 0) return;
        closeDrawer();
        syncFormServicesGroup();
        formErrorEl.hidden = true;
        openXvModal(formModal);
    }

    drawerCta.addEventListener('click', startCheckoutFlow);

    // Validation + passage à l'étape suivante
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        formErrorEl.hidden = true;

        const fd = new FormData(form);
        const customer = {
            prenom: (fd.get('prenom') || '').toString().trim(),
            nom: (fd.get('nom') || '').toString().trim(),
            email: (fd.get('email') || '').toString().trim(),
            telephone: (fd.get('telephone') || '').toString().trim(),
            adresse: (fd.get('adresse') || '').toString().trim(),
            code_postal: (fd.get('code_postal') || '').toString().trim(),
            ville: (fd.get('ville') || '').toString().trim(),
            marque: (fd.get('marque') || '').toString().trim(),
            modele: (fd.get('modele') || '').toString().trim(),
            immatriculation: (fd.get('immatriculation') || '').toString().trim().toUpperCase()
        };

        // Validation basique
        if (!customer.prenom || !customer.nom || !customer.email || !customer.telephone ||
            !customer.adresse || !customer.code_postal || !customer.ville) {
            showFormError('Merci de remplir tous les champs obligatoires.');
            return;
        }
        if (!/^\d{5}$/.test(customer.code_postal)) {
            showFormError('Le code postal doit contenir 5 chiffres.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
            showFormError('L\'adresse email n\'est pas valide.');
            return;
        }

        const hasServices = window.XVCart.hasServices();
        let lieuRdv = null;

        if (hasServices) {
            if (!customer.marque || !customer.modele || !customer.immatriculation) {
                showFormError('Merci de renseigner les informations de votre véhicule.');
                return;
            }
            const lieuType = (fd.get('lieu_rdv') || '').toString();
            if (lieuType !== 'domicile' && lieuType !== 'garage') {
                showFormError('Merci de choisir le lieu du RDV.');
                return;
            }
            if (lieuType === 'domicile') {
                const adresseComplete = [
                    customer.adresse,
                    [customer.code_postal, customer.ville].filter(Boolean).join(' ')
                ].filter(Boolean).join(' · ');
                lieuRdv = {
                    type: 'domicile',
                    label: 'À domicile',
                    adresse: adresseComplete
                };
            } else {
                lieuRdv = {
                    type: 'garage',
                    label: 'Garage XPERIENCE VISION',
                    adresse: '10 av. Fridingen · 77100 Nanteuil-lès-Meaux'
                };
            }
        }

        checkoutData = { customer, lieuRdv };

        closeXvModal(formModal);

        if (hasServices) {
            openBookingFlow();
        } else {
            await openStripeFlow();
        }
    });

    function showFormError(msg) {
        formErrorEl.textContent = msg;
        formErrorEl.hidden = false;
        formErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // ============================================================
    // CAL.COM — montage de l'embed dans la modal
    // ============================================================

    let calSnippetLoaded = false;

    function ensureCalSnippet() {
        return new Promise((resolve, reject) => {
            if (calSnippetLoaded && window.Cal) return resolve();
            // Snippet officiel Cal.com embed
            (function (C, A, L) {
                let p = function (a, ar) { a.q.push(ar); };
                let d = C.document;
                C.Cal = C.Cal || function () {
                    let cal = C.Cal, ar = arguments;
                    if (!cal.loaded) {
                        cal.ns = {}; cal.q = cal.q || [];
                        d.head.appendChild(d.createElement("script")).src = A;
                        cal.loaded = true;
                    }
                    if (ar[0] === L) {
                        const api = function () { p(api, arguments); };
                        const namespace = ar[1]; api.q = api.q || [];
                        if (typeof namespace === "string") {
                            cal.ns[namespace] = cal.ns[namespace] || api;
                            p(cal.ns[namespace], ar);
                            p(cal, ["initNamespace", namespace]);
                        } else p(cal, ar);
                        return;
                    }
                    p(cal, ar);
                };
            })(window, "https://app.cal.com/embed/embed.js", "init");
            calSnippetLoaded = true;
            // Cal devient disponible immédiatement (queue)
            resolve();
        });
    }

    // Récupère les liens Cal.com (2 event types : domicile / garage XPERIENCE VISION)
    let calConfigCache = null;
    async function fetchCalConfig() {
        if (calConfigCache) return calConfigCache;
        try {
            const r = await fetch(`${FUNCTIONS_BASE}/cal-config`);
            if (r.ok) {
                calConfigCache = await r.json();
            }
        } catch (e) {}
        return calConfigCache || {};
    }

    async function openBookingFlow() {
        calBookingUid = null;
        const mount = document.getElementById('booking-cal-mount');
        mount.innerHTML = '<p class="xv-booking-loading"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Chargement du calendrier…</p>';
        openXvModal(bookingModal);

        // Données client & lieu RDV (déclarées tôt car utilisées partout)
        const c = checkoutData.customer;
        const lieu = checkoutData.lieuRdv;

        // Adresse complète à passer à Cal.com pour pré-remplir le champ "Lieu"
        const adresseRdv = lieu?.type === 'garage'
            ? '10 avenue Fridingen, 77100 Nanteuil-lès-Meaux'
            : (lieu?.adresse || '').replace(/\s*·\s*/g, ', ');

        // Notes automatiques pour le technicien : véhicule + lieu RDV + prestations
        const servicesItems = Object.entries(cart)
            .filter(([, it]) => it.type === 'service')
            .map(([, it]) => `${it.name} (x${it.qty})`)
            .join(', ');
        const notes = [
            c.marque || c.modele ? `Véhicule : ${[c.marque, c.modele].filter(Boolean).join(' ')}` : '',
            c.immatriculation ? `Immatriculation : ${c.immatriculation}` : '',
            lieu ? `Lieu RDV : ${lieu.label}${lieu.adresse ? ' — ' + lieu.adresse : ''}` : '',
            servicesItems ? `Prestations : ${servicesItems}` : '',
            c.telephone ? `Tél : ${c.telephone}` : ''
        ].filter(Boolean).join('\n');

        // Choisit le bon event type selon le lieu du RDV
        const calConfig = await fetchCalConfig();
        const lieuType = lieu?.type;
        const calLink = lieuType === 'garage'
            ? (calConfig.calLinkGarage || calConfig.calLink)
            : (calConfig.calLinkDomicile || calConfig.calLink);

        if (!calLink) {
            mount.innerHTML = '<p class="xv-stripe-error"><i class="fa-solid fa-triangle-exclamation mr-2"></i>Configuration Cal.com indisponible. Réessayez ou contactez-nous.</p>';
            return;
        }

        await ensureCalSnippet();

        // Namespace unique par event type pour isoler les instances
        const namespace = lieuType === 'garage' ? 'xv-rdv-garage' : 'xv-rdv-domicile';

        window.Cal('init', namespace, { origin: 'https://app.cal.com' });

        mount.innerHTML = '';
        window.Cal.ns[namespace]('inline', {
            elementOrSelector: '#booking-cal-mount',
            calLink,
            config: {
                layout: 'month_view',
                useSlotsViewOnSmallScreen: 'true',
                theme: 'dark',
                name: `${c.prenom} ${c.nom}`.trim(),
                email: c.email,

                // Téléphone
                phoneNumber: c.telephone || '',
                smsReminderNumber: c.telephone || '',

                // Pré-remplissage du champ "Lieu" — l'envoi via plusieurs clés
                // masque le champ côté UI (Cal.com considère la valeur comme
                // déjà saisie). L'adresse est envoyée au booking + dans les notes.
                location: adresseRdv,
                attendeeAddress: adresseRdv,
                address: adresseRdv,
                adresse: adresseRdv,
                lieu: adresseRdv,
                'lieu-du-rendez-vous': adresseRdv,
                'attendee-address': adresseRdv,

                responses: {
                    location: { value: adresseRdv, optionValue: adresseRdv },
                    attendeeAddress: adresseRdv,
                    address: adresseRdv,
                    adresse: adresseRdv,
                    lieu: adresseRdv,
                    'lieu-du-rendez-vous': adresseRdv,
                    'attendee-address': adresseRdv
                },

                // Notes automatiques pour l'organisateur
                notes: notes,

                // Metadata libre — visible côté organisateur dans le booking Cal.com
                metadata: {
                    marque: c.marque || '',
                    modele: c.modele || '',
                    immatriculation: c.immatriculation || '',
                    lieu_rdv_type: lieu?.type || '',
                    lieu_rdv_adresse: adresseRdv
                }
            }
        });

        window.Cal.ns[namespace]('ui', {
            theme: 'dark',
            styles: { branding: { brandColor: '#bf953f' } },
            hideEventTypeDetails: false
        });
    }

    // Listener global des events Cal.com (postMessage)
    window.addEventListener('message', (e) => {
        if (typeof e.data !== 'object' || !e.data) return;

        const isBookingSuccess =
            e.data.type === 'bookingSuccessful' ||
            e.data.type === 'bookingSuccessfulV2' ||
            e.data.type === '__bookingSuccessful' ||
            e.data.type === '__bookingSuccessfulV2' ||
            e.data.type === 'booking-successful' ||
            e.data.type === '__booking-successful' ||
            e.data.action === 'bookingSuccessful' ||
            e.data.action === 'bookingSuccessfulV2' ||
            e.data.action === 'booking_successful';
        if (!isBookingSuccess) return;
        if (!bookingModal.classList.contains('open')) {
            console.warn('[Cal] Booking success reçu mais modal pas ouverte');
            return;
        }

        const detail = e.data.detail || e.data;
        const uid =
            detail?.data?.booking?.uid ||
            detail?.data?.uid ||
            detail?.booking?.uid ||
            detail?.uid ||
            e.data?.booking?.uid ||
            e.data?.uid;

        if (!uid) {
            console.warn('[Cal] Booking event sans UID — structure reçue :', JSON.stringify(e.data));
            // On continue quand même : le booking est fait côté Cal, on ouvre Stripe
            // avec un UID vide. Le webhook ne pourra pas annuler mais le paiement passera.
        }

        calBookingUid = uid || '';

        showToast('Créneau réservé · Paiement sous 1h', { variant: 'gold', duration: 3000 });
        closeXvModal(bookingModal);
        setTimeout(() => openStripeFlow(), 300);
    });

    // ============================================================
    // STRIPE EMBEDDED CHECKOUT
    // ============================================================

    async function openStripeFlow() {
        const mount = document.getElementById('stripe-checkout-mount');
        mount.innerHTML = '<p class="xv-stripe-loading"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Initialisation du paiement…</p>';
        openXvModal(stripeModal);

        // Détruit une éventuelle instance précédente
        if (embeddedCheckout) {
            try { embeddedCheckout.destroy(); } catch (e) {}
            embeddedCheckout = null;
        }

        try {
            const itemsMap = {};
            for (const [id, item] of Object.entries(cart)) itemsMap[id] = item.qty;

            const body = {
                items: itemsMap,
                customer: checkoutData.customer,
                lieuRdv: checkoutData.lieuRdv,
                calBookingUid: calBookingUid
            };

            const res = await fetch(`${FUNCTIONS_BASE}/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || `HTTP ${res.status}`);
            }
            const { clientSecret, publishableKey } = await res.json();
            if (!clientSecret) throw new Error('Aucun clientSecret renvoyé');

            const pk = publishableKey || await fetchPublishableKey();
            if (!pk) throw new Error('Clé Stripe indisponible');

            if (!stripeInstance) stripeInstance = window.Stripe(pk);

            mount.innerHTML = '';
            embeddedCheckout = await stripeInstance.initEmbeddedCheckout({
                clientSecret,
                onComplete: () => {
                    // Redirection vers success.html gérée par Stripe via return_url
                }
            });
            embeddedCheckout.mount('#stripe-checkout-mount');
        } catch (err) {
            console.error('[Stripe] Embedded init error:', err);
            mount.innerHTML = `<p class="xv-stripe-error"><i class="fa-solid fa-triangle-exclamation mr-2"></i>Erreur : ${escapeHtml(err.message || 'inconnu')}</p>`;
            showToast('Erreur paiement', { variant: 'error' });
        }
    }

    // ============================================================
    // SCROLLSPY — surbrillance subnav selon la section qui traverse
    // la ligne de référence (juste sous navbar + subnav).
    // Aucune catégorie active tant que le hero reste majoritairement
    // visible (on ne "reste" pas sur Configurateur en remontant).
    // ============================================================
    const subnavBtns = document.querySelectorAll('.cat-subnav-btn');
    const sectionIds = ['configurateur', 'best-sellers', 'installation', 'accessoires', 'faq', 'avis'];
    const sectionEls = sectionIds
        .map(id => ({ id, el: document.getElementById(id) }))
        .filter(s => s.el);
    const heroEl = document.getElementById('accueil');

    if (subnavBtns.length && sectionEls.length) {
        const setActiveSubnav = (id) => {
            subnavBtns.forEach(btn => {
                const isActive = !!id && btn.dataset.target === id;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        };

        // Ligne de référence : juste sous le subnav collé
        const getOffset = () => {
            const subnav = document.querySelector('.cat-subnav');
            const subnavH = subnav ? subnav.getBoundingClientRect().height : 48;
            return 64 + subnavH; // navbar (~64) + subnav
        };

        let rafId = null;
        const updateActive = () => {
            rafId = null;
            const offset = getOffset();

            // Si le hero est encore majoritairement dans le viewport,
            // on n'active aucune catégorie du subnav
            if (heroEl) {
                const heroRect = heroEl.getBoundingClientRect();
                if (heroRect.bottom > offset + 80) {
                    setActiveSubnav(null);
                    return;
                }
            }

            // Section active = celle qui traverse la ligne de référence
            let activeId = null;
            for (const { id, el } of sectionEls) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= offset + 10 && rect.bottom > offset + 10) {
                    activeId = id;
                    break;
                }
            }
            setActiveSubnav(activeId);
        };

        const scheduleUpdate = () => {
            if (rafId !== null) return;
            rafId = requestAnimationFrame(updateActive);
        };

        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);
        updateActive();
    }

})();
