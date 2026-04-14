// script.js

// 1. On crée la variable de contrôle en dehors de la fonction
let currentActiveSolution = '';

function showSolution(type) {
    // 2. CONDITION ANTI-RÉPÉTITION : Si on survole le même bouton, on stoppe tout de suite
    if (type === currentActiveSolution) return;

    const display = document.getElementById('solution-content');
    let content = "";

    const solutions = {
        'family': {
            tag: "Pack Expérience Arrière",
            title: "Le Cinéma Privé",
            items: ["Écran 17.3\" ultra-fin ou Appuie-tête 10.1\"", "Casques sans fil & Manettes Gaming"],
            link: "Vérifier mon véhicule",
            warning: "⚠️ Analyse de compatibilité : Toit Panoramique ou Ouvrant compatible"
        },
        'pro': {
            tag: "Expertise Business",
            title: "Bureau Connecté",
            items: ["CarPlay & Android Auto sans fil", "Dashcam 4K avant/arrière intégrée", "Modem 4G/5G haute vitesse"],
            link: "Solutions flottes & VO"
        },
        'protection': {
            tag: "Esthétique & Valeur",
            title: "Finition Concours",
            items: ["Protection écran oléophobique", "Pack Clean : Tapis & Cuirs", "Parfum d'ambiance Signature"],
            link: "Découvrir les accessoires"
        }
    };

    const data = solutions[type];

    // Construction du contenu HTML
    content = `
        <span class="text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">${data.tag}</span>
        <h3 class="text-4xl font-black mb-6 uppercase italic">${data.title}</h3>
        ${data.warning ? `<p class="text-[10px] text-amber-500 font-bold mb-4 uppercase">${data.warning}</p>` : ''}
        <ul class="space-y-4 mb-8">
            ${data.items.map(item => `<li class="flex items-center text-sm"><i class="fa-solid fa-circle-check mr-3 text-white"></i> ${item}</li>`).join('')}
        </ul>
        <a href="#rdv" class="text-white border-b border-white pb-1 font-bold uppercase text-[10px] tracking-widest hover:text-gray-400 transition">${data.link}</a>
    `;

    // 3. ANIMATION DE SORTIE
    display.style.opacity = 0;
    display.style.transform = "translateY(10px)"; // Légère descente

    setTimeout(() => {
        // 4. MISE À JOUR DU CONTENU ET DE LA VARIABLE
        display.innerHTML = content;
        currentActiveSolution = type; // On mémorise que c'est cette solution qui est affichée

        // 5. ANIMATION D'ENTRÉE
        display.style.opacity = 1;
        display.style.transform = "translateY(0)"; // Retour à la position initiale
    }, 200);
}


// Smooth scroll sur clic menu uniquement (pas au scroll naturel)
// Les .brand-logo-link sont gérés par preselectBrand() dans initConfigurator
document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link || link.classList.contains('brand-logo-link')) return;
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    // Empêche le header de se masquer pendant le scroll programmatique
    isMenuNavigation = true;
    clearTimeout(menuNavTimeout);
    menuNavTimeout = setTimeout(() => { isMenuNavigation = false; }, 1200);
    target.scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger-btn');
    const dropdown = document.getElementById('mobile-dropdown');
    const overlay = document.getElementById('menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-item');

    function toggleMenu() {
        // Enlève le focus du bouton (évite le style "sélectionné")
        if (document.activeElement) document.activeElement.blur();

        const isOpen = dropdown.classList.contains('show');

        if (!isOpen) {
            // OUVERTURE
            dropdown.classList.remove('hide');
            dropdown.classList.add('show');
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            // FERMETURE ANIMÉE
            dropdown.classList.add('hide');
            overlay.classList.add('hidden');
            document.body.style.overflow = '';

            // On attend la fin de l'animation (300ms) avant de masquer
            setTimeout(() => {
                dropdown.classList.remove('show');
                dropdown.classList.remove('hide');
            }, 300);
        }
    }

    burgerBtn.onclick = (e) => {
        e.stopPropagation();
        toggleMenu();
    };

    overlay.onclick = toggleMenu;

    mobileLinks.forEach(link => {
        link.onclick = () => {
            // On laisse un tout petit délai pour que le clic soit bien pris en compte
            setTimeout(toggleMenu, 100);
        };
    });
});

