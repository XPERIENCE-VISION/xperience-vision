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
        <a href="#installation" class="text-white border-b border-white pb-1 font-bold uppercase text-[10px] tracking-widest hover:text-gray-400 transition">${data.link}</a>
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

    // Logo nav : toujours scroll vers le tout haut (pas l'ancre #accueil)
    if (link.classList.contains('nav-logo')) {
        e.preventDefault();
        isMenuNavigation = true;
        clearTimeout(menuNavTimeout);
        menuNavTimeout = setTimeout(() => { isMenuNavigation = false; }, 1200);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

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

    if (!burgerBtn || !dropdown) return;

    let burgerLastFocus = null;

    function toggleMenu() {
        const isOpen = dropdown.classList.contains('show');
        if (document.activeElement) document.activeElement.blur();

        if (!isOpen) {
            // OUVERTURE
            burgerLastFocus = burgerBtn;
            dropdown.classList.remove('hide');
            dropdown.classList.add('show');
            if (overlay) overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            // Focus sur le 1er lien pour accès clavier
            const first = dropdown.querySelector('a, button');
            if (first) setTimeout(() => first.focus(), 50);
        } else {
            // FERMETURE
            dropdown.classList.add('hide');
            if (overlay) overlay.classList.add('hidden');
            document.body.style.overflow = '';
            setTimeout(() => {
                dropdown.classList.remove('show');
                dropdown.classList.remove('hide');
            }, 300);
            if (burgerLastFocus) burgerLastFocus.focus();
            burgerLastFocus = null;
        }
    }

    burgerBtn.onclick = (e) => {
        e.stopPropagation();
        toggleMenu();
    };

    if (overlay) overlay.onclick = toggleMenu;

    mobileLinks.forEach(link => {
        link.onclick = () => {
            setTimeout(toggleMenu, 100);
        };
    });

    // Escape ferme le menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dropdown.classList.contains('show')) toggleMenu();
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

    // Guard : ces éléments n'existent que sur contact.html (form Netlify)
    if (!subjectSelect || !vehicleInput || !vehicleAsterisk) return;

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
// CONFIGURATEUR — accessoires sur-mesure par marque (2 étapes)
// =====================================================================

const NOMS_MARQUES = {
    tesla:          'Tesla',
    byd:            'BYD',
    xpeng:          'XPeng',
    bmw:            'BMW',
    mercedes:       'Mercedes-Benz',
    'range-rover':  'Range Rover',
    autre:          'Autre véhicule'
};

// Liste exhaustive des modèles par marque (pour l'étape 2 du configurateur)
const MODELES = {
    byd:            ['Seal', 'Seal U', 'Han', 'Tang', 'Atto 3'],
    tesla:          ['Model 3', 'Model 3 Highland', 'Model Y'],
    xpeng:          ['G6', 'G9', 'P7'],
    bmw:            ['Série 3', 'Série 5', 'X3', 'X5', 'X7', 'Série M'],
    mercedes:       ['Classe C', 'Classe E', 'Classe S', 'GLC', 'GLE', 'GLS'],
    'range-rover':  ['Velar', 'Sport', 'Range Rover']
};

// Catalogue produits par marque. Les IDs et prix DOIVENT correspondre à
// netlify/functions/_lib/products.js (validation server-side zero-trust).
// modeles = liste des modèles compatibles ou ['all'] = tous modèles de la marque.
const PRODUCTS_BY_BRAND = {
    byd: [
        { id: 'BYD-001', name: 'Film protection écran rotatif 15.6"',   price: 89,   modeles: ['Seal', 'Han', 'Tang', 'Atto 3'], icon: 'fa-shield-halved' },
        { id: 'BYD-002', name: 'Tapis TPE 3D logotés BYD',               price: 149,  modeles: ['all'], icon: 'fa-road' },
        { id: 'BYD-003', name: 'Coque clé cuir nappa',                   price: 59,   modeles: ['all'], icon: 'fa-key' },
        { id: 'BYD-004', name: 'Seuils de porte LED « BYD »',            price: 189,  modeles: ['all'], icon: 'fa-door-open' },
        { id: 'BYD-005', name: 'Protection coffre sur-mesure',           price: 119,  modeles: ['Seal U', 'Atto 3', 'Tang'], icon: 'fa-box' },
        { id: 'BYD-006', name: 'Habillage console centrale carbone',     price: 249,  modeles: ['Seal', 'Han'], icon: 'fa-layer-group' },
        { id: 'BYD-007', name: 'Habillage console alcantara',            price: 299,  modeles: ['Seal', 'Han', 'Tang'], icon: 'fa-layer-group' },
        { id: 'BYD-008', name: 'Films teintés homologués',               price: 349,  modeles: ['all'], icon: 'fa-window-maximize' },
        { id: 'BYD-009', name: 'Protection toit panoramique UV',         price: 199,  modeles: ['Seal', 'Tang', 'Han'], icon: 'fa-sun' },
        { id: 'BYD-010', name: 'Adaptateur charge Type 2 / CCS premium', price: 179,  modeles: ['all'], icon: 'fa-plug' },
        { id: 'BYD-011', name: 'Support smartphone magnétique',          price: 49,   modeles: ['all'], icon: 'fa-mobile-screen' },
        { id: 'BYD-012', name: 'Caches valves logotés BYD',              price: 29,   modeles: ['all'], icon: 'fa-circle-dot' },
        { id: 'BYD-013', name: 'Pédales aluminium sport',                price: 89,   modeles: ['all'], icon: 'fa-shoe-prints' },
        { id: 'BYD-014', name: 'Dashcam intégrée discrète',              price: 449,  modeles: ['all'], icon: 'fa-video' }
    ],
    tesla: [
        { id: 'TSL-001', name: 'Console centrale wrap alcantara',        price: 229,  modeles: ['Model 3', 'Model Y'], icon: 'fa-layer-group' },
        { id: 'TSL-002', name: 'Console centrale wrap carbone',          price: 199,  modeles: ['Model 3', 'Model Y'], icon: 'fa-layer-group' },
        { id: 'TSL-003', name: 'Boutons physiques volant Highland',      price: 159,  modeles: ['Model 3 Highland'], icon: 'fa-circle-dot' },
        { id: 'TSL-004', name: 'Films PPF capot',                        price: 690,  modeles: ['all'], icon: 'fa-shield-halved' },
        { id: 'TSL-005', name: 'Films PPF pare-chocs avant',             price: 490,  modeles: ['all'], icon: 'fa-shield-halved' },
        { id: 'TSL-006', name: 'Pack PPF intégral',                      price: 2890, modeles: ['all'], icon: 'fa-shield' },
        { id: 'TSL-007', name: 'Jantes aero covers alternatifs',         price: 349,  modeles: ['Model 3', 'Model Y'], icon: 'fa-compact-disc' },
        { id: 'TSL-008', name: 'Tapis coffre + frunk',                   price: 189,  modeles: ['all'], icon: 'fa-box' },
        { id: 'TSL-009', name: 'Caméra recul HD améliorée',              price: 299,  modeles: ['all'], icon: 'fa-camera' },
        { id: 'TSL-010', name: 'Hub USB multiport boîte à gants',        price: 79,   modeles: ['Model 3', 'Model Y'], icon: 'fa-plug' },
        { id: 'TSL-011', name: 'Pédales aluminium Tesla',                price: 99,   modeles: ['Model 3', 'Model Y'], icon: 'fa-shoe-prints' },
        { id: 'TSL-012', name: 'Tapis 3D TPE logotés',                   price: 169,  modeles: ['all'], icon: 'fa-road' },
        { id: 'TSL-013', name: 'Seuils de porte LED',                    price: 199,  modeles: ['all'], icon: 'fa-door-open' },
        { id: 'TSL-014', name: 'Film protection écran central',          price: 79,   modeles: ['all'], icon: 'fa-shield-halved' },
        { id: 'TSL-015', name: 'Dashcam Sentry Mode pro',                price: 399,  modeles: ['all'], icon: 'fa-video' }
    ],
    xpeng: [
        { id: 'XPG-001', name: 'Films écran double dashboard',           price: 129,  modeles: ['G6', 'G9', 'P7'], icon: 'fa-shield-halved' },
        { id: 'XPG-002', name: 'Pédales aluminium sport',                price: 89,   modeles: ['all'], icon: 'fa-shoe-prints' },
        { id: 'XPG-003', name: 'Habillage volant cuir nappa',             price: 349,  modeles: ['G6', 'G9'], icon: 'fa-circle-half-stroke' },
        { id: 'XPG-004', name: 'Capot chargeur sans fil renforcé',        price: 79,   modeles: ['G6', 'G9'], icon: 'fa-bolt' },
        { id: 'XPG-005', name: 'Module CarPlay sans fil XPeng',           price: 249,  modeles: ['all'], icon: 'fa-wifi' },
        { id: 'XPG-006', name: 'Tapis 3D TPE logotés',                    price: 159,  modeles: ['all'], icon: 'fa-road' },
        { id: 'XPG-007', name: 'Films teintés homologués',                price: 349,  modeles: ['all'], icon: 'fa-window-maximize' },
        { id: 'XPG-008', name: 'Protection coffre sur-mesure',            price: 119,  modeles: ['G6', 'G9'], icon: 'fa-box' },
        { id: 'XPG-009', name: 'Coque clé premium',                       price: 49,   modeles: ['all'], icon: 'fa-key' },
        { id: 'XPG-010', name: 'Seuils de porte LED « XPeng »',           price: 179,  modeles: ['all'], icon: 'fa-door-open' }
    ],
    bmw: [
        { id: 'BMW-001', name: 'Tapis 3D TPE logotés BMW M',             price: 179,  modeles: ['all'], icon: 'fa-road' },
        { id: 'BMW-002', name: 'Films PPF capot',                         price: 690,  modeles: ['all'], icon: 'fa-shield-halved' },
        { id: 'BMW-003', name: 'Habillage console carbone M',             price: 349,  modeles: ['Série 3', 'Série 5', 'X3', 'X5'], icon: 'fa-layer-group' },
        { id: 'BMW-004', name: 'Pédales aluminium M',                     price: 119,  modeles: ['all'], icon: 'fa-shoe-prints' },
        { id: 'BMW-005', name: 'Seuils LED illuminés BMW',                price: 219,  modeles: ['all'], icon: 'fa-door-open' },
        { id: 'BMW-006', name: 'Films teintés homologués',                price: 349,  modeles: ['all'], icon: 'fa-window-maximize' },
        { id: 'BMW-007', name: 'Coque clé cuir cousu main',               price: 79,   modeles: ['all'], icon: 'fa-key' },
        { id: 'BMW-008', name: 'Protection coffre cuir',                  price: 149,  modeles: ['X3', 'X5', 'X7'], icon: 'fa-box' },
        { id: 'BMW-009', name: 'Caches valves BMW M',                     price: 39,   modeles: ['all'], icon: 'fa-circle-dot' },
        { id: 'BMW-010', name: 'Habillage volant alcantara',              price: 449,  modeles: ['Série 3', 'Série 5', 'X3', 'X5', 'X7'], icon: 'fa-circle-half-stroke' },
        { id: 'BMW-011', name: 'Cache moteur alu brossé',                 price: 199,  modeles: ['Série M'], icon: 'fa-gear' },
        { id: 'BMW-012', name: 'Dashcam intégrée BMW',                    price: 499,  modeles: ['all'], icon: 'fa-video' }
    ],
    mercedes: [
        { id: 'MRC-001', name: 'Tapis 3D TPE logotés Mercedes',          price: 189,  modeles: ['all'], icon: 'fa-road' },
        { id: 'MRC-002', name: 'Films PPF capot',                         price: 690,  modeles: ['all'], icon: 'fa-shield-halved' },
        { id: 'MRC-003', name: 'Habillage console bois précieux',         price: 449,  modeles: ['Classe E', 'Classe S', 'GLE'], icon: 'fa-layer-group' },
        { id: 'MRC-004', name: 'Pédales aluminium AMG',                   price: 129,  modeles: ['all'], icon: 'fa-shoe-prints' },
        { id: 'MRC-005', name: 'Seuils LED illuminés Mercedes',           price: 229,  modeles: ['all'], icon: 'fa-door-open' },
        { id: 'MRC-006', name: 'Films teintés homologués',                price: 349,  modeles: ['all'], icon: 'fa-window-maximize' },
        { id: 'MRC-007', name: 'Coque clé cuir nappa',                    price: 89,   modeles: ['all'], icon: 'fa-key' },
        { id: 'MRC-008', name: 'Protection coffre sur-mesure SUV',        price: 169,  modeles: ['GLC', 'GLE', 'GLS'], icon: 'fa-box' },
        { id: 'MRC-009', name: 'Étoile éclairée calandre',                price: 299,  modeles: ['Classe E', 'Classe S', 'GLE', 'GLS'], icon: 'fa-star' },
        { id: 'MRC-010', name: 'Habillage volant cuir/alcantara',         price: 499,  modeles: ['all'], icon: 'fa-circle-half-stroke' },
        { id: 'MRC-011', name: 'Pack ambient lighting upgrade',           price: 590,  modeles: ['Classe C', 'Classe E', 'Classe S'], icon: 'fa-lightbulb' },
        { id: 'MRC-012', name: 'Dashcam intégrée discrète',               price: 499,  modeles: ['all'], icon: 'fa-video' }
    ],
    'range-rover': [
        { id: 'RR-001', name: 'Tapis cuir/TPE logotés',                   price: 229,  modeles: ['all'], icon: 'fa-road' },
        { id: 'RR-002', name: 'Films PPF intégral',                       price: 2990, modeles: ['all'], icon: 'fa-shield' },
        { id: 'RR-003', name: 'Habillage console bois noyer',             price: 549,  modeles: ['Velar', 'Sport', 'Range Rover'], icon: 'fa-layer-group' },
        { id: 'RR-004', name: 'Marche-pieds rétractables LED',            price: 1290, modeles: ['Sport', 'Range Rover'], icon: 'fa-stairs' },
        { id: 'RR-005', name: 'Seuils LED illuminés',                     price: 249,  modeles: ['all'], icon: 'fa-door-open' },
        { id: 'RR-006', name: 'Films teintés homologués',                 price: 449,  modeles: ['all'], icon: 'fa-window-maximize' },
        { id: 'RR-007', name: 'Coque clé cuir cousu main',                price: 99,   modeles: ['all'], icon: 'fa-key' },
        { id: 'RR-008', name: 'Protection coffre cuir',                   price: 199,  modeles: ['all'], icon: 'fa-box' },
        { id: 'RR-009', name: 'Habillage volant cuir/alcantara',          price: 549,  modeles: ['all'], icon: 'fa-circle-half-stroke' },
        { id: 'RR-010', name: 'Dashcam intégrée premium',                 price: 549,  modeles: ['all'], icon: 'fa-video' }
    ]
};

const configState = { brand: null, model: '' };

function configGoToStep(n) {
    document.querySelectorAll('#configurateur .config-step').forEach(s => s.classList.add('hidden'));
    const target = document.querySelector(`#configurateur .config-step[data-step="${n}"]`);
    if (target) target.classList.remove('hidden');
    // Libère le 100vh strict quand on affiche les résultats (étape 3)
    const section = document.getElementById('configurateur');
    if (section) section.classList.toggle('config-showing-results', n === 3);
}

function configFmtPrice(n) {
    return n.toLocaleString('fr-FR') + ' €';
}

function configEscapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
}

