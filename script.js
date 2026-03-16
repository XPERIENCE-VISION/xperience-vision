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

// Petit popup de réassurance (optionnel mais efficace)
function showNotification() {
    const brands = ['Tesla Model 3', 'BMW X5', 'Mercedes Classe C', 'Range Rover Sport'];
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];

    const notification = document.createElement('div');
    notification.className = 'fixed bottom-8 left-8 card-glass p-4 rounded-2xl z-50 text-[10px] uppercase font-bold tracking-widest animate-bounce';
    notification.innerHTML = `<i class="fa-solid fa-circle-check text-green-500 mr-2"></i> Diagnostic confirmé : ${randomBrand}`;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Déclencher une fois après 10 secondes
setTimeout(showNotification, 10000);

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

document.getElementById('load-calendly').addEventListener('click', function () {
    const btn = this;
    const container = document.getElementById('calendly-container');
    const widget = document.getElementById('calendly-widget');

    // 1. Cacher le bouton et afficher le widget
    btn.classList.add('hidden');
    widget.classList.remove('hidden');

    // 2. Supprimer les classes de centrage du container pour que le calendrier soit bien aligné
    container.classList.remove('items-center', 'justify-center');

    // 3. Charger le script
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
        Calendly.initInlineWidget({
            url: 'https://calendly.com/xperience-vision77?hide_landing_page_details=1&text_color=424242&primary_color=000000',
            parentElement: widget,
            prefill: {},
            utm: {}
        });
    };
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
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Only apply on mobile devices
    if (window.innerWidth < 768) {
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            // Scroll down & past threshold -> hide header
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
            // Scroll up -> show header
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

    // Récupération des données
    const formData = {
        name: document.getElementById('form-name').value,
        email: document.getElementById('form-email').value,
        vehicle: document.getElementById('form-vehicle').value,
        subject: document.getElementById('form-subject').value,
        message: document.getElementById('form-message').value,
    };

    try {
        // Appel de la Netlify Function
        const response = await fetch('/.netlify/functions/sendEmail', {
            method: 'POST',
            body: JSON.stringify(formData)
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