(function () {
    const packBtns = document.querySelectorAll('.cal-pack-btn');
    const calContainer = document.getElementById('cal-container');

    const widgets = {
        'pack-livraison-4h': document.getElementById('my-cal-inline-pack-livraison-4h'),
        'pack-clean-4h': document.getElementById('my-cal-inline-pack-clean-4h'),
        'pack-cafe-4h': document.getElementById('my-cal-inline-pack-cafe-4h'),
    };
    const initialized = {};

    function ensureCalScript() {
        if (!window.Cal) {
            (function (C, A, L) {
                let p = function (a, ar) { a.q.push(ar); };
                let d = C.document;
                C.Cal = C.Cal || function () {
                    let cal = C.Cal; let ar = arguments;
                    if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
                    if (ar[0] === L) {
                        const api = function () { p(api, arguments); };
                        const namespace = ar[1]; api.q = api.q || [];
                        if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return;
                    } p(cal, ar);
                };
            })(window, "https://app.cal.eu/embed/embed.js", "init");
        }
    }

    function loadPack(packName) {
        ensureCalScript();

        calContainer.classList.remove('hidden');
        Object.values(widgets).forEach(w => w.classList.add('hidden'));
        widgets[packName].classList.remove('hidden');

        if (!initialized[packName]) {
            initialized[packName] = true;
            Cal("init", packName, { origin: "https://app.cal.eu" });
            Cal.ns[packName]("inline", {
                elementOrSelector: `#my-cal-inline-${packName}`,
                config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true", "locale": "fr", "theme": "dark" },
                calLink: `xperience-vision/${packName}?locale=fr`,
            });
            Cal.ns[packName]("ui", { "hideEventTypeDetails": false, "layout": "month_view", "theme": "dark" });
        }
    }

    packBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const pack = this.dataset.pack;

            packBtns.forEach(b => {
                b.classList.remove('bg-black', 'text-white', 'border-black');
                b.classList.add('border-gray-200', 'text-gray-500');
            });
            this.classList.remove('border-gray-200', 'text-gray-500');
            this.classList.add('bg-black', 'text-white', 'border-black');

            loadPack(pack);
        });
    });
})();

document.querySelectorAll('[data-select-pack]').forEach(btn => {
    btn.addEventListener('click', function () {
        const packName = this.dataset.selectPack;
        const calBtn = document.querySelector(`.cal-pack-btn[data-pack="${packName}"]`);
        if (calBtn) calBtn.click();
        document.getElementById('rdv').scrollIntoView({ behavior: 'smooth' });
    });
});

// Animation and tracking for scroll indicators on mobile
function updateScrollIndicators(container, dotsContainerId) {
    const dotsContainer = document.getElementById(dotsContainerId);
    if (!dotsContainer) return;

    // Check if we are on mobile (where dots are visible)
    if (window.innerWidth >= 768) return;

    const dots = dotsContainer.children;
    if (dots.length === 0) return;

    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    // Prevent division by zero if scrolling is not possible
    if (scrollWidth <= clientWidth) return;

    // Calculate percentage scrolled
    const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);

    // Determine which dot should be active based on percentage
    // Number of scroll segments = dots.length - 1
    const activeIndex = Math.min(
        Math.max(
            Math.round(scrollPercentage * (dots.length - 1)),
            0
        ),
        dots.length - 1
    );

    // Update dot styles
    for (let i = 0; i < dots.length; i++) {
        if (i === activeIndex) {
            dots[i].classList.remove('opacity-30');
            dots[i].classList.add('opacity-100');
        } else {
            dots[i].classList.remove('opacity-100');
            dots[i].classList.add('opacity-30');
        }
    }
}

