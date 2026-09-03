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

// Header always visible (no hide-on-scroll)
let isMenuNavigation = false;
let menuNavTimeout;

// --- GESTION DU FORMULAIRE DE CONTACT ---
document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('form-submit-btn');
    const banner = document.getElementById('form-banner');
    const originalText = btn.innerText;

    btn.innerText = 'ENVOI EN COURS...';
    btn.style.opacity = '0.7';
    btn.disabled = true;
    if (banner) banner.hidden = true;

    function showBanner(type, icon, message) {
        if (!banner) return;
        banner.className = `form-banner ${type}`;
        banner.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
        banner.hidden = false;
        banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    try {
        const formData = new FormData(e.target);
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        });

        if (response.ok) {
            e.target.reset();
            showBanner('success', 'fa-circle-check', 'Message envoyé avec succès — on vous répond sous 48h jours ouvrés.');
        } else {
            throw new Error('Erreur réseau');
        }
    } catch (error) {
        showBanner('error', 'fa-circle-exclamation', 'Une erreur est survenue. Réessayez ou contactez-nous via WhatsApp.');
    }

    btn.innerText = originalText;
    btn.style.opacity = '1';
    btn.disabled = false;
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

    // Sujets pour lesquels marque/modèle n'a pas de sens (pas encore de véhicule, B2B, etc.)
    const SUBJECTS_WITHOUT_VEHICLE = ['Conseil avant achat', 'Concession / Partenariat pro', 'Autre'];

    function updateVehicleRequirement() {
        const subject = subjectSelect.value;

        if (SUBJECTS_WITHOUT_VEHICLE.includes(subject)) {
            vehicleInput.removeAttribute('required');
            vehicleAsterisk.classList.add('hidden');
        } else {
            vehicleInput.setAttribute('required', 'required');
            vehicleAsterisk.classList.remove('hidden');
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
    byd:            ['Dolphin', 'Atto 2', 'Atto 3', 'Seal', 'Seal U', 'Sealion 7'],
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
    byd: (typeof PRODUITS_BYD !== 'undefined' ? PRODUITS_BYD : []),
    tesla: [
        { id: 'TSL-001', name: 'Console centrale wrap alcantara', price: 229, modeles: ['Model 3', 'Model Y'], icon: 'fa-layer-group',
          desc: 'Alcantara véritable Italie sur console Tesla · Touché suédine premium.',
          descLong: 'Habillage complet de la console centrale (accoudoir, tunnel, pourtour chargeur inductif) en Alcantara® véritable italien. Découpe laser et pose sous presse en atelier XPERIENCE VISION pour un rendu sans coutures visibles. Traitement hydrofuge anti-taches (eau, café) inclus. Compatible Tesla Model 3 (2017+) et Model Y. Garantie 3 ans anti-décollage.' },
        { id: 'TSL-002', name: 'Console centrale wrap carbone', price: 199, modeles: ['Model 3', 'Model Y'], icon: 'fa-layer-group',
          desc: 'Vinyle carbone 3M Di-Noc haute qualité · Aspect carbone tissé.',
          descLong: 'Habillage console centrale en vinyle 3M Di-Noc finition carbone tissé 3D réaliste. Thermoformage à chaud en atelier XPERIENCE VISION pour épouser toutes les formes (tunnel, accoudoir, pourtour chargeur), rendu indistinguable d\'une pièce d\'usine. Résistant aux rayures, stable aux UV. Compatible Tesla Model 3 et Model Y. Garantie 3 ans.' },
        { id: 'TSL-003', name: 'Boutons physiques volant Highland', price: 159, modeles: ['Model 3 Highland'], icon: 'fa-circle-dot',
          desc: 'Molettes physiques pour le volant Tesla Model 3 Highland · Plug & play.',
          descLong: 'Kit de boutons physiques pour restaurer les commandes tactiles du volant Tesla Model 3 Highland (2024+). Deux molettes ABS ingéniérie à clipser sur les pavés tactiles — la commande reste fonctionnelle (scroll, clic), mais avec un feedback mécanique. Clipse sans colle, démontage réversible. Finition satin noir, identique au reste du volant. Pose en 5 min, guide fourni. Garantie 2 ans.' },
        { id: 'TSL-004', name: 'Films PPF capot', price: 690, modeles: ['all'], icon: 'fa-shield-halved',
          desc: 'Film PPF 8 mil transparent sur capot Tesla · Auto-cicatrisant.',
          descLong: 'Film de protection polyuréthane (PPF) 8 mil, totalement transparent et auto-cicatrisant (micro-rayures s\'effacent avec la chaleur). Protège le capot contre les impacts de graviers, fientes, sève et UV — zone la plus exposée sur Tesla. Finition brillante qui ravive même la peinture. Pose par nos installateurs XPERIENCE VISION en atelier, 3 h. Garantie 5 ans anti-jaunissement. Compatible Model S/3/X/Y.' },
        { id: 'TSL-005', name: 'Films PPF pare-chocs avant', price: 490, modeles: ['all'], icon: 'fa-shield-halved',
          desc: 'Film PPF 8 mil sur pare-chocs + bas de caisse · Zones à risques.',
          descLong: 'Film PPF polyuréthane 8 mil auto-cicatrisant sur le pare-chocs avant et les premières dizaines de cm de capot + bas de caisse — la zone la plus exposée aux éclats. Transparent, finition brillante, ne modifie pas la teinte de la peinture. Pose atelier XPERIENCE VISION (2-3 h). Garantie 5 ans. Compatible toutes Tesla.' },
        { id: 'TSL-006', name: 'Pack PPF intégral', price: 2890, modeles: ['all'], icon: 'fa-shield',
          desc: 'Protection PPF intégrale full-body · Toute la carrosserie protégée.',
          descLong: 'Protection PPF polyuréthane 8 mil intégrale : capot, ailes, portes, pavillon, boucliers, bas de caisse, miroirs et optiques. Protection totale contre rayures, éclats et UV — votre Tesla reste en état concours pendant des années. Finition brillante ou satinée (mate) au choix. Pose par nos installateurs XPERIENCE VISION, 2 jours d\'atelier. Garantie 7 ans. Compatible Tesla Model S/3/X/Y.' },
        { id: 'TSL-008', name: 'Tapis coffre + frunk', price: 189, modeles: ['all'], icon: 'fa-box',
          desc: 'Set tapis TPE coffre arrière + coffre avant (frunk) Tesla · Sur-mesure.',
          descLong: 'Ensemble de tapis thermoformés TPE pour le coffre arrière ET le frunk (coffre avant) Tesla. Moulés au gabarit exact, rebords surélevés 30 mm qui contiennent liquides et boue. Antidérapants, résistants aux UV et aux graisses. Lavables au jet d\'eau. Compatible Tesla Model 3 (toutes années), Model Y, Model S et Model X (indiquer le modèle à la commande). Garantie 3 ans.' },
        { id: 'TSL-009', name: 'Caméra recul HD améliorée', price: 299, modeles: ['all'], icon: 'fa-camera',
          desc: 'Capteur Sony IMX 1080p · Remplacement de la caméra d\'origine.',
          descLong: 'Kit de remplacement de la caméra de recul d\'origine Tesla par un module Full HD 1080p à capteur Sony IMX 415, angle 170° avec vision nocturne infrarouge. Image visiblement plus nette, surtout de nuit et par conditions dégradées. Boîtier aluminium étanche IP68. Pose en atelier XPERIENCE VISION (1,5 h) via le faisceau d\'origine — aucune modification logicielle. Compatible toutes Tesla. Garantie 3 ans.' },
        { id: 'TSL-010', name: 'Hub USB multiport boîte à gants', price: 79, modeles: ['Model 3', 'Model Y'], icon: 'fa-plug',
          desc: 'Hub USB-A + USB-C dans la boîte à gants · Transfert données Sentry.',
          descLong: 'Hub USB qui se connecte au port USB-C intérieur de la boîte à gants : 2 ports USB-A + 1 port USB-C supplémentaires, avec SSD interne 256 GB pré-formaté pour la Sentry Mode et les Dashcam Tesla. Vitesse 10 Gb/s, remplace avantageusement la clé USB fragile et facilement bloquée. Boîtier ABS anti-chaleur. Compatible Model 3 (2021+) et Model Y. Garantie 2 ans.' },
        { id: 'TSL-011', name: 'Pédales aluminium Tesla', price: 99, modeles: ['Model 3', 'Model Y'], icon: 'fa-shoe-prints',
          desc: 'Pédalier aluminium brossé antidérapant · Pose par clips, sans perçage.',
          descLong: 'Jeu de pédales sport (accélérateur + frein + repose-pied) en aluminium brossé avec picots caoutchouc antidérapants. Pose par clips sur les pédales d\'origine Model 3 et Model Y — aucune dépose, aucun perçage. Ajoute une touche sport et améliore le grip en chaussures humides. Installation 15 min, visserie incluse. Garantie 3 ans.' },
        { id: 'TSL-012', name: 'Tapis 3D TPE logotés', price: 169, modeles: ['all'], icon: 'fa-road',
          desc: 'Tapis 3D TPE logotés T Tesla · Couverture intégrale avant/arrière.',
          descLong: 'Set complet de tapis thermoformés TPE avec logo T gaufré, moulés au gabarit exact de votre Tesla (Model S/3/X/Y). Rebords surélevés 30 mm, revers antidérapant sur les points d\'ancrage d\'origine. Résistants aux liquides, UV et écarts de température. Lavables au jet d\'eau. Toutes saisons. Garantie 3 ans.' },
        { id: 'TSL-013', name: 'Seuils de porte LED', price: 199, modeles: ['all'], icon: 'fa-door-open',
          desc: 'Seuils inox brossé logo T rétroéclairé · Allumage automatique.',
          descLong: 'Set de 4 seuils de porte en inox 304 brossé avec logo T Tesla rétroéclairé LED blanc froid. Allumage automatique à l\'ouverture via le faisceau courtoisie d\'origine — aucun câblage. Protège les seuils des rayures d\'entrée/sortie et apporte une signature premium. Pose adhésive 3M VHB en 10 min. Compatible toutes Tesla. Garantie 3 ans.' },
        { id: 'TSL-014', name: 'Film protection écran central', price: 79, modeles: ['all'], icon: 'fa-shield-halved',
          desc: 'Film hydrogel 9H auto-cicatrisant pour écran Tesla · Anti-traces.',
          descLong: 'Film hydrogel ultra-fin découpé sur-mesure pour l\'écran central Tesla (15" Model 3/Y, 17" Model S/X). Auto-cicatrisant (les rayures s\'effacent avec la chaleur), dureté 9H, traitement anti-traces de doigts et transparence 99 %. Pose sans bulles en 10 min avec kit complet fourni. Compatible avec la sensibilité tactile d\'origine. Garantie 2 ans.' },
        { id: 'TSL-015', name: 'Dashcam Sentry Mode pro', price: 399, modeles: ['all'], icon: 'fa-video',
          desc: 'SSD 1 TB haute endurance + hub USB dédié · Optimise Sentry + Dashcam.',
          descLong: 'Kit pro pour exploiter pleinement la Sentry Mode et la Dashcam Tesla : SSD externe 1 TB haute endurance (spécial enregistrement continu) dans un boîtier thermique ventilé, hub USB-C dédié qui laisse le second port libre. Autonomie de plusieurs semaines d\'enregistrement avant bouclage. Formatage Tesla pré-configuré, fixation sous la moquette de coffre. Compatible Model S/3/X/Y. Garantie 3 ans.' }
    ],
    xpeng: [
        { id: 'XPG-001', name: 'Films écran double dashboard', price: 129, modeles: ['G6', 'G9', 'P7'], icon: 'fa-shield-halved',
          desc: 'Films hydrogel 9H pour les 2 écrans XPeng (central + cockpit).',
          descLong: 'Set de 2 films hydrogel auto-cicatrisants découpés au gabarit exact des deux écrans du dashboard XPeng G6, G9 et P7 : l\'écran central multimédia et l\'écran cluster conducteur. Dureté 9H, transparence 99 %, traitement anti-traces. Pose sans bulles. Préserve la sensibilité tactile. Garantie 2 ans.' },
        { id: 'XPG-002', name: 'Pédales aluminium sport', price: 89, modeles: ['all'], icon: 'fa-shoe-prints',
          desc: 'Pédalier aluminium brossé antidérapant · Clips sans perçage.',
          descLong: 'Jeu de 3 pédales sport (accélérateur, frein, repose-pied) en aluminium brossé, picots caoutchouc antidérapants vissés. Pose par clips sur les pédales d\'origine XPeng, démontage réversible. Ajoute une touche sport et améliore le grip. Installation 15 min. Garantie 3 ans.' },
        { id: 'XPG-003', name: 'Habillage volant cuir nappa', price: 349, modeles: ['G6', 'G9'], icon: 'fa-circle-half-stroke',
          desc: 'Volant gainé cuir nappa cousu main · Pose par nos techniciens.',
          descLong: 'Habillage complet du volant XPeng G6 et G9 en cuir nappa véritable, cousu main point sellier par nos techniciens XPERIENCE VISION. Finition identique aux volants de véhicules premium, avec surpiqûres contrastées (blanc ou rouge au choix). Améliore le grip et protège le volant d\'origine. Travail réalisé dépose / repose incluse, 4-5 h. Garantie 3 ans.' },
        { id: 'XPG-004', name: 'Capot chargeur sans fil renforcé', price: 79, modeles: ['G6', 'G9'], icon: 'fa-bolt',
          desc: 'Cache renforcé pour le chargeur induction XPeng · Anti-rayures.',
          descLong: 'Remplacement du capot d\'origine du chargeur à induction XPeng G6 et G9 par une version renforcée en ABS chromé brossé. Plus résistant aux rayures et aux chocs, finition premium. Clips d\'origine conservés, pose en 2 min. Préserve la fonction d\'induction. Garantie 3 ans.' },
        { id: 'XPG-005', name: 'Module CarPlay sans fil XPeng', price: 249, modeles: ['all'], icon: 'fa-wifi',
          desc: 'Adaptateur plug & play ajoutant CarPlay sans fil sur XPeng.',
          descLong: 'Adaptateur qui ajoute Apple CarPlay sans fil à votre XPeng — ni câble, ni modification logicielle. Branchement sur le port USB-C de la console centrale, détection automatique du téléphone dès que vous montez à bord. Transfert audio haute qualité, reconnaissance vocale Siri, mises à jour OTA. Compatible XPeng G6, G9 et P7. Garantie 2 ans.' },
        { id: 'XPG-006', name: 'Tapis 3D TPE logotés', price: 159, modeles: ['all'], icon: 'fa-road',
          desc: 'Tapis 3D TPE sur-mesure avec logo XPeng · Toutes saisons.',
          descLong: 'Set complet de tapis thermoformés TPE moulés au gabarit exact des XPeng G6, G9 et P7. Logo XPeng gaufré, rebords surélevés qui contiennent liquides et boue, revers antidérapant. Résistants aux UV, graisses et écarts de température. Lavables au jet d\'eau. Utilisables toutes saisons. Garantie 3 ans.' },
        { id: 'XPG-007', name: 'Films teintés homologués', price: 349, modeles: ['all'], icon: 'fa-window-maximize',
          desc: 'Films céramiques homologués · 3 teintes · Pose atelier XPERIENCE VISION.',
          descLong: 'Films teintés céramique nanométrique pour vitres arrière + lunette, homologués route. 3 niveaux : 35 %, 20 % ou 5 %. Rejet chaleur -70 %, UV 99 %, anti-éblouissement. Pose atelier XPERIENCE VISION en salle climatisée pour un rendu sans bulles. Garantie à vie contre décollement et jaunissement.' },
        { id: 'XPG-008', name: 'Protection coffre sur-mesure', price: 119, modeles: ['G6', 'G9'], icon: 'fa-box',
          desc: 'Bac coffre TPE rebords 40 mm · Sur-mesure XPeng G6/G9.',
          descLong: 'Bac de coffre thermoformé TPE haute densité, moulé au gabarit exact du coffre des XPeng G6 et G9. Rebords surélevés 40 mm qui contiennent liquides et boue. Surface gaufrée antidérapante. Imperméable, résistant aux UV et aux graisses. Lavable au jet d\'eau. Idéal animaux, sportifs, matériel de bricolage. Garantie 3 ans.' },
        { id: 'XPG-009', name: 'Coque clé premium', price: 49, modeles: ['all'], icon: 'fa-key',
          desc: 'Étui cuir véritable cousu main pour télécommande XPeng.',
          descLong: 'Étui cuir véritable cousu main pour la télécommande XPeng G6, G9 et P7. Protège des chocs et patine avec le temps. Dragonne amovible et anneau métallique inclus, 3 coloris (noir, cognac, bleu marine). Garantie 2 ans.' },
        { id: 'XPG-010', name: 'Seuils de porte LED « XPeng »', price: 179, modeles: ['all'], icon: 'fa-door-open',
          desc: 'Seuils inox brossé logo XPeng rétroéclairé · Sans câblage.',
          descLong: 'Set de 4 seuils de porte en inox 304 brossé avec logo XPeng rétroéclairé LED blanc froid. Allumage automatique à l\'ouverture via le faisceau d\'éclairage courtoisie d\'origine — aucun câblage. Protège les seuils et signe l\'habitacle. Pose adhésive 3M VHB, 10 min. Garantie 3 ans.' }
    ],
    bmw: [
        { id: 'BMW-001', name: 'Tapis 3D TPE logotés BMW M', price: 179, modeles: ['all'], icon: 'fa-road',
          desc: 'Tapis 3D TPE logotés M · Rebords anti-projection · Toutes saisons.',
          descLong: 'Set complet de tapis thermoformés TPE haute densité avec logo M gaufré, moulés au gabarit exact de votre BMW (Série 3, 5, X3, X5, X7, Série M). Rebords surélevés 30 mm qui contiennent liquides et boue, revers antidérapant sur les ancrages d\'origine. Résistants aux UV et aux graisses. Lavables au jet d\'eau. Garantie 3 ans.' },
        { id: 'BMW-002', name: 'Films PPF capot', price: 690, modeles: ['all'], icon: 'fa-shield-halved',
          desc: 'PPF polyuréthane 8 mil transparent · Capot protégé à vie.',
          descLong: 'Film PPF 8 mil polyuréthane auto-cicatrisant qui protège le capot contre impacts graviers, fientes, sève et UV. Totalement transparent, finition brillante qui ravive même la peinture. Pose atelier XPERIENCE VISION en 3 h, démontage sans trace possible. Garantie 5 ans anti-jaunissement. Compatible toute la gamme BMW.' },
        { id: 'BMW-003', name: 'Habillage console carbone M', price: 349, modeles: ['Série 3', 'Série 5', 'X3', 'X5'], icon: 'fa-layer-group',
          desc: 'Vinyle carbone 3M Di-Noc sur console BMW · Style M.',
          descLong: 'Habillage console centrale en vinyle 3M Di-Noc finition carbone tissé 3D. Thermoformage à chaud en atelier XPERIENCE VISION pour un rendu parfait sur Série 3, 5, X3 et X5. Résistant aux rayures et stable aux UV, indistinguable d\'une finition M d\'usine. Garantie 3 ans anti-décollage.' },
        { id: 'BMW-004', name: 'Pédales aluminium M', price: 119, modeles: ['all'], icon: 'fa-shoe-prints',
          desc: 'Pédalier aluminium brossé avec picots caoutchouc M · Clips sans perçage.',
          descLong: 'Jeu de pédales sport (accélérateur, frein, repose-pied) en aluminium brossé signature M, picots caoutchouc antidérapants. Pose par clips sur les pédales d\'origine — aucun perçage, aucune dépose. Ajoute une touche sport au poste de conduite. Installation 15 min. Compatible toute la gamme BMW. Garantie 3 ans.' },
        { id: 'BMW-005', name: 'Seuils LED illuminés BMW', price: 219, modeles: ['all'], icon: 'fa-door-open',
          desc: 'Seuils inox brossé logo BMW rétroéclairé · Sans câblage.',
          descLong: 'Set de 4 seuils en inox 304 brossé avec logo BMW rétroéclairé LED blanc froid. Allumage auto à l\'ouverture via faisceau courtoisie d\'origine — aucun câblage. Protège les seuils et signe l\'habitacle premium. Pose adhésive 3M VHB, 10 min. Compatible toute la gamme BMW. Garantie 3 ans.' },
        { id: 'BMW-006', name: 'Films teintés homologués', price: 349, modeles: ['all'], icon: 'fa-window-maximize',
          desc: 'Films céramiques homologués · 3 teintes · Pose atelier XPERIENCE VISION.',
          descLong: 'Films teintés céramique nanométrique pour vitres arrière + lunette, certifiés CE et homologués route. 3 niveaux : 35 %, 20 % ou 5 %. Rejet chaleur jusqu\'à 70 %, UV 99 %, anti-éblouissement. Pose atelier XPERIENCE VISION en salle climatisée. Garantie à vie contre décollement et jaunissement.' },
        { id: 'BMW-007', name: 'Coque clé cuir cousu main', price: 79, modeles: ['all'], icon: 'fa-key',
          desc: 'Étui cuir nappa cousu main pour télécommande BMW · 3 coloris.',
          descLong: 'Étui cuir nappa véritable cousu main point sellier pour la télécommande BMW (Display Key et standard). Épaissit le grip et protège des chocs. Finition naturelle qui se patine. 3 coloris disponibles : noir, cognac, bleu marine. Dragonne amovible et anneau métallique. Garantie 2 ans.' },
        { id: 'BMW-008', name: 'Protection coffre cuir', price: 149, modeles: ['X3', 'X5', 'X7'], icon: 'fa-box',
          desc: 'Protège-coffre cuir synthétique sur-mesure X3/X5/X7 · Grip et luxe.',
          descLong: 'Tapis de coffre en cuir synthétique haute qualité, découpé au gabarit exact des BMW X3, X5 et X7. Surface gaufrée antidérapante qui maintient les charges, protège la moquette d\'origine et apporte un rendu SUV premium. Résistant à l\'eau et aux rayures, lavable au chiffon humide. Revers antidérapant avec points d\'ancrage d\'origine. Garantie 3 ans.' },
        { id: 'BMW-009', name: 'Caches valves BMW M', price: 39, modeles: ['all'], icon: 'fa-circle-dot',
          desc: 'Jeu 4 bouchons aluminium logo M · Joint étanche anti-corrosion.',
          descLong: 'Jeu de 4 bouchons de valves en aluminium anodisé noir avec logo M tricolore, joint torique étanche qui protège les valves de la poussière et de l\'humidité. Empêche corrosion et fuites lentes d\'air. Clé de serrage incluse. Garantie à vie anti-corrosion.' },
        { id: 'BMW-010', name: 'Habillage volant alcantara', price: 449, modeles: ['Série 3', 'Série 5', 'X3', 'X5', 'X7'], icon: 'fa-circle-half-stroke',
          desc: 'Volant gainé Alcantara Italie · Cousu main · Surpiqûres M.',
          descLong: 'Regainage complet du volant en Alcantara® véritable italien, cousu main point sellier par nos selliers. Surpiqûres tricolores M en option (bleu/rouge), ou classiques (blanc, rouge). Améliore le grip et donne un toucher premium immédiat. Travail réalisé dépose / repose incluse, 5-6 h d\'atelier. Compatible Série 3, Série 5, X3, X5, X7. Garantie 3 ans.' },
        { id: 'BMW-011', name: 'Cache moteur alu brossé', price: 199, modeles: ['Série M'], icon: 'fa-gear',
          desc: 'Cache moteur alu brossé signature M · Remplacement du cache d\'origine.',
          descLong: 'Cache moteur en aluminium brossé mis en forme par emboutissage, avec logo M gravé laser. Remplace le cache plastique d\'origine des BMW Série M pour un rendu motorsport et une meilleure dissipation thermique. Clips d\'origine conservés, pose en 5 min. Compatible Série M (M2, M3, M4, M5). Garantie 5 ans.' },
        { id: 'BMW-012', name: 'Dashcam intégrée BMW', price: 499, modeles: ['all'], icon: 'fa-video',
          desc: 'Dashcam 4K + Full HD arrière · Intégration discrète atelier XPERIENCE VISION.',
          descLong: 'Dashcam double canal : caméra avant 4K UHD à capteur Sony Starvis, caméra arrière Full HD 1080p, mode nuit avancé. Intégration discrète derrière le rétroviseur avec alimentation sur faisceau d\'origine (mode stationnement 24/7). Carte microSD 128 GB fournie, accéléromètre de verrouillage vidéo en cas de choc. Pose atelier XPERIENCE VISION incluse. Compatible toute la gamme BMW. Garantie 2 ans.' }
    ],
    mercedes: [
        { id: 'MRC-001', name: 'Tapis 3D TPE logotés Mercedes', price: 189, modeles: ['all'], icon: 'fa-road',
          desc: 'Tapis 3D TPE avec étoile Mercedes · Rebords anti-projection.',
          descLong: 'Set complet de tapis thermoformés TPE haute densité avec étoile Mercedes gaufrée, moulés au gabarit exact de votre véhicule (Classe C, E, S, GLC, GLE, GLS). Rebords surélevés 30 mm, revers antidérapant sur ancrages d\'origine. Résistants aux UV et aux graisses. Lavables au jet. Garantie 3 ans.' },
        { id: 'MRC-002', name: 'Films PPF capot', price: 690, modeles: ['all'], icon: 'fa-shield-halved',
          desc: 'Film PPF 8 mil sur capot Mercedes · Protection totale transparente.',
          descLong: 'Film PPF 8 mil polyuréthane auto-cicatrisant sur le capot. Protection invisible contre éclats, UV et sève. Finition brillante qui ravive la peinture Mercedes. Pose atelier XPERIENCE VISION en 3 h. Garantie 5 ans anti-jaunissement. Compatible toute la gamme Mercedes.' },
        { id: 'MRC-003', name: 'Habillage console bois précieux', price: 449, modeles: ['Classe E', 'Classe S', 'GLE'], icon: 'fa-layer-group',
          desc: 'Bois précieux véritable vernis 8 couches · Classe E/S/GLE.',
          descLong: 'Habillage console en bois précieux véritable (noyer ou frêne au choix), poli puis vernis 8 couches main. Pose atelier XPERIENCE VISION par nos ébénistes partenaires, 8 h d\'atelier. Finition qui rivalise avec les plus belles options d\'usine Mercedes. Compatible Classe E, Classe S et GLE. Garantie 5 ans anti-fissuration.' },
        { id: 'MRC-004', name: 'Pédales aluminium AMG', price: 129, modeles: ['all'], icon: 'fa-shoe-prints',
          desc: 'Pédalier aluminium brossé signature AMG · Pose par clips.',
          descLong: 'Jeu de pédales sport signature AMG en aluminium brossé, picots caoutchouc antidérapants. Pose par clips sur les pédales d\'origine — aucun perçage. Ajoute une touche AMG immédiate au poste de conduite. Installation 15 min. Compatible toute la gamme Mercedes. Garantie 3 ans.' },
        { id: 'MRC-005', name: 'Seuils LED illuminés Mercedes', price: 229, modeles: ['all'], icon: 'fa-door-open',
          desc: 'Seuils inox étoile Mercedes rétroéclairée · Allumage automatique.',
          descLong: 'Set de 4 seuils en inox 304 brossé avec étoile Mercedes rétroéclairée LED blanc froid ou bleue (au choix). Allumage auto à l\'ouverture via faisceau courtoisie d\'origine. Protège les seuils et apporte une signature visuelle premium. Pose adhésive 3M VHB, 10 min. Garantie 3 ans.' },
        { id: 'MRC-006', name: 'Films teintés homologués', price: 349, modeles: ['all'], icon: 'fa-window-maximize',
          desc: 'Films céramiques homologués · 3 teintes · Pose atelier XPERIENCE VISION.',
          descLong: 'Films teintés céramique nanométrique pour vitres arrière + lunette, homologués route. 3 niveaux : 35 %, 20 % ou 5 %. Rejet chaleur jusqu\'à 70 %, UV 99 %. Pose atelier XPERIENCE VISION en salle climatisée. Garantie à vie contre décollement et jaunissement.' },
        { id: 'MRC-007', name: 'Coque clé cuir nappa', price: 89, modeles: ['all'], icon: 'fa-key',
          desc: 'Étui cuir nappa cousu main pour télécommande Mercedes · 3 coloris.',
          descLong: 'Étui en cuir nappa véritable cousu main point sellier, épousant parfaitement la télécommande Mercedes. Protège des chocs, se patine avec le temps. 3 coloris au choix (noir, cognac, bleu marine). Dragonne et anneau métallique. Garantie 2 ans.' },
        { id: 'MRC-008', name: 'Protection coffre sur-mesure SUV', price: 169, modeles: ['GLC', 'GLE', 'GLS'], icon: 'fa-box',
          desc: 'Bac coffre TPE sur-mesure pour SUV Mercedes · Rebords 40 mm.',
          descLong: 'Bac de coffre thermoformé TPE haute densité, moulé au gabarit exact des Mercedes GLC, GLE et GLS. Rebords surélevés 40 mm qui contiennent liquides et boue. Antidérapant, imperméable, résistant aux UV et aux graisses. Nettoyage jet d\'eau. Idéal pour familles actives, chasseurs, propriétaires d\'animaux. Garantie 3 ans.' },
        { id: 'MRC-009', name: 'Étoile éclairée calandre', price: 299, modeles: ['Classe E', 'Classe S', 'GLE', 'GLS'], icon: 'fa-star',
          desc: 'Étoile Mercedes calandre éclairée LED · Allumage avec le véhicule.',
          descLong: 'Étoile de calandre éclairée LED blanc froid qui s\'allume en même temps que les feux de position. Installation par nos techniciens XPERIENCE VISION avec pose d\'un faisceau dédié sécurisé (fusible intégré). Effet signature premium visible de loin de jour comme de nuit. Compatible Classe E, Classe S, GLE et GLS. Garantie 3 ans.' },
        { id: 'MRC-010', name: 'Habillage volant cuir/alcantara', price: 499, modeles: ['all'], icon: 'fa-circle-half-stroke',
          desc: 'Volant bi-matière cuir nappa + Alcantara · Cousu main.',
          descLong: 'Regainage complet du volant Mercedes en bi-matière cuir nappa (9h-3h) et Alcantara® (12h-6h), cousu main point sellier avec surpiqûres à votre convenance. Ergonomie améliorée, grip optimal, rendu AMG. Travail dépose / repose 6 h. Compatible toute la gamme Mercedes. Garantie 3 ans.' },
        { id: 'MRC-011', name: 'Pack ambient lighting upgrade', price: 590, modeles: ['Classe C', 'Classe E', 'Classe S'], icon: 'fa-lightbulb',
          desc: 'Éclairage d\'ambiance étendu Classe C/E/S · 64 couleurs + zones sup.',
          descLong: 'Kit d\'extension de l\'éclairage d\'ambiance Mercedes sur Classe C, E et S : ajoute des zones (bas de portes, tunnel console, seuils, passages de roue intérieurs) pilotables depuis le menu d\'origine. 64 couleurs, synchronisation avec la musique et les modes de conduite. Installation par nos techniciens XPERIENCE VISION (4 h). Intégration totale au système d\'origine. Garantie 3 ans.' },
        { id: 'MRC-012', name: 'Dashcam intégrée discrète', price: 499, modeles: ['all'], icon: 'fa-video',
          desc: 'Dashcam 4K + arrière Full HD · Intégration XPERIENCE VISION sur faisceau d\'origine.',
          descLong: 'Dashcam double canal intégrée discrètement derrière le rétroviseur : caméra avant 4K UHD Sony Starvis + caméra arrière Full HD, mode nuit avancé. Alimentation sur faisceau d\'origine avec fusible dédié pour le mode stationnement 24/7. MicroSD 128 GB fournie, enregistrement en boucle avec verrouillage en cas de choc. Pose atelier XPERIENCE VISION incluse. Compatible toute la gamme Mercedes. Garantie 2 ans.' }
    ],
    'range-rover': [
        { id: 'RR-001', name: 'Tapis cuir/TPE logotés', price: 229, modeles: ['all'], icon: 'fa-road',
          desc: 'Tapis bi-matière cuir + TPE sur-mesure Range Rover · Luxe et praticité.',
          descLong: 'Tapis de sol haut de gamme bi-matière : cuir véritable sur la partie visible (aspect luxe), TPE haute densité sur le pourtour et les rebords (praticité et résistance). Moulés au gabarit exact de votre Range Rover (Velar, Sport, Range Rover). Revers antidérapant et rebords anti-projection. Entretien simple au chiffon humide. Garantie 3 ans.' },
        { id: 'RR-002', name: 'Films PPF intégral', price: 2990, modeles: ['all'], icon: 'fa-shield',
          desc: 'PPF intégral 8 mil sur toute la carrosserie Range · Protection totale.',
          descLong: 'Protection PPF polyuréthane 8 mil intégrale full-body : capot, ailes, portes, pavillon, boucliers, bas de caisse, miroirs. Totalement transparent, auto-cicatrisant, protège contre éclats, rayures, sève et UV — votre Range reste en état concours. Finition brillante ou satinée (mate) au choix. Pose par nos installateurs XPERIENCE VISION, 2-3 jours d\'atelier. Garantie 7 ans. Compatible Velar, Sport et Range Rover.' },
        { id: 'RR-003', name: 'Habillage console bois noyer', price: 549, modeles: ['Velar', 'Sport', 'Range Rover'], icon: 'fa-layer-group',
          desc: 'Noyer véritable vernis 10 couches · Pose par nos ébénistes partenaires.',
          descLong: 'Habillage console et plaquages portes en noyer véritable, poli main puis vernis 10 couches pour une profondeur optique exceptionnelle. Pose atelier XPERIENCE VISION par ébénistes partenaires spécialisés luxe britannique (8 h). Finition digne des options bois d\'usine Range Rover. Compatible Velar, Sport et Range Rover. Garantie 5 ans anti-fissuration.' },
        { id: 'RR-004', name: 'Marche-pieds rétractables LED', price: 1290, modeles: ['Sport', 'Range Rover'], icon: 'fa-stairs',
          desc: 'Marche-pieds électriques LED Sport/Range · Se déploient à l\'ouverture.',
          descLong: 'Marche-pieds électriques rétractables qui se déploient automatiquement à l\'ouverture des portes et se rétractent à la fermeture. Aluminium extrudé antidérapant, LED intégrées blanc froid pour l\'éclairage au sol. Capacité 200 kg par pied. Installation par nos techniciens (1 jour atelier) avec programmation via le CAN bus du véhicule. Compatible Sport et Range Rover. Garantie 3 ans.' },
        { id: 'RR-005', name: 'Seuils LED illuminés', price: 249, modeles: ['all'], icon: 'fa-door-open',
          desc: 'Seuils inox brossé logo Range rétroéclairé · Sans câblage.',
          descLong: 'Set de 4 seuils en inox 304 brossé avec logo Range Rover rétroéclairé LED blanc froid. Allumage auto à l\'ouverture via le faisceau courtoisie d\'origine. Protège les seuils (très exposés sur SUV) et signe l\'habitacle premium britannique. Pose adhésive 3M VHB, 10 min. Garantie 3 ans.' },
        { id: 'RR-006', name: 'Films teintés homologués', price: 449, modeles: ['all'], icon: 'fa-window-maximize',
          desc: 'Films céramiques homologués · Grandes vitres · Pose atelier XPERIENCE VISION.',
          descLong: 'Films teintés céramique nanométrique pour vitres arrière + lunette (grandes surfaces Range), homologués route. 3 niveaux : 35 %, 20 % ou 5 %. Rejet chaleur jusqu\'à 70 %, UV 99 %, anti-éblouissement. Pose atelier XPERIENCE VISION en salle climatisée pour un rendu sans bulles. Garantie à vie contre décollement et jaunissement.' },
        { id: 'RR-007', name: 'Coque clé cuir cousu main', price: 99, modeles: ['all'], icon: 'fa-key',
          desc: 'Étui cuir cousu main pour télécommande Range · 3 coloris.',
          descLong: 'Étui en cuir véritable pleine fleur cousu main point sellier, épousant la télécommande Range Rover. Cuir sélectionné pour se patiner en beauté avec le temps. 3 coloris au choix (noir, cognac, bleu nuit). Dragonne amovible et anneau métallique en laiton. Garantie 2 ans.' },
        { id: 'RR-008', name: 'Protection coffre cuir', price: 199, modeles: ['all'], icon: 'fa-box',
          desc: 'Tapis coffre cuir synthétique premium Range · Grip et élégance.',
          descLong: 'Tapis de coffre en cuir synthétique haute qualité, découpé au gabarit exact du coffre Range Rover (Velar, Sport, Range Rover). Surface gaufrée antidérapante qui maintient les charges, protège la moquette d\'origine. Résistant à l\'eau, lavable au chiffon humide. Rendu SUV luxe cohérent avec l\'intérieur. Garantie 3 ans.' },
        { id: 'RR-009', name: 'Habillage volant cuir/alcantara', price: 549, modeles: ['all'], icon: 'fa-circle-half-stroke',
          desc: 'Volant bi-matière cuir + Alcantara · Cousu main par selliers.',
          descLong: 'Regainage complet du volant Range Rover en bi-matière cuir nappa (9h-3h) et Alcantara® italien (12h-6h), cousu main point sellier. Surpiqûres contrastées au choix. Ergonomie améliorée, grip optimal, rendu digne des finitions Autobiography. Travail dépose / repose incluse, 6 h d\'atelier. Garantie 3 ans.' },
        { id: 'RR-010', name: 'Dashcam intégrée premium', price: 549, modeles: ['all'], icon: 'fa-video',
          desc: 'Dashcam 4K + arrière Full HD · Mode stationnement 24/7 · Pose XPERIENCE VISION.',
          descLong: 'Dashcam double canal premium : caméra avant 4K UHD Sony Starvis + arrière Full HD, mode nuit avancé et grand-angle 170°. Intégration discrète derrière le rétroviseur avec alimentation sur faisceau d\'origine (mode stationnement 24/7 avec fusible dédié). Carte microSD 128 GB fournie, verrouillage vidéo automatique en cas de choc. Pose atelier XPERIENCE VISION incluse. Compatible toute la gamme Range. Garantie 2 ans.' }
    ]
};

const configState = { brand: null, model: '', categorie: '' };

// Mapping SEO des images produits (chargé une fois depuis data/product-images.json)
let PRODUCT_IMAGES = {};
(function loadProductImages() {
    fetch('data/product-images.json', { cache: 'force-cache' })
        .then(r => r.ok ? r.json() : {})
        .then(map => { PRODUCT_IMAGES = map || {}; })
        .catch(() => { /* fallback icône si indisponible */ });
})();

function configProductMedia(product) {
    const meta = PRODUCT_IMAGES[product.id] || (product.slug ? { slug: product.slug, alt: product.alt } : null);
    if (meta && meta.slug) {
        const alt = configEscapeHtml(meta.alt || product.name);
        return `<picture><source srcset="img/produits/${meta.slug}.webp" type="image/webp"><img src="img/produits/${meta.slug}.jpeg" alt="${alt}" loading="lazy" decoding="async" width="1200" height="900"></picture>`;
    }
    // Fallback icône Font Awesome si mapping indisponible
    return `<i class="fa-solid ${product.icon} cat-card-icon"></i>`;
}

function configGoToStep(n) {
    document.querySelectorAll('#configurateur .config-step').forEach(s => s.classList.add('hidden'));
    const target = document.querySelector(`#configurateur .config-step[data-step="${n}"]`);
    if (target) target.classList.remove('hidden');
    // Libère le 100vh strict quand on affiche les résultats (étape 3)
    const section = document.getElementById('configurateur');
    if (section) section.classList.toggle('config-showing-results', n === 4);
}

function configFmtPrice(n) {
    return n.toLocaleString('fr-FR') + ' €';
}

// Formate un prix en séparant partie entière / centimes, en n'affichant
// les centimes que s'ils ne sont pas nuls (129 € vs 19,90 €)
function configFmtPriceParts(n) {
    const num = Number(n) || 0;
    const hasCents = Math.round(num * 100) % 100 !== 0;
    const integerPart = Math.floor(num).toLocaleString('fr-FR');
    if (!hasCents) {
        return `${integerPart}<span class="cat-price-cents"> €</span>`;
    }
    const cents = Math.round(num * 100) % 100;
    return `${integerPart}<span class="cat-price-cents">,${String(cents).padStart(2, '0')} €</span>`;
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
    const categorie = configState.categorie;
    let filtered = model
        ? products.filter(p => p.modeles.includes('all') || p.modeles.includes(model))
        : products;
    if (categorie) filtered = filtered.filter(p => p.categorie === categorie);

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
        // Desc courte dans la card (fallback sur compatibilité si absente)
        const shortDesc = p.desc ? configEscapeHtml(p.desc) : configEscapeHtml(modelsLabel);
        // Desc longue pour la modale : descLong + compatibilité en complément
        const longParts = [];
        if (p.descLong) longParts.push(p.descLong);
        longParts.push(modelsLabel);
        const longDesc = configEscapeHtml(longParts.join(' · '));
        return `
            <article class="cat-card" data-description="${longDesc}">
                <div class="cat-card-media">
                    ${configProductMedia(p)}
                </div>
                <div class="cat-card-body">
                    <h4>${encodedName}</h4>
                    <p>${shortDesc}</p>
                    <div class="cat-card-bottom">
                        <span class="cat-price">${configFmtPriceParts(p.price)}</span>
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

function configSelectCategorie(categorie) {
    configState.categorie = (categorie === 'all') ? '' : categorie;
    const brandName = NOMS_MARQUES[configState.brand] || configState.brand;
    const nameEl = document.getElementById('config-results-name');
    if (nameEl) {
        const base = configState.model ? `${brandName} ${configState.model}` : `${brandName} (tous modèles)`;
        nameEl.textContent = configState.categorie ? `${base} · ${configState.categorie}` : base;
    }
    configRenderResults();
    configGoToStep(4);
}

function configSelectModel(model) {
    configState.model = (model === 'all') ? '' : model;
    configState.categorie = '';

    const brandName = NOMS_MARQUES[configState.brand] || configState.brand;
    const stepModelEl = document.getElementById('config-step-model');
    if (stepModelEl) {
        stepModelEl.textContent = configState.model
            ? `${brandName} ${configState.model}`
            : `${brandName} (tous modèles)`;
    }

    configGoToStep(3);
}

function preselectBrand(brand) {
    configSelectBrand(brand);
    document.getElementById('configurateur')?.scrollIntoView({ behavior: 'smooth' });
}

function initConfigurator() {
    // Boutons marques (étape 1)
    document.querySelectorAll('#configurateur .config-step[data-step="1"] .config-brand-btn[data-brand]').forEach(btn => {
        // Marques marquées "Bientôt disponible" : aucune action au clic (état réversible,
        // il suffit de retirer .config-brand-soon / disabled dans le HTML).
        if (btn.disabled || btn.classList.contains('config-brand-soon')) return;
        btn.addEventListener('click', () => configSelectBrand(btn.dataset.brand));
    });

    // Boutons catégorie (étape 3)
    document.querySelectorAll('#config-categories-grid [data-categorie]').forEach(btn => {
        if (btn.classList.contains('config-brand-soon')) return;
        btn.addEventListener('click', () => configSelectCategorie(btn.dataset.categorie));
    });

    // Boutons retour (étapes 2 et 3) — config-back-btn OU config-back-cta
    document.querySelectorAll('#configurateur [data-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            configGoToStep(parseInt(btn.dataset.target));
            document.getElementById('configurateur')?.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
    });

    // Logos marques (hero USP + marquee) → pré-sélection si dans le configurateur,
    // sinon (Nio, Zeekr, Leapmotor...) → scroll vers #installation
    document.querySelectorAll('.brand-logo-link[data-brand]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const b = link.dataset.brand;
            if (NOMS_MARQUES[b]) {
                preselectBrand(b);
            } else {
                document.getElementById('installation')?.scrollIntoView({ behavior: 'smooth' });
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