function configRenderModelsGrid(brand) {
    const grid = document.getElementById('config-models-grid');
    if (!grid) return;
    const models = MODELES[brand] || [];
    const buttons = [
        `<button class="config-brand-btn config-model-all" data-model="all">Tous les modèles</button>`,
        ...models.map(m => `<button class="config-brand-btn" data-model="${configEscapeHtml(m)}">${configEscapeHtml(m)}</button>`)
    ];
    grid.innerHTML = buttons.join('');
    grid.querySelectorAll('[data-model]').forEach(btn => {
        btn.addEventListener('click', () => configSelectModel(btn.dataset.model));
    });
}

function configRenderResults() {
    const grid = document.getElementById('config-results-grid');
    const empty = document.getElementById('config-results-empty');
    if (!grid || !empty) return;

    const brand = configState.brand;
    const model = configState.model;
    const products = PRODUCTS_BY_BRAND[brand] || [];

    // Filtre par modèle si choisi
    const filtered = model
        ? products.filter(p => p.modeles.includes('all') || p.modeles.includes(model))
        : products;

    if (!filtered.length) {
        grid.innerHTML = '';
        empty.hidden = false;
        return;
    }

    empty.hidden = true;

    grid.innerHTML = filtered.map(p => {
        const modelsLabel = p.modeles.includes('all')
            ? 'Compatible tous modèles'
            : 'Compatible : ' + p.modeles.join(', ');
        const encodedName = configEscapeHtml(p.name);
        return `
            <article class="cat-card">
                <div class="cat-card-media">
                    <i class="fa-solid ${p.icon} cat-card-icon"></i>
                </div>
                <div class="cat-card-body">
                    <h4>${encodedName}</h4>
                    <p>${configEscapeHtml(modelsLabel)}</p>
                    <div class="cat-card-bottom">
                        <span class="cat-price">${p.price}<span class="cat-price-cents">,00 €</span></span>
                        <button class="cat-buy-btn cat-acc-add"
                                data-add-acc="${p.id}"
                                data-name="${encodedName}"
                                data-price="${p.price}">+ Panier</button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
    // Les boutons .cat-acc-add sont captés par l'event delegation de catalogue.js
}

function configSelectBrand(brand) {
    configState.brand = brand;
    configState.model = '';

    // "Autre véhicule" → redirige directement vers les accessoires universels
    if (brand === 'autre') {
        document.getElementById('accessoires')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
    }

    // Affiche le nom de la marque dans les en-têtes
    const brandName = NOMS_MARQUES[brand] || brand;
    const stepBrandEl = document.getElementById('config-step-brand');
    if (stepBrandEl) stepBrandEl.textContent = brandName;

    // Remplit la grille des modèles pour l'étape 2
    configRenderModelsGrid(brand);

    configGoToStep(2);

    // Persister pour usage éventuel cross-page
    try {
        localStorage.setItem('xv-config-result', JSON.stringify({
            brand, brandName
        }));
    } catch (e) {}
}

function configSelectModel(model) {
    configState.model = (model === 'all') ? '' : model;

    // En-tête résultats : "Votre BYD Seal" ou "Votre BYD (tous modèles)"
    const brandName = NOMS_MARQUES[configState.brand] || configState.brand;
    const nameEl = document.getElementById('config-results-name');
    if (nameEl) {
        nameEl.textContent = configState.model
            ? `${brandName} ${configState.model}`
            : `${brandName} (tous modèles)`;
    }

    configRenderResults();
    configGoToStep(3);
}

function preselectBrand(brand) {
    configSelectBrand(brand);
    document.getElementById('configurateur')?.scrollIntoView({ behavior: 'smooth' });
}

function initConfigurator() {
    // Boutons marques (étape 1)
    document.querySelectorAll('#configurateur .config-step[data-step="1"] .config-brand-btn[data-brand]').forEach(btn => {
        btn.addEventListener('click', () => configSelectBrand(btn.dataset.brand));
    });

    // Boutons retour (étapes 2 et 3) — config-back-btn OU config-back-cta
    document.querySelectorAll('#configurateur [data-target]').forEach(btn => {
        btn.addEventListener('click', () => configGoToStep(parseInt(btn.dataset.target)));
    });

    // Logos marques du hero marquee → pré-sélection
    document.querySelectorAll('.brand-logo-link[data-brand]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const b = link.dataset.brand;
            if (NOMS_MARQUES[b]) {
                preselectBrand(b);
            } else {
                document.getElementById('configurateur')?.scrollIntoView({ behavior: 'smooth' });
            }
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