// Logic to hide header on scroll down, show on scroll up (mobile premium feature)
let lastScrollTop = 0;
let isMenuNavigation = false;
let menuNavTimeout;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Only apply on mobile devices
    if (window.innerWidth < 768) {
        if (!isMenuNavigation && scrollTop > lastScrollTop && scrollTop > 50) {
            // Scroll down & past threshold -> hide header (manual scroll only)
            navbar.style.transform = 'translateY(-100%)';
            // Also hide the mobile dropdown if it was open
            const dropdown = document.getElementById('mobile-dropdown');
            const overlay = document.getElementById('menu-overlay');
            if (dropdown && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
                dropdown.classList.add('hide');
                overlay.classList.add('hidden');
                document.body.style.overflow = '';
            }
        } else {
            // Scroll up ou navigation menu -> header visible
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        // Always show on desktop
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
}, { passive: true });

// --- GESTION DU FORMULAIRE DE CONTACT ---
document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const btn = document.getElementById('form-submit-btn');
    const originalText = btn.innerText;
    
    // État de chargement
    btn.innerText = 'ENVOI EN COURS...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    try {
        const formData = new FormData(e.target);
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        });

        if (response.ok) {
            btn.innerText = 'MESSAGE ENVOYÉ AVEC SUCCÈS !';
            btn.style.backgroundColor = '#10B981'; // Vert succès
            btn.style.color = '#fff';
            e.target.reset(); // Vide le formulaire
        } else {
            throw new Error('Erreur réseau');
        }
    } catch (error) {
        btn.innerText = 'ERREUR LORS DE L\'ENVOI';
        btn.style.backgroundColor = '#EF4444'; // Rouge erreur
        btn.style.color = '#fff';
    }

    // Remettre le bouton à la normale après 4 secondes
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
        btn.style.opacity = '1';
        btn.disabled = false;
    }, 4000);
});

// Auto-resize textarea
(function () {
    function autoResize(el) {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }
    document.addEventListener('DOMContentLoaded', () => {
        const ta = document.getElementById('form-message');
        if (!ta) return;
        ta.addEventListener('input', () => autoResize(ta));
        autoResize(ta);
    });
    window._resizeMessageTextarea = function () {
        const ta = document.getElementById('form-message');
        if (ta) { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; }
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    const subjectSelect = document.getElementById('form-subject');
    const vehicleInput = document.getElementById('form-vehicle');
    const vehicleAsterisk = document.getElementById('vehicle-asterisk');

    // Fonction qui met à jour l'obligation du champ Véhicule
    function updateVehicleRequirement() {
        const subject = subjectSelect.value;
        
        // Si c'est un partenariat ou "Autre", le véhicule n'est pas obligatoire
        if (subject === 'Partenariat professionnel' || subject === 'Autre') {
            vehicleInput.removeAttribute('required');
            vehicleAsterisk.classList.add('hidden'); // Cache l'astérisque (classe Tailwind)
        } else {
            // Pour Devis et SAV, c'est obligatoire
            vehicleInput.setAttribute('required', 'required');
            vehicleAsterisk.classList.remove('hidden'); // Affiche l'astérisque
        }
    }

    // On lance la fonction au chargement de la page pour initialiser le bon état
    updateVehicleRequirement();

    // On écoute les changements dans la liste déroulante "Objet"
    subjectSelect.addEventListener('change', updateVehicleRequirement);
});

// =====================================================================
// CONFIGURATEUR MULTI-STEP
// =====================================================================

const MODELES = {
    tesla:          ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'],
    byd:            ['Atto 3', 'Seal', 'Seal U', 'Han', 'Tang', 'Dolphin', 'Sealion 7'],
    xpeng:          ['G6', 'G9', 'P7'],
    bmw:            ['Série 3', 'Série 5', 'X3', 'X5', 'iX', 'i4', 'i7'],
    mercedes:       ['Classe C', 'Classe E', 'Classe S', 'GLC', 'GLE', 'EQE', 'EQS'],
    'range-rover':  ['Evoque', 'Velar', 'Sport', 'Range Rover']
};

const NOMS_MARQUES = {
    tesla:          'Tesla',
    byd:            'BYD',
    xpeng:          'XPeng',
    bmw:            'BMW',
    mercedes:       'Mercedes-Benz',
    'range-rover':  'Range Rover',
    autre:          'Autre véhicule'
};

const NOMS_UNIVERS = {
    familiale:  'Expérience Familiale',
    business:   'Productivité Business',
    esthetique: 'Esthétique & Valeur'
};

const configState = { brand: null, model: null, univers: null };

function goToStep(n) {
    // Masquer tous les steps
    document.querySelectorAll('.config-step').forEach(s => s.classList.add('hidden'));
    // Afficher le step cible
    const target = document.querySelector(`.config-step[data-step="${n}"]`);
    if (target) {
        target.classList.remove('hidden');
        // Scroll vers le configurateur (doux)
        document.getElementById('configurateur').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Mettre à jour la barre de progression
    for (let i = 1; i <= 4; i++) {
        const dot = document.querySelector(`.config-step-dot[data-dot="${i}"]`);
        if (!dot) continue;
        dot.classList.remove('active', 'done');
        if (i < n) dot.classList.add('done');
        else if (i === n) dot.classList.add('active');
    }
    for (let i = 1; i <= 3; i++) {
        const conn = document.querySelector(`.config-connector[data-conn="${i}"]`);
        if (!conn) continue;
        conn.classList.toggle('done', i < n);
    }
}

function renderModels(brand) {
    const grid = document.getElementById('config-models-grid');
    const autreWrap = document.getElementById('config-autre-wrap');
    grid.innerHTML = '';
    autreWrap.classList.add('hidden');

    if (brand === 'autre') {
        autreWrap.classList.remove('hidden');
        document.getElementById('config-autre-input').focus();
        return;
    }

    const models = MODELES[brand] || [];
    models.forEach(m => {
        const btn = document.createElement('button');
        btn.className = 'config-brand-btn';
        btn.textContent = m;
        btn.addEventListener('click', () => selectModel(m));
        grid.appendChild(btn);
    });
}

function selectBrand(brand) {
    configState.brand = brand;
    configState.model = null;
    configState.univers = null;
    renderModels(brand);
    goToStep(2);
}

function selectModel(model) {
    configState.model = model;
    goToStep(3);
}

function selectUnivers(univers) {
    configState.univers = univers;
    renderRecap();
    goToStep(4);
}

function renderRecap() {
    const container = document.getElementById('config-recap-rows');
    if (!container) return;
    const brandName = NOMS_MARQUES[configState.brand] || configState.brand;
    const rows = [
        { label: 'Marque',  value: brandName },
        { label: 'Modèle',  value: configState.model || '—' },
        { label: 'Univers', value: NOMS_UNIVERS[configState.univers] || configState.univers }
    ];
    container.innerHTML = rows.map(r => `
        <div class="config-recap-row">
            <span class="config-recap-label">${r.label}</span>
            <span class="config-recap-value">${r.value}</span>
        </div>
    `).join('');
}

function prefillContactForm() {
    const brandName = NOMS_MARQUES[configState.brand] || configState.brand;
    const vehicleStr = configState.model
        ? `${brandName} ${configState.model}`
        : brandName;
    const univers = NOMS_UNIVERS[configState.univers] || configState.univers;

    const msg = `Bonjour,

Je souhaite obtenir un devis personnalisé pour mon ${vehicleStr}.

Univers sélectionné via le configurateur : ${univers}.

Pourriez-vous me proposer les solutions adaptées à mon véhicule et me communiquer les tarifs correspondants ?

Je reste disponible pour tout échange complémentaire.

Cordialement`;

    const vehicleInput = document.getElementById('form-vehicle');
    const messageInput = document.getElementById('form-message');
    const subjectSelect = document.getElementById('form-subject');

    if (vehicleInput) vehicleInput.value = vehicleStr.toUpperCase();
    if (subjectSelect) subjectSelect.value = 'Demande de devis';
    if (messageInput) messageInput.value = msg;

    if (typeof window._resizeMessageTextarea === 'function') window._resizeMessageTextarea();

    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function preselectBrand(brand) {
    selectBrand(brand);
    document.getElementById('configurateur').scrollIntoView({ behavior: 'smooth' });
}

function initConfigurator() {
    // Boutons marques (step 1)
    document.querySelectorAll('.config-brand-btn[data-brand]').forEach(btn => {
        btn.addEventListener('click', () => selectBrand(btn.dataset.brand));
    });

    // Boutons univers (step 3)
    document.querySelectorAll('.config-univers-btn[data-univers]').forEach(btn => {
        btn.addEventListener('click', () => selectUnivers(btn.dataset.univers));
    });

    // Boutons retour
    document.querySelectorAll('.config-back-btn[data-target]').forEach(btn => {
        btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.target)));
    });

    // Confirm "autre véhicule"
    const confirmBtn = document.getElementById('config-autre-confirm');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const val = document.getElementById('config-autre-input').value.trim();
            if (val) selectModel(val);
        });
    }

    // Enter dans le champ autre
    const autreInput = document.getElementById('config-autre-input');
    if (autreInput) {
        autreInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = autreInput.value.trim();
                if (val) selectModel(val);
            }
        });
    }

    // Logos marques du bandeau
    document.querySelectorAll('.brand-logo-link[data-brand]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            preselectBrand(link.dataset.brand);
        });
    });
}

document.addEventListener('DOMContentLoaded', initConfigurator);

// =====================================================================
// MARQUEE — boucle sans couture, espacement naturel
// =====================================================================
(function () {
    function initMarquee() {
        const wrap  = document.querySelector('.marquee-wrap');
        const track = document.querySelector('.marquee-track');
        if (!wrap || !track) return;

        // Largeur d'un set (2 sets en HTML = moitié du track initial)
        const oneSetWidth = track.scrollWidth / 2;
        const wrapWidth   = wrap.offsetWidth;

        // Cloner des sets jusqu'à ce que le track soit toujours plein pendant l'animation
        // Condition : totalWidth - oneSetWidth >= wrapWidth
        const origItems = Array.from(track.children);
        while (track.scrollWidth - oneSetWidth < wrapWidth) {
            origItems.forEach(el => track.appendChild(el.cloneNode(true)));
        }

        // Exprimer le déplacement (= 1 set) en % du track total
        const pct = -(oneSetWidth / track.scrollWidth * 100).toFixed(3);
        track.style.setProperty('--marquee-pct', pct + '%');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMarquee);
    } else {
        initMarquee();
    }
})();


// =====================================================================
// SCROLL REVEAL (Intersection Observer)
// =====================================================================
(function () {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
})();

// =====================================================================
// COMPTEURS ANIMÉS (#pros stats)
// =====================================================================
(function () {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el     = entry.target;
            const target = parseFloat(el.dataset.target);
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            const dur    = 1800;
            const t0     = performance.now();

            function update(now) {
                const progress = Math.min((now - t0) / dur, 1);
                const eased    = 1 - Math.pow(1 - progress, 3);
                el.textContent = prefix + Math.round(eased * target) + suffix;
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
})();

// =====================================================================
// Auto-resize Cal.com embeds via postMessage pour éviter l'espace vide qui bloque le scroll mobile
window.addEventListener('message', function (e) {
    try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (!data || data.type !== '__dimensionChanged') return;
        const height = data.iframeHeight;
        if (!height) return;

        // Si Cal.com envoie le namespace, on cible l'élément exact
        if (data.namespace) {
            const el = document.getElementById('my-cal-inline-' + data.namespace);
            if (el) el.style.height = height + 'px';
        } else {
            // Sinon on redimensionne celui qui est visible
            ['pack-livraison-4h', 'pack-clean-4h', 'pack-cafe-4h'].forEach(function (name) {
                const el = document.getElementById('my-cal-inline-' + name);
                if (el && !el.classList.contains('hidden')) {
                    el.style.height = height + 'px';
                }
            });
        }
    } catch (err) {}
});