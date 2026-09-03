/**
 * CATALOGUE ACCESSOIRES BYD — XPERIENCE VISION
 * Source unique : utilisé par le configurateur (navigateur) ET par la
 * validation de prix côté serveur (Node). Ne pas dupliquer ailleurs.
 *
 *  price      = euros TTC   (affichage front)
 *  priceCents = centimes    (Stripe, validation serveur)
 *  slug       = nom de fichier image dans img/produits/ (.webp + .jpeg)
 *
 * 245 produits.
 */
(function (root, factory) {
    var data = factory();
    if (typeof module !== 'undefined' && module.exports) { module.exports = data; }
    else { root.PRODUITS_BYD = data; }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
return [
 {
  "id": "ECP00041",
  "name": "Protection d'écran en verre trempé 12,8\"",
  "price": 32.9,
  "priceCents": 3290,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield-halved",
  "desc": "Film en verre trempé pour l'écran central 12,8\". Pose par adhésif instantané, conditionné en salle blanche.",
  "descLong": "Film en verre trempé pour l'écran central 12,8\". Pose par adhésif instantané, conditionné en salle blanche.",
  "slug": "ECP00041",
  "alt": "Protection d'écran en verre trempé 12,8\" — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00042",
  "name": "Protections d'écran verre trempé — navigation 12,8\" + combiné",
  "price": 25.9,
  "priceCents": 2590,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield-halved",
  "desc": "Jeu de deux films en verre trempé haute définition : un pour l'écran central 12,8\", un pour le combiné d'instruments.",
  "descLong": "Jeu de deux films en verre trempé haute définition : un pour l'écran central 12,8\", un pour le combiné d'instruments.",
  "slug": "ECP00042",
  "alt": "Protections d'écran verre trempé — navigation 12,8\" + combiné — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00043",
  "name": "Encadrement d'écran 12,8\"",
  "price": 21.9,
  "priceCents": 2190,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield-halved",
  "desc": "Cadre qui se pose sur le pourtour de l'écran central 12,8\" et en masque les bords.",
  "descLong": "Cadre qui se pose sur le pourtour de l'écran central 12,8\" et en masque les bords.",
  "slug": "ECP00043",
  "alt": "Encadrement d'écran 12,8\" — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00044",
  "name": "Joint de trappe de recharge",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Extérieur",
  "icon": "fa-bolt",
  "desc": "Anneau d'étanchéité pour le contour de la trappe de recharge.",
  "descLong": "Anneau d'étanchéité pour le contour de la trappe de recharge.",
  "slug": "ECP00044",
  "alt": "Joint de trappe de recharge — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00045",
  "name": "Protections anti-coups de pied de dossiers",
  "price": 36.9,
  "priceCents": 3690,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-couch",
  "desc": "Protections à fixer au dos des sièges avant, contre les traces de chaussures des passagers arrière.",
  "descLong": "Protections à fixer au dos des sièges avant, contre les traces de chaussures des passagers arrière.",
  "slug": "ECP00045",
  "alt": "Protections anti-coups de pied de dossiers — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00046",
  "name": "Pédales sport accélérateur + frein",
  "price": 36.9,
  "priceCents": 3690,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shoe-prints",
  "desc": "Couvre-pédales en aluminium brossé à inserts antidérapants. Pose sur les pédales d'origine.",
  "descLong": "Couvre-pédales en aluminium brossé à inserts antidérapants. Pose sur les pédales d'origine.",
  "slug": "ECP00046",
  "alt": "Pédales sport accélérateur + frein — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00047",
  "name": "Bavettes garde-boue (jeu de 4)",
  "price": 24.9,
  "priceCents": 2490,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Bavettes à poser derrière chaque roue. Limitent les projections de boue et de gravillons sur la carrosserie.",
  "descLong": "Bavettes à poser derrière chaque roue. Limitent les projections de boue et de gravillons sur la carrosserie.",
  "slug": "ECP00047",
  "alt": "Bavettes garde-boue (jeu de 4) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00048",
  "name": "Bac de rangement arrière d'écran central",
  "price": 23.9,
  "priceCents": 2390,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac qui se loge derrière l'écran central pour y ranger cartes, câbles et petits objets.",
  "descLong": "Bac qui se loge derrière l'écran central pour y ranger cartes, câbles et petits objets.",
  "slug": "ECP00048",
  "alt": "Bac de rangement arrière d'écran central — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00049",
  "name": "Tapis de charge à induction (2025)",
  "price": 24.9,
  "priceCents": 2490,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis silicone pour la zone de charge à induction. Antidérapant, découpé au format du logement.",
  "descLong": "Tapis silicone pour la zone de charge à induction. Antidérapant, découpé au format du logement.",
  "slug": "ECP00049",
  "alt": "Tapis de charge à induction (2025) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00050",
  "name": "Bac de rangement de console centrale — Smart Driving (2025)",
  "price": 24.9,
  "priceCents": 2490,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac compartimenté pour la console centrale, version Smart Driving 2025.",
  "descLong": "Bac compartimenté pour la console centrale, version Smart Driving 2025.",
  "slug": "ECP00050",
  "alt": "Bac de rangement de console centrale — Smart Driving (2025) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00051",
  "name": "Bac de rangement inférieur de console — Smart Driving (2025)",
  "price": 24.9,
  "priceCents": 2490,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac pour l'espace situé sous la console centrale, version Smart Driving 2025.",
  "descLong": "Bac pour l'espace situé sous la console centrale, version Smart Driving 2025.",
  "slug": "ECP00051",
  "alt": "Bac de rangement inférieur de console — Smart Driving (2025) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00052",
  "name": "Bac de rangement inférieur de console centrale",
  "price": 24.9,
  "priceCents": 2490,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac pour l'espace ouvert sous la console centrale.",
  "descLong": "Bac pour l'espace ouvert sous la console centrale.",
  "slug": "ECP00052",
  "alt": "Bac de rangement inférieur de console centrale — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00053",
  "name": "Insert porte-gobelets avant",
  "price": 24.9,
  "priceCents": 2490,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-car-side",
  "desc": "Insert à poser dans les porte-gobelets avant. Se retire pour le nettoyage.",
  "descLong": "Insert à poser dans les porte-gobelets avant. Se retire pour le nettoyage.",
  "slug": "ECP00053",
  "alt": "Insert porte-gobelets avant — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00054",
  "name": "Poubelle de porte-gobelet arrière",
  "price": 20.9,
  "priceCents": 2090,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-car-side",
  "desc": "Petite poubelle qui se loge dans le porte-gobelet arrière.",
  "descLong": "Petite poubelle qui se loge dans le porte-gobelet arrière.",
  "slug": "ECP00054",
  "alt": "Poubelle de porte-gobelet arrière — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00055",
  "name": "Bacs de rangement de portes (2023)",
  "price": 36.9,
  "priceCents": 3690,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bacs à insérer dans les vide-poches de portes, millésime 2023.",
  "descLong": "Bacs à insérer dans les vide-poches de portes, millésime 2023.",
  "slug": "ECP00055",
  "alt": "Bacs de rangement de portes (2023) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00056",
  "name": "Bac de coffre avant (frunk)",
  "price": 108.9,
  "priceCents": 10890,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement moulé pour le coffre avant.",
  "descLong": "Bac de rangement moulé pour le coffre avant.",
  "slug": "ECP00056",
  "alt": "Bac de coffre avant (frunk) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00057",
  "name": "Bac de coffre avant (frunk) — 2025",
  "price": 119.9,
  "priceCents": 11990,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement moulé pour le coffre avant, millésime 2025.",
  "descLong": "Bac de rangement moulé pour le coffre avant, millésime 2025.",
  "slug": "ECP00057",
  "alt": "Bac de coffre avant (frunk) — 2025 — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00058",
  "name": "Bac de rangement de coffre",
  "price": 108.9,
  "priceCents": 10890,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac moulé pour le coffre arrière.",
  "descLong": "Bac moulé pour le coffre arrière.",
  "slug": "ECP00058",
  "alt": "Bac de rangement de coffre — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00059",
  "name": "Bac de coffre — Glory Edition (2024)",
  "price": 119.9,
  "priceCents": 11990,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement moulé pour le coffre, finition Glory Edition 2024.",
  "descLong": "Bac de rangement moulé pour le coffre, finition Glory Edition 2024.",
  "slug": "ECP00059",
  "alt": "Bac de coffre — Glory Edition (2024) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00060",
  "name": "Bac de rangement de coffre",
  "price": 80.9,
  "priceCents": 8090,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac moulé pour le coffre arrière.",
  "descLong": "Bac moulé pour le coffre arrière.",
  "slug": "ECP00060",
  "alt": "Bac de rangement de coffre — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00061",
  "name": "Tapis de sol simple épaisseur (2023-2025)",
  "price": 77.9,
  "priceCents": 7790,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Jeu de tapis moulés, bords relevés, pour les millésimes 2023 à 2025.",
  "descLong": "Jeu de tapis moulés, bords relevés, pour les millésimes 2023 à 2025.",
  "slug": "ECP00061",
  "alt": "Tapis de sol simple épaisseur (2023-2025) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00062",
  "name": "Tapis de sol simple épaisseur (2021-2023)",
  "price": 79.9,
  "priceCents": 7990,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Jeu de 3 tapis moulés (2 avant + 1 arrière), bords relevés, pour les millésimes 2021 à 2023.",
  "descLong": "Jeu de 3 tapis moulés (2 avant + 1 arrière), bords relevés, pour les millésimes 2021 à 2023.",
  "slug": "ECP00062",
  "alt": "Tapis de sol simple épaisseur (2021-2023) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00063",
  "name": "Tapis de sol simple épaisseur — Glory Edition (2024-2025)",
  "price": 87.9,
  "priceCents": 8790,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Jeu de 3 tapis moulés, bords relevés, finition Glory Edition 2024-2025.",
  "descLong": "Jeu de 3 tapis moulés, bords relevés, finition Glory Edition 2024-2025.",
  "slug": "ECP00063",
  "alt": "Tapis de sol simple épaisseur — Glory Edition (2024-2025) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00064",
  "name": "Tapis de sol simple épaisseur — Intelligent Driving (2025)",
  "price": 90.9,
  "priceCents": 9090,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Jeu de 3 tapis moulés, bords relevés, version Intelligent Driving 2025.",
  "descLong": "Jeu de 3 tapis moulés, bords relevés, version Intelligent Driving 2025.",
  "slug": "ECP00064",
  "alt": "Tapis de sol simple épaisseur — Intelligent Driving (2025) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00067",
  "name": "Tapis de coffre (2024-2025)",
  "price": 36.9,
  "priceCents": 3690,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis de coffre moulé, bords relevés. Versions Glory Edition et Intelligent Driving.",
  "descLong": "Tapis de coffre moulé, bords relevés. Versions Glory Edition et Intelligent Driving.",
  "slug": "ECP00067",
  "alt": "Tapis de coffre (2024-2025) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00068",
  "name": "Bac organisateur de coffre",
  "price": 82.9,
  "priceCents": 8290,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac compartimenté pour organiser le chargement du coffre.",
  "descLong": "Bac compartimenté pour organiser le chargement du coffre.",
  "slug": "ECP00068",
  "alt": "Bac organisateur de coffre — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00069",
  "name": "Barres de toit",
  "price": 108.9,
  "priceCents": 10890,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Extérieur",
  "icon": "fa-car-side",
  "desc": "Jeu de barres transversales à fixer sur le toit.",
  "descLong": "Jeu de barres transversales à fixer sur le toit.",
  "slug": "ECP00069",
  "alt": "Barres de toit — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00071",
  "name": "Grille anti-insectes (2023)",
  "price": 39.9,
  "priceCents": 3990,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Grille à poser derrière la calandre pour arrêter insectes et débris. Millésime 2023.",
  "descLong": "Grille à poser derrière la calandre pour arrêter insectes et débris. Millésime 2023.",
  "slug": "ECP00071",
  "alt": "Grille anti-insectes (2023) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00072",
  "name": "Grille anti-insectes — Intelligent Driving (2025)",
  "price": 43.9,
  "priceCents": 4390,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Grille à poser derrière la calandre pour arrêter insectes et débris. Version Intelligent Driving 2025.",
  "descLong": "Grille à poser derrière la calandre pour arrêter insectes et débris. Version Intelligent Driving 2025.",
  "slug": "ECP00072",
  "alt": "Grille anti-insectes — Intelligent Driving (2025) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00077",
  "name": "Habillage de haut-parleurs de portes",
  "price": 28.9,
  "priceCents": 2890,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-gem",
  "desc": "Grilles décoratives à poser sur les haut-parleurs de portes. Conduite à gauche et à droite.",
  "descLong": "Grilles décoratives à poser sur les haut-parleurs de portes. Conduite à gauche et à droite.",
  "slug": "ECP00077",
  "alt": "Habillage de haut-parleurs de portes — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00078",
  "name": "Habillage d'aérateurs arrière",
  "price": 50.9,
  "priceCents": 5090,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-gem",
  "desc": "Enjoliveurs pour les aérateurs arrière. Conduite à gauche et à droite.",
  "descLong": "Enjoliveurs pour les aérateurs arrière. Conduite à gauche et à droite.",
  "slug": "ECP00078",
  "alt": "Habillage d'aérateurs arrière — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00079",
  "name": "Habillage d'aérateurs centraux",
  "price": 41.9,
  "priceCents": 4190,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-gem",
  "desc": "Enjoliveurs pour les aérateurs centraux. Conduite à gauche et à droite.",
  "descLong": "Enjoliveurs pour les aérateurs centraux. Conduite à gauche et à droite.",
  "slug": "ECP00079",
  "alt": "Habillage d'aérateurs centraux — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00083",
  "name": "Baguettes de protection de chant de porte",
  "price": 58.9,
  "priceCents": 5890,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Extérieur",
  "icon": "fa-gem",
  "desc": "Baguettes adhésives à poser sur le chant des portes. Conduite à gauche et à droite.",
  "descLong": "Baguettes adhésives à poser sur le chant des portes. Conduite à gauche et à droite.",
  "slug": "ECP00083",
  "alt": "Baguettes de protection de chant de porte — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00093",
  "name": "Habillage de lame de pare-chocs avant",
  "price": 50.9,
  "priceCents": 5090,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Bandes décoratives à poser sur la lame de pare-chocs avant.",
  "descLong": "Bandes décoratives à poser sur la lame de pare-chocs avant.",
  "slug": "ECP00093",
  "alt": "Habillage de lame de pare-chocs avant — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00102",
  "name": "Lame de pare-chocs avant DC (2021-2024)",
  "price": 160.9,
  "priceCents": 16090,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Lame de pare-chocs avant, kit DC, pour les millésimes 2021 à 2024.",
  "descLong": "Lame de pare-chocs avant, kit DC, pour les millésimes 2021 à 2024.",
  "slug": "ECP00102",
  "alt": "Lame de pare-chocs avant DC (2021-2024) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00103",
  "name": "Diffuseur de pare-chocs arrière DC (2021-2024)",
  "price": 160.9,
  "priceCents": 16090,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Diffuseur arrière, kit DC, pour les millésimes 2021 à 2024.",
  "descLong": "Diffuseur arrière, kit DC, pour les millésimes 2021 à 2024.",
  "slug": "ECP00103",
  "alt": "Diffuseur de pare-chocs arrière DC (2021-2024) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00104",
  "name": "Becquet de toit DC (2021-2024)",
  "price": 93.9,
  "priceCents": 9390,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Becquet de toit, kit DC, pour les millésimes 2021 à 2024.",
  "descLong": "Becquet de toit, kit DC, pour les millésimes 2021 à 2024.",
  "slug": "ECP00104",
  "alt": "Becquet de toit DC (2021-2024) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00105",
  "name": "Kit carrosserie DC complet",
  "price": 373.9,
  "priceCents": 37390,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Lame de pare-chocs avant, diffuseur arrière et becquet de toit réunis.",
  "descLong": "Lame de pare-chocs avant, diffuseur arrière et becquet de toit réunis.",
  "slug": "ECP00105",
  "alt": "Kit carrosserie DC complet — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00106",
  "name": "Déflecteurs de vitres (jeu)",
  "price": 36.9,
  "priceCents": 3690,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Déflecteurs à clipser sur le haut des vitres. Permettent d'entrouvrir par temps de pluie.",
  "descLong": "Déflecteurs à clipser sur le haut des vitres. Permettent d'entrouvrir par temps de pluie.",
  "slug": "ECP00106",
  "alt": "Déflecteurs de vitres (jeu) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00107",
  "name": "Feux de jour à défilement trois couleurs (2021-2023)",
  "price": 98.9,
  "priceCents": 9890,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Extérieur",
  "icon": "fa-lightbulb",
  "desc": "Bandeaux LED à défilement, trois couleurs, pour les millésimes 2021 à 2023.",
  "descLong": "Bandeaux LED à défilement, trois couleurs, pour les millésimes 2021 à 2023.",
  "slug": "ECP00107",
  "alt": "Feux de jour à défilement trois couleurs (2021-2023) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00108",
  "name": "Bandeau LED de pare-chocs arrière (2021-2023)",
  "price": 74.9,
  "priceCents": 7490,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Extérieur",
  "icon": "fa-lightbulb",
  "desc": "Bandeau lumineux à défilement pour le pare-chocs arrière, millésimes 2021 à 2023.",
  "descLong": "Bandeau lumineux à défilement pour le pare-chocs arrière, millésimes 2021 à 2023.",
  "slug": "ECP00108",
  "alt": "Bandeau LED de pare-chocs arrière (2021-2023) — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP00203",
  "name": "Bandeau LED de pare-chocs arrière",
  "price": 95.9,
  "priceCents": 9590,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-lightbulb",
  "desc": "Bandeau lumineux à défilement pour le pare-chocs arrière.",
  "descLong": "Bandeau lumineux à défilement pour le pare-chocs arrière.",
  "slug": "ECP00203",
  "alt": "Bandeau LED de pare-chocs arrière — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00204",
  "name": "Feux de jour à défilement trois couleurs (2023-2024)",
  "price": 147.9,
  "priceCents": 14790,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-lightbulb",
  "desc": "Bandeaux LED à défilement, trois couleurs au choix, pour les millésimes 2023 et 2024.",
  "descLong": "Bandeaux LED à défilement, trois couleurs au choix, pour les millésimes 2023 et 2024.",
  "slug": "ECP00204",
  "alt": "Feux de jour à défilement trois couleurs (2023-2024) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00205",
  "name": "Marchepieds latéraux",
  "price": 184.9,
  "priceCents": 18490,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shoe-prints",
  "desc": "Paire de marchepieds fixes à monter sous les bas de caisse.",
  "descLong": "Paire de marchepieds fixes à monter sous les bas de caisse.",
  "slug": "ECP00205",
  "alt": "Marchepieds latéraux — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00206",
  "name": "Marchepieds électriques déployables",
  "price": 825.9,
  "priceCents": 82590,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shoe-prints",
  "desc": "Marchepieds motorisés qui se déploient à l'ouverture des portes et se rétractent à la fermeture.",
  "descLong": "Marchepieds motorisés qui se déploient à l'ouverture des portes et se rétractent à la fermeture.",
  "slug": "ECP00206",
  "alt": "Marchepieds électriques déployables — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00207",
  "name": "Déflecteur de toit ouvrant",
  "price": 37.9,
  "priceCents": 3790,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Déflecteur à poser au-dessus du toit ouvrant.",
  "descLong": "Déflecteur à poser au-dessus du toit ouvrant.",
  "slug": "ECP00207",
  "alt": "Déflecteur de toit ouvrant — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00208",
  "name": "Becquet de hayon MC (2022)",
  "price": 96.9,
  "priceCents": 9690,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Becquet de hayon, kit MC, millésime 2022.",
  "descLong": "Becquet de hayon, kit MC, millésime 2022.",
  "slug": "ECP00208",
  "alt": "Becquet de hayon MC (2022) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00209",
  "name": "Bas de caisse MC (2022)",
  "price": 156.9,
  "priceCents": 15690,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Paire de bas de caisse, kit MC, millésime 2022.",
  "descLong": "Paire de bas de caisse, kit MC, millésime 2022.",
  "slug": "ECP00209",
  "alt": "Bas de caisse MC (2022) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00210",
  "name": "Diffuseur de pare-chocs arrière MC (2022)",
  "price": 143.9,
  "priceCents": 14390,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Diffuseur arrière, kit MC, millésime 2022.",
  "descLong": "Diffuseur arrière, kit MC, millésime 2022.",
  "slug": "ECP00210",
  "alt": "Diffuseur de pare-chocs arrière MC (2022) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00211",
  "name": "Lame de pare-chocs avant MC (2022)",
  "price": 143.9,
  "priceCents": 14390,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Lame de pare-chocs avant, kit MC, millésime 2022.",
  "descLong": "Lame de pare-chocs avant, kit MC, millésime 2022.",
  "slug": "ECP00211",
  "alt": "Lame de pare-chocs avant MC (2022) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00212",
  "name": "Kit carrosserie MC complet (2022)",
  "price": 143.9,
  "priceCents": 14390,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Lame de pare-chocs avant, bas de caisse, diffuseur arrière et becquet réunis.",
  "descLong": "Lame de pare-chocs avant, bas de caisse, diffuseur arrière et becquet réunis.",
  "slug": "ECP00212",
  "alt": "Kit carrosserie MC complet (2022) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00238",
  "name": "Grille anti-insectes — Intelligent Driving",
  "price": 41.9,
  "priceCents": 4190,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Grille à poser derrière la calandre pour arrêter insectes et débris. Version Intelligent Driving.",
  "descLong": "Grille à poser derrière la calandre pour arrêter insectes et débris. Version Intelligent Driving.",
  "slug": "ECP00238",
  "alt": "Grille anti-insectes — Intelligent Driving — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00239",
  "name": "Grille anti-insectes",
  "price": 41.9,
  "priceCents": 4190,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Grille à poser derrière la calandre pour arrêter insectes et débris.",
  "descLong": "Grille à poser derrière la calandre pour arrêter insectes et débris.",
  "slug": "ECP00239",
  "alt": "Grille anti-insectes — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00240",
  "name": "Barres de toit",
  "price": 96.9,
  "priceCents": 9690,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-car-side",
  "desc": "Jeu de barres transversales à fixer sur le toit.",
  "descLong": "Jeu de barres transversales à fixer sur le toit.",
  "slug": "ECP00240",
  "alt": "Barres de toit — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00242",
  "name": "Protections de dossiers de sièges TPE (2022-2025)",
  "price": 44.9,
  "priceCents": 4490,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-couch",
  "desc": "Jeu de deux protections moulées à fixer au dos des sièges avant.",
  "descLong": "Jeu de deux protections moulées à fixer au dos des sièges avant.",
  "slug": "ECP00242",
  "alt": "Protections de dossiers de sièges TPE (2022-2025) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00246",
  "name": "Tapis de sol double épaisseur « Wear King » — banquette sans tiroir",
  "price": 115.9,
  "priceCents": 11590,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis TPE moulés doublés d'un surtapis moquette. Version banquette arrière sans tiroir.",
  "descLong": "Tapis TPE moulés doublés d'un surtapis moquette. Version banquette arrière sans tiroir.",
  "slug": "ECP00246",
  "alt": "Tapis de sol double épaisseur « Wear King » — banquette sans tiroir — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00247",
  "name": "Tapis de sol simple épaisseur — Intelligent Driving, banquette avec tiroir",
  "price": 92.9,
  "priceCents": 9290,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Jeu de 3 tapis moulés, bords relevés. Version Intelligent Driving à banquette avec tiroir.",
  "descLong": "Jeu de 3 tapis moulés, bords relevés. Version Intelligent Driving à banquette avec tiroir.",
  "slug": "ECP00247",
  "alt": "Tapis de sol simple épaisseur — Intelligent Driving, banquette avec tiroir — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00248",
  "name": "Tapis de sol simple épaisseur — banquette sans tiroir",
  "price": 87.9,
  "priceCents": 8790,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Jeu de 3 tapis moulés, bords relevés. Version banquette arrière sans tiroir.",
  "descLong": "Jeu de 3 tapis moulés, bords relevés. Version banquette arrière sans tiroir.",
  "slug": "ECP00248",
  "alt": "Tapis de sol simple épaisseur — banquette sans tiroir — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00249",
  "name": "Bac de coffre",
  "price": 79.9,
  "priceCents": 7990,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac moulé pour le coffre, compartimenté, bords relevés.",
  "descLong": "Bac moulé pour le coffre, compartimenté, bords relevés.",
  "slug": "ECP00249",
  "alt": "Bac de coffre — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00250",
  "name": "Bac de coffre avant (frunk) compartimenté",
  "price": 101.9,
  "priceCents": 10190,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement moulé pour le coffre avant, avec séparations.",
  "descLong": "Bac de rangement moulé pour le coffre avant, avec séparations.",
  "slug": "ECP00250",
  "alt": "Bac de coffre avant (frunk) compartimenté — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00251",
  "name": "Bac de coffre avant (frunk)",
  "price": 96.9,
  "priceCents": 9690,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement moulé pour le coffre avant.",
  "descLong": "Bac de rangement moulé pour le coffre avant.",
  "slug": "ECP00251",
  "alt": "Bac de coffre avant (frunk) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00252",
  "name": "Bacs de rangement de portes (2025)",
  "price": 24.9,
  "priceCents": 2490,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Jeu de bacs à insérer dans les vide-poches de portes, millésime 2025.",
  "descLong": "Jeu de bacs à insérer dans les vide-poches de portes, millésime 2025.",
  "slug": "ECP00252",
  "alt": "Bacs de rangement de portes (2025) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00253",
  "name": "Bacs de vide-poches de portes (jeu de 4, 2025)",
  "price": 26.9,
  "priceCents": 2690,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Quatre bacs à insérer dans les vide-poches de portes, millésime 2025.",
  "descLong": "Quatre bacs à insérer dans les vide-poches de portes, millésime 2025.",
  "slug": "ECP00253",
  "alt": "Bacs de vide-poches de portes (jeu de 4, 2025) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00254",
  "name": "Bac de rangement inférieur de console centrale (2025)",
  "price": 25.9,
  "priceCents": 2590,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac pour l'espace ouvert sous la console centrale, millésime 2025.",
  "descLong": "Bac pour l'espace ouvert sous la console centrale, millésime 2025.",
  "slug": "ECP00254",
  "alt": "Bac de rangement inférieur de console centrale (2025) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00255",
  "name": "Bac de rangement inférieur de console centrale (2022)",
  "price": 20.9,
  "priceCents": 2090,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac pour l'espace ouvert sous la console centrale, millésime 2022.",
  "descLong": "Bac pour l'espace ouvert sous la console centrale, millésime 2022.",
  "slug": "ECP00255",
  "alt": "Bac de rangement inférieur de console centrale (2022) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00256",
  "name": "Bac de rangement de console centrale (2025)",
  "price": 23.9,
  "priceCents": 2390,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac compartimenté pour la console centrale, millésime 2025.",
  "descLong": "Bac compartimenté pour la console centrale, millésime 2025.",
  "slug": "ECP00256",
  "alt": "Bac de rangement de console centrale (2025) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00257",
  "name": "Bac de rangement de console centrale (2022)",
  "price": 21.9,
  "priceCents": 2190,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac compartimenté pour la console centrale, millésime 2022.",
  "descLong": "Bac compartimenté pour la console centrale, millésime 2022.",
  "slug": "ECP00257",
  "alt": "Bac de rangement de console centrale (2022) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00258",
  "name": "Insert porte-gobelets de console centrale (2025)",
  "price": 27.9,
  "priceCents": 2790,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-car-side",
  "desc": "Insert à poser dans les porte-gobelets, avec bac de rangement attenant. Millésime 2025.",
  "descLong": "Insert à poser dans les porte-gobelets, avec bac de rangement attenant. Millésime 2025.",
  "slug": "ECP00258",
  "alt": "Insert porte-gobelets de console centrale (2025) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00259",
  "name": "Tapis de charge à induction (2025)",
  "price": 21.9,
  "priceCents": 2190,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis silicone pour la zone de charge à induction. Antidérapant, découpé au format du logement.",
  "descLong": "Tapis silicone pour la zone de charge à induction. Antidérapant, découpé au format du logement.",
  "slug": "ECP00259",
  "alt": "Tapis de charge à induction (2025) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00260",
  "name": "Bac de rangement arrière d'écran central (2025)",
  "price": 29.9,
  "priceCents": 2990,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac qui se loge derrière l'écran central, millésime 2025.",
  "descLong": "Bac qui se loge derrière l'écran central, millésime 2025.",
  "slug": "ECP00260",
  "alt": "Bac de rangement arrière d'écran central (2025) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00261",
  "name": "Bac de rangement arrière d'écran central (2022)",
  "price": 26.9,
  "priceCents": 2690,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac qui se loge derrière l'écran central, millésime 2022.",
  "descLong": "Bac qui se loge derrière l'écran central, millésime 2022.",
  "slug": "ECP00261",
  "alt": "Bac de rangement arrière d'écran central (2022) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00263",
  "name": "Housse d'accoudoir de console en silicone",
  "price": 33.9,
  "priceCents": 3390,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-couch",
  "desc": "Housse silicone à enfiler sur l'accoudoir de console centrale. Logo BYD moulé.",
  "descLong": "Housse silicone à enfiler sur l'accoudoir de console centrale. Logo BYD moulé.",
  "slug": "ECP00263",
  "alt": "Housse d'accoudoir de console en silicone — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00264",
  "name": "Housse de levier de vitesses en silicone",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-couch",
  "desc": "Housse silicone à enfiler sur le levier de vitesses. Logo BYD moulé.",
  "descLong": "Housse silicone à enfiler sur le levier de vitesses. Logo BYD moulé.",
  "slug": "ECP00264",
  "alt": "Housse de levier de vitesses en silicone — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00266",
  "name": "Bavettes garde-boue (jeu de 4)",
  "price": 25.9,
  "priceCents": 2590,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Bavettes à poser derrière chaque roue. Limitent les projections de boue et de gravillons.",
  "descLong": "Bavettes à poser derrière chaque roue. Limitent les projections de boue et de gravillons.",
  "slug": "ECP00266",
  "alt": "Bavettes garde-boue (jeu de 4) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00267",
  "name": "Pédales sport accélérateur + frein",
  "price": 34.9,
  "priceCents": 3490,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shoe-prints",
  "desc": "Couvre-pédales en aluminium brossé à inserts antidérapants. Pose sur les pédales d'origine.",
  "descLong": "Couvre-pédales en aluminium brossé à inserts antidérapants. Pose sur les pédales d'origine.",
  "slug": "ECP00267",
  "alt": "Pédales sport accélérateur + frein — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00268",
  "name": "Tapis silicone de console centrale",
  "price": 19.9,
  "priceCents": 1990,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis silicone découpé au format de la console centrale. Antidérapant, se retire pour le nettoyage.",
  "descLong": "Tapis silicone découpé au format de la console centrale. Antidérapant, se retire pour le nettoyage.",
  "slug": "ECP00268",
  "alt": "Tapis silicone de console centrale — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00269",
  "name": "Encadrement d'écran 15,6\"",
  "price": 26.9,
  "priceCents": 2690,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield-halved",
  "desc": "Cadre qui se pose sur le pourtour de l'écran central 15,6\" et en masque les bords.",
  "descLong": "Cadre qui se pose sur le pourtour de l'écran central 15,6\" et en masque les bords.",
  "slug": "ECP00269",
  "alt": "Encadrement d'écran 15,6\" — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00270",
  "name": "Protections d'écran verre trempé — navigation 15,6\" + combiné",
  "price": 25.9,
  "priceCents": 2590,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield-halved",
  "desc": "Jeu de deux films en verre trempé haute définition : un pour l'écran central 15,6\", un pour le combiné.",
  "descLong": "Jeu de deux films en verre trempé haute définition : un pour l'écran central 15,6\", un pour le combiné.",
  "slug": "ECP00270",
  "alt": "Protections d'écran verre trempé — navigation 15,6\" + combiné — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00280",
  "name": "Panneaux de protection de portes",
  "price": 101.9,
  "priceCents": 10190,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield",
  "desc": "Revêtements de protection pour les panneaux de portes. Protègent des frottements et habillent l'intérieur.",
  "descLong": "Revêtements de protection pour les panneaux de portes. Protègent des frottements et habillent l'intérieur.",
  "slug": "ECP00280",
  "alt": "Panneaux de protection de portes — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00286",
  "name": "Grille de protection inférieure de calandre (2024)",
  "price": 53.9,
  "priceCents": 5390,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Grille de protection pour la prise d'air inférieure. Filtre les insectes et les gravillons. Chevauchement possible avec ECP00288 (la photo fournisseur porte la même mention « insect proof net » millésime 2024) — faire préciser la différence.",
  "descLong": "Grille de protection pour la prise d'air inférieure. Filtre les insectes et les gravillons. Chevauchement possible avec ECP00288 (la photo fournisseur porte la même mention « insect proof net » millésime 2024) — faire préciser la différence.",
  "slug": "ECP00286",
  "alt": "Grille de protection inférieure de calandre (2024) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00287",
  "name": "Grille anti-insectes (2025) (2025)",
  "price": 40.9,
  "priceCents": 4090,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Grille de protection à poser derrière la calandre. Empêche insectes et débris d'atteindre les radiateurs. Millésime 2025.",
  "descLong": "Grille de protection à poser derrière la calandre. Empêche insectes et débris d'atteindre les radiateurs. Millésime 2025.",
  "slug": "ECP00287",
  "alt": "Grille anti-insectes (2025) (2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00288",
  "name": "Grille anti-insectes noir brillant (2024) (2024)",
  "price": 55.9,
  "priceCents": 5590,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Grille de protection à poser derrière la calandre. Empêche insectes et débris d'atteindre les radiateurs. Millésime 2024.",
  "descLong": "Grille de protection à poser derrière la calandre. Empêche insectes et débris d'atteindre les radiateurs. Millésime 2024.",
  "slug": "ECP00288",
  "alt": "Grille anti-insectes noir brillant (2024) (2024) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00289",
  "name": "Tablette séparatrice de coffre",
  "price": 63.9,
  "priceCents": 6390,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-tablet-screen-button",
  "desc": "Cache-bagages / tablette de séparation du coffre. Dissimule le contenu et sépare l'espace de chargement.",
  "descLong": "Cache-bagages / tablette de séparation du coffre. Dissimule le contenu et sépare l'espace de chargement.",
  "slug": "ECP00289",
  "alt": "Tablette séparatrice de coffre — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00290",
  "name": "Protections de dossiers de sièges TPE (jeu de 2) (2024-2025)",
  "price": 39.9,
  "priceCents": 3990,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-couch",
  "desc": "Protections TPE pour l'arrière des dossiers avant. Résistent aux coups de pied des passagers arrière, se nettoient d'un coup d'éponge.",
  "descLong": "Protections TPE pour l'arrière des dossiers avant. Résistent aux coups de pied des passagers arrière, se nettoient d'un coup d'éponge.",
  "slug": "ECP00290",
  "alt": "Protections de dossiers de sièges TPE (jeu de 2) (2024-2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00291",
  "name": "Tapis de coffre TPE (2024-2025) (2024-2025)",
  "price": 38.9,
  "priceCents": 3890,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis de coffre TPE moulé, bords relevés étanches. Protège la moquette d'origine des liquides et des salissures.",
  "descLong": "Tapis de coffre TPE moulé, bords relevés étanches. Protège la moquette d'origine des liquides et des salissures.",
  "slug": "ECP00291",
  "alt": "Tapis de coffre TPE (2024-2025) (2024-2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00292",
  "name": "Tapis de sol TPE double épaisseur « Tough King » (2025) (2025)",
  "price": 117.9,
  "priceCents": 11790,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Jeu de tapis TPE double épaisseur, avec surtapis amovible. Isolation phonique renforcée, bords hauts, lavables. Vérifier qu'il s'agit bien de la version conduite à gauche.",
  "descLong": "Jeu de tapis TPE double épaisseur, avec surtapis amovible. Isolation phonique renforcée, bords hauts, lavables. Vérifier qu'il s'agit bien de la version conduite à gauche.",
  "slug": "ECP00292",
  "alt": "Tapis de sol TPE double épaisseur « Tough King » (2025) (2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00293",
  "name": "Tapis de sol TPE simple épaisseur (2025) — conduite à gauche (2025)",
  "price": 91.9,
  "priceCents": 9190,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Jeu de 3 tapis TPE moulés (2 avant + 1 arrière). Bords relevés qui retiennent l'eau et la boue, matière inodore, résistante à l'usure et lavable à grande eau. Version conduite à gauche confirmée sur la photo — c'est celle-ci qu'il faut vendre en France.",
  "descLong": "Jeu de 3 tapis TPE moulés (2 avant + 1 arrière). Bords relevés qui retiennent l'eau et la boue, matière inodore, résistante à l'usure et lavable à grande eau. Version conduite à gauche confirmée sur la photo — c'est celle-ci qu'il faut vendre en France.",
  "slug": "ECP00293",
  "alt": "Tapis de sol TPE simple épaisseur (2025) — conduite à gauche (2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00294",
  "name": "Bac organisateur de coffre",
  "price": 92.9,
  "priceCents": 9290,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Grand bac organisateur pour le coffre, avec compartiments. Se retire d'un bloc.",
  "descLong": "Grand bac organisateur pour le coffre, avec compartiments. Se retire d'un bloc.",
  "slug": "ECP00294",
  "alt": "Bac organisateur de coffre — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00295",
  "name": "Bac de rangement de coffre avant (frunk)",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac moulé pour le coffre avant. Organise l'espace et facilite le rangement des câbles de recharge.",
  "descLong": "Bac moulé pour le coffre avant. Organise l'espace et facilite le rangement des câbles de recharge.",
  "slug": "ECP00295",
  "alt": "Bac de rangement de coffre avant (frunk) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00296",
  "name": "Bac de rangement sous-siège (2024) (2024)",
  "price": 24.9,
  "priceCents": 2490,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Tiroir de rangement se glissant sous le siège. Récupère un volume habituellement perdu.",
  "descLong": "Tiroir de rangement se glissant sous le siège. Récupère un volume habituellement perdu.",
  "slug": "ECP00296",
  "alt": "Bac de rangement sous-siège (2024) (2024) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00297",
  "name": "Bac de rangement d'accoudoir (2024) (2024)",
  "price": 24.9,
  "priceCents": 2490,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement supplémentaire pour l'accoudoir central. Doublon possible avec ECP00303 (même millésime, même zone) — faire confirmer la différence par le fournisseur avant mise en ligne.",
  "descLong": "Bac de rangement supplémentaire pour l'accoudoir central. Doublon possible avec ECP00303 (même millésime, même zone) — faire confirmer la différence par le fournisseur avant mise en ligne.",
  "slug": "ECP00297",
  "alt": "Bac de rangement d'accoudoir (2024) (2024) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00298",
  "name": "Bacs de rangement de portes (2025) (2025)",
  "price": 25.9,
  "priceCents": 2590,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Jeu de bacs pour les vide-poches de portes avant et arrière, spécifique au millésime 2025.",
  "descLong": "Jeu de bacs pour les vide-poches de portes avant et arrière, spécifique au millésime 2025.",
  "slug": "ECP00298",
  "alt": "Bacs de rangement de portes (2025) (2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00299",
  "name": "Bacs de rangement de portes (2024) (2024)",
  "price": 27.9,
  "priceCents": 2790,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Jeu de bacs pour les vide-poches de portes avant et arrière. Compartimentent l'espace et évitent le bruit des objets.",
  "descLong": "Jeu de bacs pour les vide-poches de portes avant et arrière. Compartimentent l'espace et évitent le bruit des objets.",
  "slug": "ECP00299",
  "alt": "Bacs de rangement de portes (2024) (2024) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00300",
  "name": "Bac de rangement de console centrale (2025) (2025)",
  "price": 25.9,
  "priceCents": 2590,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement pour l'espace ouvert de la console centrale, spécifique au millésime 2025.",
  "descLong": "Bac de rangement pour l'espace ouvert de la console centrale, spécifique au millésime 2025.",
  "slug": "ECP00300",
  "alt": "Bac de rangement de console centrale (2025) (2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00301",
  "name": "Bac de rangement de console centrale (2024) (2024)",
  "price": 24.9,
  "priceCents": 2490,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement pour l'espace ouvert de la console centrale. Se retire pour le nettoyage.",
  "descLong": "Bac de rangement pour l'espace ouvert de la console centrale. Se retire pour le nettoyage.",
  "slug": "ECP00301",
  "alt": "Bac de rangement de console centrale (2024) (2024) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00302",
  "name": "Bac de rangement d'accoudoir central (2025) (2025)",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac amovible qui s'emboîte dans l'accoudoir central, découpe spécifique au millésime 2025.",
  "descLong": "Bac amovible qui s'emboîte dans l'accoudoir central, découpe spécifique au millésime 2025.",
  "slug": "ECP00302",
  "alt": "Bac de rangement d'accoudoir central (2025) (2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00303",
  "name": "Bac de rangement d'accoudoir central (2024) (2024)",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac amovible qui s'emboîte dans l'accoudoir central et organise l'espace en deux niveaux.",
  "descLong": "Bac amovible qui s'emboîte dans l'accoudoir central et organise l'espace en deux niveaux.",
  "slug": "ECP00303",
  "alt": "Bac de rangement d'accoudoir central (2024) (2024) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00304",
  "name": "Insert porte-gobelets de console centrale (2025) (2025)",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-car-side",
  "desc": "Insert de rangement pour les porte-gobelets de la console centrale, spécifique au millésime 2025.",
  "descLong": "Insert de rangement pour les porte-gobelets de la console centrale, spécifique au millésime 2025.",
  "slug": "ECP00304",
  "alt": "Insert porte-gobelets de console centrale (2025) (2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00305",
  "name": "Insert porte-gobelets de console centrale (2024) (2024)",
  "price": 23.9,
  "priceCents": 2390,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-car-side",
  "desc": "Insert de rangement pour les porte-gobelets de la console centrale. Évite que les petits objets tombent au fond.",
  "descLong": "Insert de rangement pour les porte-gobelets de la console centrale. Évite que les petits objets tombent au fond.",
  "slug": "ECP00305",
  "alt": "Insert porte-gobelets de console centrale (2024) (2024) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00306",
  "name": "Tapis de charge à induction (2025) (2025)",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis silicone antidérapant pour la zone de charge sans fil, découpe spécifique au millésime 2025.",
  "descLong": "Tapis silicone antidérapant pour la zone de charge sans fil, découpe spécifique au millésime 2025.",
  "slug": "ECP00306",
  "alt": "Tapis de charge à induction (2025) (2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00307",
  "name": "Tapis de charge à induction (2024) (2024)",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis silicone antidérapant pour la zone de charge sans fil. Maintient le téléphone en place et protège la surface.",
  "descLong": "Tapis silicone antidérapant pour la zone de charge sans fil. Maintient le téléphone en place et protège la surface.",
  "slug": "ECP00307",
  "alt": "Tapis de charge à induction (2024) (2024) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00308",
  "name": "Bac de rangement arrière d'écran central (2024-2025)",
  "price": 26.9,
  "priceCents": 2690,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement qui se loge derrière l'écran central. Récupère un espace inutilisé pour les petits objets.",
  "descLong": "Bac de rangement qui se loge derrière l'écran central. Récupère un espace inutilisé pour les petits objets.",
  "slug": "ECP00308",
  "alt": "Bac de rangement arrière d'écran central (2024-2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00309",
  "name": "Protections de passages de roues",
  "price": 25.9,
  "priceCents": 2590,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Doublures de passage de roue. Protègent la carrosserie des projections et réduisent le bruit de roulement.",
  "descLong": "Doublures de passage de roue. Protègent la carrosserie des projections et réduisent le bruit de roulement.",
  "slug": "ECP00309",
  "alt": "Protections de passages de roues — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00310",
  "name": "Bavettes garde-boue (jeu de 4)",
  "price": 25.9,
  "priceCents": 2590,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Bavettes avant et arrière moulées au modèle. Limitent les projections de boue et de gravillons sur les bas de caisse.",
  "descLong": "Bavettes avant et arrière moulées au modèle. Limitent les projections de boue et de gravillons sur les bas de caisse.",
  "slug": "ECP00310",
  "alt": "Bavettes garde-boue (jeu de 4) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00311",
  "name": "Pédales sport accélérateur + frein — finition argent laser",
  "price": 37.9,
  "priceCents": 3790,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shoe-prints",
  "desc": "Jeu de 2 pédales à recouvrement, finition argent laser et inserts caoutchouc antidérapants. Fixation par clips.",
  "descLong": "Jeu de 2 pédales à recouvrement, finition argent laser et inserts caoutchouc antidérapants. Fixation par clips.",
  "slug": "ECP00311",
  "alt": "Pédales sport accélérateur + frein — finition argent laser — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00312",
  "name": "Pédales sport accélérateur + frein",
  "price": 35.9,
  "priceCents": 3590,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shoe-prints",
  "desc": "Jeu de 2 pédales à recouvrement, finition aluminium et inserts antidérapants. Fixation par clips, aucun perçage.",
  "descLong": "Jeu de 2 pédales à recouvrement, finition aluminium et inserts antidérapants. Fixation par clips, aucun perçage.",
  "slug": "ECP00312",
  "alt": "Pédales sport accélérateur + frein — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00313",
  "name": "Tapis silicone de console centrale",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis antidérapant en silicone souple pour la console centrale. Protège des rayures et évite que les objets glissent.",
  "descLong": "Tapis antidérapant en silicone souple pour la console centrale. Protège des rayures et évite que les objets glissent.",
  "slug": "ECP00313",
  "alt": "Tapis silicone de console centrale — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00314",
  "name": "Encadrement d'écran 15,6\" (jeu)",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield-halved",
  "desc": "Contour décoratif pour l'écran central. Habille la jonction entre l'écran et la planche de bord. Pose clipsée.",
  "descLong": "Contour décoratif pour l'écran central. Habille la jonction entre l'écran et la planche de bord. Pose clipsée.",
  "slug": "ECP00314",
  "alt": "Encadrement d'écran 15,6\" (jeu) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00315",
  "name": "Protections d'écran verre trempé — écran 15,6\" + instrumentation",
  "price": 27.9,
  "priceCents": 2790,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield-halved",
  "desc": "Jeu de protections en verre trempé haute définition pour l'écran central 15,6\" et le combiné d'instrumentation. Anti-rayures, traitement anti- traces, découpe exacte.",
  "descLong": "Jeu de protections en verre trempé haute définition pour l'écran central 15,6\" et le combiné d'instrumentation. Anti-rayures, traitement anti- traces, découpe exacte.",
  "slug": "ECP00315",
  "alt": "Protections d'écran verre trempé — écran 15,6\" + instrumentation — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00317",
  "name": "Becquet arrière DC — noir brillant (2024-2025)",
  "price": 97.9,
  "priceCents": 9790,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Becquet de hayon finition noir brillant. Montage adhésif 3M, sans perçage.",
  "descLong": "Becquet de hayon finition noir brillant. Montage adhésif 3M, sans perçage.",
  "slug": "ECP00317",
  "alt": "Becquet arrière DC — noir brillant (2024-2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00318",
  "name": "Diffuseur de pare-chocs arrière DC — noir brillant (2024-2025)",
  "price": 146.9,
  "priceCents": 14690,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Diffuseur arrière finition noir brillant. Se pose sur le pare-chocs d'origine, montage adhésif.",
  "descLong": "Diffuseur arrière finition noir brillant. Se pose sur le pare-chocs d'origine, montage adhésif.",
  "slug": "ECP00318",
  "alt": "Diffuseur de pare-chocs arrière DC — noir brillant (2024-2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00319",
  "name": "Lame de pare-chocs avant DC — noir brillant (2025) (2025)",
  "price": 126.9,
  "priceCents": 12690,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Lame de pare-chocs avant finition noir brillant, spécifique au millésime 2025. Montage adhésif, aucune découpe nécessaire.",
  "descLong": "Lame de pare-chocs avant finition noir brillant, spécifique au millésime 2025. Montage adhésif, aucune découpe nécessaire.",
  "slug": "ECP00319",
  "alt": "Lame de pare-chocs avant DC — noir brillant (2025) (2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00320",
  "name": "Lame de pare-chocs avant DC — noir brillant (2024) (2024)",
  "price": 126.9,
  "priceCents": 12690,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Lame de pare-chocs avant finition noir brillant, spécifique au millésime 2024. Montage adhésif, aucune découpe nécessaire.",
  "descLong": "Lame de pare-chocs avant finition noir brillant, spécifique au millésime 2024. Montage adhésif, aucune découpe nécessaire.",
  "slug": "ECP00320",
  "alt": "Lame de pare-chocs avant DC — noir brillant (2024) (2024) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00321",
  "name": "Kit carrosserie DC complet — pare- chocs avant + arrière + becquet (2024-2025)",
  "price": 297.9,
  "priceCents": 29790,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Kit esthétique complet en finition noir brillant : lame de pare-chocs avant, diffuseur arrière et becquet de toit. Change nettement l'allure du véhicule. Montage adhésif renforcé. Produit le plus cher du catalogue — c'est le seul, avec ECP00318, à dépasser le seuil de 50 USD.",
  "descLong": "Kit esthétique complet en finition noir brillant : lame de pare-chocs avant, diffuseur arrière et becquet de toit. Change nettement l'allure du véhicule. Montage adhésif renforcé. Produit le plus cher du catalogue — c'est le seul, avec ECP00318, à dépasser le seuil de 50 USD.",
  "slug": "ECP00321",
  "alt": "Kit carrosserie DC complet — pare- chocs avant + arrière + becquet (2024-2025) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00325",
  "name": "Déflecteurs de vitres (jeu)",
  "price": 40.9,
  "priceCents": 4090,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Déflecteurs d'air teintés à poser sur les encadrements de vitres. Permettent de rouler vitres entrouvertes sous la pluie sans infiltration. Pose adhésive.",
  "descLong": "Déflecteurs d'air teintés à poser sur les encadrements de vitres. Permettent de rouler vitres entrouvertes sous la pluie sans infiltration. Pose adhésive.",
  "slug": "ECP00325",
  "alt": "Déflecteurs de vitres (jeu) — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00326",
  "name": "Protection de seuil de coffre",
  "price": 47.9,
  "priceCents": 4790,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Panneau de protection du seuil de coffre. Préserve la peinture au moment de charger et décharger les bagages.",
  "descLong": "Panneau de protection du seuil de coffre. Préserve la peinture au moment de charger et décharger les bagages.",
  "slug": "ECP00326",
  "alt": "Protection de seuil de coffre — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00327",
  "name": "Protection intérieure de coffre",
  "price": 52.9,
  "priceCents": 5290,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield",
  "desc": "Plaque de protection de la paroi intérieure du coffre. Empêche les rayures et les chocs lors du chargement.",
  "descLong": "Plaque de protection de la paroi intérieure du coffre. Empêche les rayures et les chocs lors du chargement.",
  "slug": "ECP00327",
  "alt": "Protection intérieure de coffre — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00328",
  "name": "Protections de seuils de porte intérieurs",
  "price": 44.9,
  "priceCents": 4490,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-gem",
  "desc": "Protections de seuils intérieurs à finition antidérapante. Évitent l'usure et les rayures du plastique d'origine. Pose adhésive sans perçage.",
  "descLong": "Protections de seuils intérieurs à finition antidérapante. Évitent l'usure et les rayures du plastique d'origine. Pose adhésive sans perçage.",
  "slug": "ECP00328",
  "alt": "Protections de seuils de porte intérieurs — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00329",
  "name": "Barres de seuil de porte",
  "price": 59.9,
  "priceCents": 5990,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Extérieur",
  "icon": "fa-gem",
  "desc": "Jeu de barres de seuil qui protègent les bas de caisse des rayures à l'entrée et à la sortie du véhicule. Découpe spécifique au modèle, pose adhésive sans perçage.",
  "descLong": "Jeu de barres de seuil qui protègent les bas de caisse des rayures à l'entrée et à la sortie du véhicule. Découpe spécifique au modèle, pose adhésive sans perçage.",
  "slug": "ECP00329",
  "alt": "Barres de seuil de porte — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP00331",
  "name": "Bavettes garde-boue (2021-2025)",
  "price": 108.9,
  "priceCents": 10890,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Jeu de bavettes de carrosserie pour BYD Seal U. Montage sur les passages de roue avant et arrière.",
  "descLong": "Jeu de bavettes de carrosserie pour BYD Seal U. Montage sur les passages de roue avant et arrière.",
  "slug": "ECP00331",
  "alt": "Bavettes garde-boue (2021-2025) — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00334",
  "name": "Feux de pare-chocs arrière LED défilants",
  "price": 77.9,
  "priceCents": 7790,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-lightbulb",
  "desc": "Paire de feux LED à défilement pour le pare-chocs arrière. Éclairage rouge.",
  "descLong": "Paire de feux LED à défilement pour le pare-chocs arrière. Éclairage rouge.",
  "slug": "ECP00334",
  "alt": "Feux de pare-chocs arrière LED défilants — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00335",
  "name": "Feux de jour LED trois couleurs",
  "price": 132.9,
  "priceCents": 13290,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-lightbulb",
  "desc": "Feux de jour LED pour le pare-chocs avant. Trois teintes d'éclairage : blanc, ambre et bleu.",
  "descLong": "Feux de jour LED pour le pare-chocs avant. Trois teintes d'éclairage : blanc, ambre et bleu.",
  "slug": "ECP00335",
  "alt": "Feux de jour LED trois couleurs — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00338",
  "name": "Marchepieds latéraux",
  "price": 180.9,
  "priceCents": 18090,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shoe-prints",
  "desc": "Paire de marchepieds latéraux avec surface antidérapante. Facilite l'accès à bord.",
  "descLong": "Paire de marchepieds latéraux avec surface antidérapante. Facilite l'accès à bord.",
  "slug": "ECP00338",
  "alt": "Marchepieds latéraux — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00339",
  "name": "Marchepieds latéraux électriques escamotables",
  "price": 738.9,
  "priceCents": 73890,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shoe-prints",
  "desc": "Marchepieds électriques qui se déploient à l'ouverture des portes et se rétractent à la fermeture.",
  "descLong": "Marchepieds électriques qui se déploient à l'ouverture des portes et se rétractent à la fermeture.",
  "slug": "ECP00339",
  "alt": "Marchepieds latéraux électriques escamotables — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00340",
  "name": "Déflecteur de toit ouvrant",
  "price": 40.9,
  "priceCents": 4090,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Déflecteur de toit ouvrant limitant les turbulences et les entrées de pluie.",
  "descLong": "Déflecteur de toit ouvrant limitant les turbulences et les entrées de pluie.",
  "slug": "ECP00340",
  "alt": "Déflecteur de toit ouvrant — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00341",
  "name": "Kit pare-chocs avant + arrière",
  "price": 600.9,
  "priceCents": 60090,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Ensemble de carrosserie comprenant le bouclier avant et le bouclier arrière.",
  "descLong": "Ensemble de carrosserie comprenant le bouclier avant et le bouclier arrière.",
  "slug": "ECP00341",
  "alt": "Kit pare-chocs avant + arrière — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00342",
  "name": "Becquet de toit",
  "price": 101.9,
  "priceCents": 10190,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Becquet de toit à monter au-dessus de la lunette arrière.",
  "descLong": "Becquet de toit à monter au-dessus de la lunette arrière.",
  "slug": "ECP00342",
  "alt": "Becquet de toit — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00343",
  "name": "Aileron de coffre",
  "price": 85.9,
  "priceCents": 8590,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Aileron à coller sur le hayon, finition noire.",
  "descLong": "Aileron à coller sur le hayon, finition noire.",
  "slug": "ECP00343",
  "alt": "Aileron de coffre — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00344",
  "name": "Diffuseur de pare-chocs arrière",
  "price": 134.9,
  "priceCents": 13490,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Habillage de bas de pare-chocs arrière, finition noire.",
  "descLong": "Habillage de bas de pare-chocs arrière, finition noire.",
  "slug": "ECP00344",
  "alt": "Diffuseur de pare-chocs arrière — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00345",
  "name": "Lame de pare-chocs avant",
  "price": 134.9,
  "priceCents": 13490,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Lame de bas de bouclier avant en trois parties, finition noire.",
  "descLong": "Lame de bas de bouclier avant en trois parties, finition noire.",
  "slug": "ECP00345",
  "alt": "Lame de pare-chocs avant — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00346",
  "name": "Kit carrosserie complet (avant + arrière + aileron)",
  "price": 347.9,
  "priceCents": 34790,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Ensemble complet : lame avant, diffuseur arrière, extensions latérales et aileron.",
  "descLong": "Ensemble complet : lame avant, diffuseur arrière, extensions latérales et aileron.",
  "slug": "ECP00346",
  "alt": "Kit carrosserie complet (avant + arrière + aileron) — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00368",
  "name": "Grilles de protection des aérations sous sièges",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield",
  "desc": "Jeu de grilles à clipser sur les bouches d'aération situées sous les sièges avant.",
  "descLong": "Jeu de grilles à clipser sur les bouches d'aération situées sous les sièges avant.",
  "slug": "ECP00368",
  "alt": "Grilles de protection des aérations sous sièges — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00369",
  "name": "Baguettes de calandre 8 pièces",
  "price": 113.9,
  "priceCents": 11390,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-gem",
  "desc": "Jeu de 8 baguettes de décoration pour la calandre avant.",
  "descLong": "Jeu de 8 baguettes de décoration pour la calandre avant.",
  "slug": "ECP00369",
  "alt": "Baguettes de calandre 8 pièces — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00370",
  "name": "Grilles anti-insectes 8 pièces",
  "price": 101.9,
  "priceCents": 10190,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Jeu de 8 grilles anti-insectes pour les entrées d'air du bouclier avant.",
  "descLong": "Jeu de 8 grilles anti-insectes pour les entrées d'air du bouclier avant.",
  "slug": "ECP00370",
  "alt": "Grilles anti-insectes 8 pièces — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00371",
  "name": "Grille anti-insectes de calandre",
  "price": 50.9,
  "priceCents": 5090,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Grille de protection pour les entrées d'air avant. Bloque insectes et débris.",
  "descLong": "Grille de protection pour les entrées d'air avant. Bloque insectes et débris.",
  "slug": "ECP00371",
  "alt": "Grille anti-insectes de calandre — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00373",
  "name": "Barres de toit transversales",
  "price": 96.9,
  "priceCents": 9690,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-car-side",
  "desc": "Paire de barres transversales pour barres de toit longitudinales.",
  "descLong": "Paire de barres transversales pour barres de toit longitudinales.",
  "slug": "ECP00373",
  "alt": "Barres de toit transversales — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00374",
  "name": "Cache-bagages de coffre",
  "price": 69.9,
  "priceCents": 6990,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-couch",
  "desc": "Store rétractable de coffre masquant les bagages.",
  "descLong": "Store rétractable de coffre masquant les bagages.",
  "slug": "ECP00374",
  "alt": "Cache-bagages de coffre — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00375",
  "name": "Protection de dossier de banquette",
  "price": 48.9,
  "priceCents": 4890,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-couch",
  "desc": "Protection en deux parties pour les dossiers de banquette arrière rabattus.",
  "descLong": "Protection en deux parties pour les dossiers de banquette arrière rabattus.",
  "slug": "ECP00375",
  "alt": "Protection de dossier de banquette — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00376",
  "name": "Tapis de coffre",
  "price": 42.9,
  "priceCents": 4290,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis de coffre à rebords, surface nervurée.",
  "descLong": "Tapis de coffre à rebords, surface nervurée.",
  "slug": "ECP00376",
  "alt": "Tapis de coffre — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00377",
  "name": "Tapis de sol double épaisseur",
  "price": 115.9,
  "priceCents": 11590,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Jeu de tapis de sol double épaisseur avec surtapis amovible.",
  "descLong": "Jeu de tapis de sol double épaisseur avec surtapis amovible.",
  "slug": "ECP00377",
  "alt": "Tapis de sol double épaisseur — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00378",
  "name": "Tapis de sol simple épaisseur",
  "price": 87.9,
  "priceCents": 8790,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Jeu de tapis de sol moulés avec rebords, avant et arrière.",
  "descLong": "Jeu de tapis de sol moulés avec rebords, avant et arrière.",
  "slug": "ECP00378",
  "alt": "Tapis de sol simple épaisseur — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00379",
  "name": "Bacs de rangement latéraux de coffre",
  "price": 37.9,
  "priceCents": 3790,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bacs de rangement à loger dans les creux latéraux du coffre.",
  "descLong": "Bacs de rangement à loger dans les creux latéraux du coffre.",
  "slug": "ECP00379",
  "alt": "Bacs de rangement latéraux de coffre — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00380",
  "name": "Bac de rangement sous plancher de coffre (2025)",
  "price": 96.9,
  "priceCents": 9690,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac compartimenté à installer sous le plancher du coffre.",
  "descLong": "Bac compartimenté à installer sous le plancher du coffre.",
  "slug": "ECP00380",
  "alt": "Bac de rangement sous plancher de coffre (2025) — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00381",
  "name": "Bac de rangement sous plancher de coffre DM-i",
  "price": 96.9,
  "priceCents": 9690,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac compartimenté sous plancher de coffre pour version DM-i.",
  "descLong": "Bac compartimenté sous plancher de coffre pour version DM-i.",
  "slug": "ECP00381",
  "alt": "Bac de rangement sous plancher de coffre DM-i — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00382",
  "name": "Bac de rangement sous plancher de coffre DM-i (2 parties)",
  "price": 88.9,
  "priceCents": 8890,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement sous plancher de coffre en deux parties pour version DM-i.",
  "descLong": "Bac de rangement sous plancher de coffre en deux parties pour version DM-i.",
  "slug": "ECP00382",
  "alt": "Bac de rangement sous plancher de coffre DM-i (2 parties) — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00383",
  "name": "Bac de rangement sous plancher de coffre EV",
  "price": 79.9,
  "priceCents": 7990,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac compartimenté sous plancher de coffre pour version électrique.",
  "descLong": "Bac compartimenté sous plancher de coffre pour version électrique.",
  "slug": "ECP00383",
  "alt": "Bac de rangement sous plancher de coffre EV — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00384",
  "name": "Bac de rangement de coffre EV",
  "price": 79.9,
  "priceCents": 7990,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement à loger sous le plancher du coffre, version électrique.",
  "descLong": "Bac de rangement à loger sous le plancher du coffre, version électrique.",
  "slug": "ECP00384",
  "alt": "Bac de rangement de coffre EV — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00386",
  "name": "Bac de rangement de coffre avant (frunk)",
  "price": 123.9,
  "priceCents": 12390,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement pour le coffre avant.",
  "descLong": "Bac de rangement pour le coffre avant.",
  "slug": "ECP00386",
  "alt": "Bac de rangement de coffre avant (frunk) — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00387",
  "name": "Bac de rangement de coffre avant (frunk)",
  "price": 96.9,
  "priceCents": 9690,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement moulé pour le coffre avant.",
  "descLong": "Bac de rangement moulé pour le coffre avant.",
  "slug": "ECP00387",
  "alt": "Bac de rangement de coffre avant (frunk) — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00389",
  "name": "Protections de bords de portes 4 pièces",
  "price": 29.9,
  "priceCents": 2990,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield",
  "desc": "Jeu de 4 protections pour les bords intérieurs des portes.",
  "descLong": "Jeu de 4 protections pour les bords intérieurs des portes.",
  "slug": "ECP00389",
  "alt": "Protections de bords de portes 4 pièces — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00390",
  "name": "Bac de rangement de console centrale",
  "price": 23.9,
  "priceCents": 2390,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement à loger dans la console centrale.",
  "descLong": "Bac de rangement à loger dans la console centrale.",
  "slug": "ECP00390",
  "alt": "Bac de rangement de console centrale — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00391",
  "name": "Bac de rangement inférieur de console centrale",
  "price": 29.9,
  "priceCents": 2990,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement pour l'espace situé sous la console centrale.",
  "descLong": "Bac de rangement pour l'espace situé sous la console centrale.",
  "slug": "ECP00391",
  "alt": "Bac de rangement inférieur de console centrale — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00392",
  "name": "Bac de rangement d'accoudoir central",
  "price": 24.9,
  "priceCents": 2490,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement compartimenté à loger dans l'accoudoir central.",
  "descLong": "Bac de rangement compartimenté à loger dans l'accoudoir central.",
  "slug": "ECP00392",
  "alt": "Bac de rangement d'accoudoir central — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00393",
  "name": "Bac de rangement d'accoudoir central (conduite à droite)",
  "price": 24.9,
  "priceCents": 2490,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement compartimenté d'accoudoir central pour véhicule à conduite à droite.",
  "descLong": "Bac de rangement compartimenté d'accoudoir central pour véhicule à conduite à droite.",
  "slug": "ECP00393",
  "alt": "Bac de rangement d'accoudoir central (conduite à droite) — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00394",
  "name": "Inserts de porte-gobelets",
  "price": 24.9,
  "priceCents": 2490,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-car-side",
  "desc": "Inserts antidérapants pour les porte-gobelets de la console centrale.",
  "descLong": "Inserts antidérapants pour les porte-gobelets de la console centrale.",
  "slug": "ECP00394",
  "alt": "Inserts de porte-gobelets — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00395",
  "name": "Tapis de charge à induction",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis antidérapant pour la zone de charge sans fil.",
  "descLong": "Tapis antidérapant pour la zone de charge sans fil.",
  "slug": "ECP00395",
  "alt": "Tapis de charge à induction — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00396",
  "name": "Bac de rangement de console centrale (2023)",
  "price": 29.9,
  "priceCents": 2990,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement à glisser dans la console centrale.",
  "descLong": "Bac de rangement à glisser dans la console centrale.",
  "slug": "ECP00396",
  "alt": "Bac de rangement de console centrale (2023) — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00397",
  "name": "Bac de rangement d'accoudoir (2023-2025)",
  "price": 26.9,
  "priceCents": 2690,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement compartimenté pour l'accoudoir central.",
  "descLong": "Bac de rangement compartimenté pour l'accoudoir central.",
  "slug": "ECP00397",
  "alt": "Bac de rangement d'accoudoir (2023-2025) — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00398",
  "name": "Passages de roue intérieurs",
  "price": 25.9,
  "priceCents": 2590,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Paire de protections de passage de roue.",
  "descLong": "Paire de protections de passage de roue.",
  "slug": "ECP00398",
  "alt": "Passages de roue intérieurs — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00399",
  "name": "Bavettes garde-boue 4 pièces",
  "price": 25.9,
  "priceCents": 2590,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Jeu de 4 bavettes garde-boue, avant et arrière.",
  "descLong": "Jeu de 4 bavettes garde-boue, avant et arrière.",
  "slug": "ECP00399",
  "alt": "Bavettes garde-boue 4 pièces — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00400",
  "name": "Pédales d'accélérateur et de frein",
  "price": 36.9,
  "priceCents": 3690,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shoe-prints",
  "desc": "Couvre-pédales accélérateur et frein, finition aluminium brossé.",
  "descLong": "Couvre-pédales accélérateur et frein, finition aluminium brossé.",
  "slug": "ECP00400",
  "alt": "Pédales d'accélérateur et de frein — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00402",
  "name": "Housse d'accoudoir central",
  "price": 35.9,
  "priceCents": 3590,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-couch",
  "desc": "Housse de protection pour l'accoudoir central.",
  "descLong": "Housse de protection pour l'accoudoir central.",
  "slug": "ECP00402",
  "alt": "Housse d'accoudoir central — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00403",
  "name": "Tapis silicone de console centrale",
  "price": 21.9,
  "priceCents": 2190,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis de protection antidérapant pour la console centrale.",
  "descLong": "Tapis de protection antidérapant pour la console centrale.",
  "slug": "ECP00403",
  "alt": "Tapis silicone de console centrale — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00404",
  "name": "Contour d'écran central 15,6 pouces",
  "price": 21.9,
  "priceCents": 2190,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield-halved",
  "desc": "Cadre de protection pour le pourtour de l'écran central 15,6 pouces.",
  "descLong": "Cadre de protection pour le pourtour de l'écran central 15,6 pouces.",
  "slug": "ECP00404",
  "alt": "Contour d'écran central 15,6 pouces — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00405",
  "name": "Films de protection écran + combiné (2023-2025)",
  "price": 27.9,
  "priceCents": 2790,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield-halved",
  "desc": "Verre trempé pour l'écran central 15,6 pouces et le combiné d'instruments.",
  "descLong": "Verre trempé pour l'écran central 15,6 pouces et le combiné d'instruments.",
  "slug": "ECP00405",
  "alt": "Films de protection écran + combiné (2023-2025) — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00475",
  "name": "Marchepieds latéraux",
  "price": 186.9,
  "priceCents": 18690,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shoe-prints",
  "desc": "Paire de marchepieds latéraux avec surface antidérapante. Facilite l'accès à bord.",
  "descLong": "Paire de marchepieds latéraux avec surface antidérapante. Facilite l'accès à bord.",
  "slug": "ECP00475",
  "alt": "Marchepieds latéraux — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00476",
  "name": "Déflecteurs de vitres",
  "price": 38.9,
  "priceCents": 3890,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Déflecteurs de vitres limitant les entrées de pluie et le bruit d'air vitres entrouvertes.",
  "descLong": "Déflecteurs de vitres limitant les entrées de pluie et le bruit d'air vitres entrouvertes.",
  "slug": "ECP00476",
  "alt": "Déflecteurs de vitres — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00477",
  "name": "Becquet de toit",
  "price": 101.9,
  "priceCents": 10190,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Becquet de toit à monter au-dessus de la lunette arrière.",
  "descLong": "Becquet de toit à monter au-dessus de la lunette arrière.",
  "slug": "ECP00477",
  "alt": "Becquet de toit — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00478",
  "name": "Bas de caisse latéraux",
  "price": 129.9,
  "priceCents": 12990,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Jeu de bas de caisse latéraux, finition noir brillant.",
  "descLong": "Jeu de bas de caisse latéraux, finition noir brillant.",
  "slug": "ECP00478",
  "alt": "Bas de caisse latéraux — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00479",
  "name": "Diffuseur de pare-chocs arrière",
  "price": 247.9,
  "priceCents": 24790,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Habillage de bas de pare-chocs arrière.",
  "descLong": "Habillage de bas de pare-chocs arrière.",
  "slug": "ECP00479",
  "alt": "Diffuseur de pare-chocs arrière — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00480",
  "name": "Lame de pare-chocs avant",
  "price": 134.9,
  "priceCents": 13490,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Lame de bas de bouclier avant.",
  "descLong": "Lame de bas de bouclier avant.",
  "slug": "ECP00480",
  "alt": "Lame de pare-chocs avant — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00481",
  "name": "Kit carrosserie complet (avant + arrière + bas de caisse + aileron)",
  "price": 469.9,
  "priceCents": 46990,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Ensemble complet : lame avant, diffuseur arrière, bas de caisse et aileron.",
  "descLong": "Ensemble complet : lame avant, diffuseur arrière, bas de caisse et aileron.",
  "slug": "ECP00481",
  "alt": "Kit carrosserie complet (avant + arrière + bas de caisse + aileron) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00500",
  "name": "Grilles d'aération sous sièges (paire)",
  "price": 23.9,
  "priceCents": 2390,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Paire de grilles de protection pour les bouches d'aération situées sous les sièges avant.",
  "descLong": "Paire de grilles de protection pour les bouches d'aération situées sous les sièges avant.",
  "slug": "ECP00500",
  "alt": "Grilles d'aération sous sièges (paire) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00501",
  "name": "Baguettes de capot",
  "price": 40.9,
  "priceCents": 4090,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Extérieur",
  "icon": "fa-gem",
  "desc": "Jeu de baguettes de décoration pour la jonction du capot.",
  "descLong": "Jeu de baguettes de décoration pour la jonction du capot.",
  "slug": "ECP00501",
  "alt": "Baguettes de capot — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00502",
  "name": "Grilles anti-insectes avant + arrière (2025)",
  "price": 112.9,
  "priceCents": 11290,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Jeu de grilles anti-insectes pour les entrées d'air avant et arrière.",
  "descLong": "Jeu de grilles anti-insectes pour les entrées d'air avant et arrière.",
  "slug": "ECP00502",
  "alt": "Grilles anti-insectes avant + arrière (2025) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00504",
  "name": "Barres de toit transversales",
  "price": 96.9,
  "priceCents": 9690,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Extérieur",
  "icon": "fa-car-side",
  "desc": "Paire de barres transversales pour barres de toit longitudinales.",
  "descLong": "Paire de barres transversales pour barres de toit longitudinales.",
  "slug": "ECP00504",
  "alt": "Barres de toit transversales — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00506",
  "name": "Protection de dossier de banquette (2024)",
  "price": 51.9,
  "priceCents": 5190,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-couch",
  "desc": "Protection en deux parties pour les dossiers de banquette arrière rabattus.",
  "descLong": "Protection en deux parties pour les dossiers de banquette arrière rabattus.",
  "slug": "ECP00506",
  "alt": "Protection de dossier de banquette (2024) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00507",
  "name": "Tapis de coffre (2024)",
  "price": 46.9,
  "priceCents": 4690,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis de coffre à rebords, surface nervurée.",
  "descLong": "Tapis de coffre à rebords, surface nervurée.",
  "slug": "ECP00507",
  "alt": "Tapis de coffre (2024) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00508",
  "name": "Tapis de sol double épaisseur (2024)",
  "price": 143.9,
  "priceCents": 14390,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Jeu de tapis de sol double épaisseur avec surtapis amovible.",
  "descLong": "Jeu de tapis de sol double épaisseur avec surtapis amovible.",
  "slug": "ECP00508",
  "alt": "Tapis de sol double épaisseur (2024) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00509",
  "name": "Tapis de sol simple épaisseur (2024)",
  "price": 98.9,
  "priceCents": 9890,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Jeu de tapis de sol moulés avec rebords, avant et arrière.",
  "descLong": "Jeu de tapis de sol moulés avec rebords, avant et arrière.",
  "slug": "ECP00509",
  "alt": "Tapis de sol simple épaisseur (2024) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00510",
  "name": "Bacs de rangement de portes (2025)",
  "price": 29.9,
  "priceCents": 2990,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Jeu de bacs de rangement à loger dans les vide-poches de portes.",
  "descLong": "Jeu de bacs de rangement à loger dans les vide-poches de portes.",
  "slug": "ECP00510",
  "alt": "Bacs de rangement de portes (2025) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00511",
  "name": "Bac de rangement inférieur de console centrale (2025)",
  "price": 28.9,
  "priceCents": 2890,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement pour l'espace situé sous la console centrale.",
  "descLong": "Bac de rangement pour l'espace situé sous la console centrale.",
  "slug": "ECP00511",
  "alt": "Bac de rangement inférieur de console centrale (2025) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00512",
  "name": "Bac de rangement silicone de console centrale (2024-2025)",
  "price": 34.9,
  "priceCents": 3490,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement à loger dans la console centrale.",
  "descLong": "Bac de rangement à loger dans la console centrale.",
  "slug": "ECP00512",
  "alt": "Bac de rangement silicone de console centrale (2024-2025) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00513",
  "name": "Bac de rangement inférieur de console centrale (2024-2025)",
  "price": 31.9,
  "priceCents": 3190,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement pour l'espace situé sous la console centrale.",
  "descLong": "Bac de rangement pour l'espace situé sous la console centrale.",
  "slug": "ECP00513",
  "alt": "Bac de rangement inférieur de console centrale (2024-2025) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00514",
  "name": "Bac de rangement d'accoudoir central (2024)",
  "price": 26.9,
  "priceCents": 2690,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement compartimenté à loger dans l'accoudoir central.",
  "descLong": "Bac de rangement compartimenté à loger dans l'accoudoir central.",
  "slug": "ECP00514",
  "alt": "Bac de rangement d'accoudoir central (2024) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00515",
  "name": "Inserts de porte-gobelets (2024)",
  "price": 23.9,
  "priceCents": 2390,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-car-side",
  "desc": "Inserts amovibles pour les porte-gobelets de la console centrale.",
  "descLong": "Inserts amovibles pour les porte-gobelets de la console centrale.",
  "slug": "ECP00515",
  "alt": "Inserts de porte-gobelets (2024) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00516",
  "name": "Inserts de porte-gobelets (conduite à droite, 2024)",
  "price": 24.9,
  "priceCents": 2490,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-car-side",
  "desc": "Inserts amovibles pour les porte-gobelets, véhicule à conduite à droite.",
  "descLong": "Inserts amovibles pour les porte-gobelets, véhicule à conduite à droite.",
  "slug": "ECP00516",
  "alt": "Inserts de porte-gobelets (conduite à droite, 2024) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00517",
  "name": "Tapis de charge à induction (2024-2025)",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis silicone antidérapant pour la zone de charge sans fil.",
  "descLong": "Tapis silicone antidérapant pour la zone de charge sans fil.",
  "slug": "ECP00517",
  "alt": "Tapis de charge à induction (2024-2025) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00518",
  "name": "Bac de rangement sous écran (2025)",
  "price": 28.9,
  "priceCents": 2890,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement compartimenté à loger sous l'écran central.",
  "descLong": "Bac de rangement compartimenté à loger sous l'écran central.",
  "slug": "ECP00518",
  "alt": "Bac de rangement sous écran (2025) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00519",
  "name": "Bac de rangement arrière d'écran (2024-2025)",
  "price": 31.9,
  "priceCents": 3190,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement à loger derrière l'écran central.",
  "descLong": "Bac de rangement à loger derrière l'écran central.",
  "slug": "ECP00519",
  "alt": "Bac de rangement arrière d'écran (2024-2025) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00520",
  "name": "Passages de roue intérieurs",
  "price": 25.9,
  "priceCents": 2590,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Paire de protections de passage de roue, visserie fournie.",
  "descLong": "Paire de protections de passage de roue, visserie fournie.",
  "slug": "ECP00520",
  "alt": "Passages de roue intérieurs — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00522",
  "name": "Pédales d'accélérateur et de frein",
  "price": 35.9,
  "priceCents": 3590,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shoe-prints",
  "desc": "Couvre-pédales accélérateur et frein. Disponible en finition claire ou noire.",
  "descLong": "Couvre-pédales accélérateur et frein. Disponible en finition claire ou noire.",
  "slug": "ECP00522",
  "alt": "Pédales d'accélérateur et de frein — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00523",
  "name": "Entourage de sélecteur de vitesses",
  "price": 30.9,
  "priceCents": 3090,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-gem",
  "desc": "Habillage de protection pour l'entourage du sélecteur de vitesses, version transparente.",
  "descLong": "Habillage de protection pour l'entourage du sélecteur de vitesses, version transparente.",
  "slug": "ECP00523",
  "alt": "Entourage de sélecteur de vitesses — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00524",
  "name": "Tapis silicone de console centrale",
  "price": 21.9,
  "priceCents": 2190,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis de protection antidérapant pour la console centrale.",
  "descLong": "Tapis de protection antidérapant pour la console centrale.",
  "slug": "ECP00524",
  "alt": "Tapis silicone de console centrale — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00525",
  "name": "Contour d'écran central 15,6 pouces",
  "price": 21.9,
  "priceCents": 2190,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield-halved",
  "desc": "Cadre de protection pour le pourtour de l'écran central 15,6 pouces.",
  "descLong": "Cadre de protection pour le pourtour de l'écran central 15,6 pouces.",
  "slug": "ECP00525",
  "alt": "Contour d'écran central 15,6 pouces — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00526",
  "name": "Films de protection écran + combiné + passager",
  "price": 40.9,
  "priceCents": 4090,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield-halved",
  "desc": "Verre trempé pour l'écran central 15,6 pouces, le combiné d'instruments et l'écran passager.",
  "descLong": "Verre trempé pour l'écran central 15,6 pouces, le combiné d'instruments et l'écran passager.",
  "slug": "ECP00526",
  "alt": "Films de protection écran + combiné + passager — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00528",
  "name": "Répétiteurs LED d'ailes à défilement (2022-2024)",
  "price": 109.9,
  "priceCents": 10990,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-lightbulb",
  "desc": "Paire de répétiteurs LED à défilement pour les ailes avant.",
  "descLong": "Paire de répétiteurs LED à défilement pour les ailes avant.",
  "slug": "ECP00528",
  "alt": "Répétiteurs LED d'ailes à défilement (2022-2024) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00532",
  "name": "Déflecteurs de vitres (jeu)",
  "price": 36.9,
  "priceCents": 3690,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Déflecteurs à clipser sur le haut des vitres. Permettent d'entrouvrir par temps de pluie. Versions EV et DM-i.",
  "descLong": "Déflecteurs à clipser sur le haut des vitres. Permettent d'entrouvrir par temps de pluie. Versions EV et DM-i.",
  "slug": "ECP00532",
  "alt": "Déflecteurs de vitres (jeu) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00533",
  "name": "Becquet de coffre origine",
  "price": 77.9,
  "priceCents": 7790,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Becquet de coffre au dessin d'origine, finition noir brillant.",
  "descLong": "Becquet de coffre au dessin d'origine, finition noir brillant.",
  "slug": "ECP00533",
  "alt": "Becquet de coffre origine — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00536",
  "name": "Lame de pare-chocs avant",
  "price": 68.9,
  "priceCents": 6890,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Lame à fixer sous le pare-chocs avant, finition noir brillant.",
  "descLong": "Lame à fixer sous le pare-chocs avant, finition noir brillant.",
  "slug": "ECP00536",
  "alt": "Lame de pare-chocs avant — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00537",
  "name": "Ailettes de pare-chocs arrière DC (2022-2025)",
  "price": 49.9,
  "priceCents": 4990,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Ailettes verticales à poser sur le pare-chocs arrière, kit DC.",
  "descLong": "Ailettes verticales à poser sur le pare-chocs arrière, kit DC.",
  "slug": "ECP00537",
  "alt": "Ailettes de pare-chocs arrière DC (2022-2025) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00538",
  "name": "Baguette de lame avant DC (2022-2025)",
  "price": 49.9,
  "priceCents": 4990,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Baguette noir brillant à poser sur la lame de pare-chocs avant, kit DC.",
  "descLong": "Baguette noir brillant à poser sur la lame de pare-chocs avant, kit DC.",
  "slug": "ECP00538",
  "alt": "Baguette de lame avant DC (2022-2025) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00539",
  "name": "Becquet de coffre DC (2022-2025)",
  "price": 61.9,
  "priceCents": 6190,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Becquet de coffre, kit DC, finition noir brillant.",
  "descLong": "Becquet de coffre, kit DC, finition noir brillant.",
  "slug": "ECP00539",
  "alt": "Becquet de coffre DC (2022-2025) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00540",
  "name": "Bas de caisse DC (2022-2025)",
  "price": 170.9,
  "priceCents": 17090,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Paire de bas de caisse, kit DC, finition noir brillant.",
  "descLong": "Paire de bas de caisse, kit DC, finition noir brillant.",
  "slug": "ECP00540",
  "alt": "Bas de caisse DC (2022-2025) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00541",
  "name": "Diffuseur de pare-chocs arrière DC (2022-2025)",
  "price": 170.9,
  "priceCents": 17090,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Diffuseur arrière à lames, kit DC, finition noir brillant.",
  "descLong": "Diffuseur arrière à lames, kit DC, finition noir brillant.",
  "slug": "ECP00541",
  "alt": "Diffuseur de pare-chocs arrière DC (2022-2025) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00542",
  "name": "Lame de pare-chocs avant DC (2022-2025)",
  "price": 161.9,
  "priceCents": 16190,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Lame de pare-chocs avant, kit DC, finition noir brillant.",
  "descLong": "Lame de pare-chocs avant, kit DC, finition noir brillant.",
  "slug": "ECP00542",
  "alt": "Lame de pare-chocs avant DC (2022-2025) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00543",
  "name": "Kit carrosserie DC complet (2022-2025)",
  "price": 445.9,
  "priceCents": 44590,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Lame de pare-chocs avant, bas de caisse, diffuseur arrière et becquet réunis.",
  "descLong": "Lame de pare-chocs avant, bas de caisse, diffuseur arrière et becquet réunis.",
  "slug": "ECP00543",
  "alt": "Kit carrosserie DC complet (2022-2025) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00544",
  "name": "Protection de seuil de coffre",
  "price": 43.9,
  "priceCents": 4390,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Baguette de protection du seuil de coffre. Préserve la peinture au chargement.",
  "descLong": "Baguette de protection du seuil de coffre. Préserve la peinture au chargement.",
  "slug": "ECP00544",
  "alt": "Protection de seuil de coffre — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00549",
  "name": "Coques de rétroviseurs",
  "price": 38.9,
  "priceCents": 3890,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-eye",
  "desc": "Paire de coques à clipser sur les coques d'origine, finition noir brillant.",
  "descLong": "Paire de coques à clipser sur les coques d'origine, finition noir brillant.",
  "slug": "ECP00549",
  "alt": "Coques de rétroviseurs — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00563",
  "name": "Caches de compartiment avant (2022-2025)",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-couch",
  "desc": "Paire de caches ajourés pour le compartiment moteur avant. Limitent l'entrée des poussières et des feuilles.",
  "descLong": "Paire de caches ajourés pour le compartiment moteur avant. Limitent l'entrée des poussières et des feuilles.",
  "slug": "ECP00563",
  "alt": "Caches de compartiment avant (2022-2025) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00564",
  "name": "Grilles de protection d'aérateurs sous sièges",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield",
  "desc": "Paire de grilles à poser sur les bouches d'aération situées sous les sièges avant.",
  "descLong": "Paire de grilles à poser sur les bouches d'aération situées sous les sièges avant.",
  "slug": "ECP00564",
  "alt": "Grilles de protection d'aérateurs sous sièges — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00565",
  "name": "Grille anti-insectes inférieure — DM-i",
  "price": 50.9,
  "priceCents": 5090,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Grille à poser dans la partie basse de la calandre. Version DM-i.",
  "descLong": "Grille à poser dans la partie basse de la calandre. Version DM-i.",
  "slug": "ECP00565",
  "alt": "Grille anti-insectes inférieure — DM-i — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00566",
  "name": "Baguette anti-insectes de calandre — DM-i",
  "price": 50.9,
  "priceCents": 5090,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Baguette ajourée à poser dans la calandre. Version DM-i.",
  "descLong": "Baguette ajourée à poser dans la calandre. Version DM-i.",
  "slug": "ECP00566",
  "alt": "Baguette anti-insectes de calandre — DM-i — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00567",
  "name": "Grilles anti-insectes de calandre (jeu)",
  "price": 79.9,
  "priceCents": 7990,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-shield",
  "desc": "Jeu de grilles à poser derrière la calandre pour arrêter insectes et débris.",
  "descLong": "Jeu de grilles à poser derrière la calandre pour arrêter insectes et débris.",
  "slug": "ECP00567",
  "alt": "Grilles anti-insectes de calandre (jeu) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00568",
  "name": "Tapis de coffre avant et arrière",
  "price": 56.9,
  "priceCents": 5690,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Deux tapis moulés, un pour le coffre avant et un pour le coffre arrière.",
  "descLong": "Deux tapis moulés, un pour le coffre avant et un pour le coffre arrière.",
  "slug": "ECP00568",
  "alt": "Tapis de coffre avant et arrière — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00569",
  "name": "Tapis de coffre (2023, DM-i)",
  "price": 45.9,
  "priceCents": 4590,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis de coffre moulé, bords relevés. Millésime 2023, version DM-i.",
  "descLong": "Tapis de coffre moulé, bords relevés. Millésime 2023, version DM-i.",
  "slug": "ECP00569",
  "alt": "Tapis de coffre (2023, DM-i) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00570",
  "name": "Tapis de sol double épaisseur « Wear King » (2023, DM-i)",
  "price": 121.9,
  "priceCents": 12190,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis TPE moulés doublés d'un surtapis moquette. Millésime 2023, version DM-i.",
  "descLong": "Tapis TPE moulés doublés d'un surtapis moquette. Millésime 2023, version DM-i.",
  "slug": "ECP00570",
  "alt": "Tapis de sol double épaisseur « Wear King » (2023, DM-i) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00571",
  "name": "Tapis de sol simple épaisseur (2023, DM-i)",
  "price": 92.9,
  "priceCents": 9290,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Jeu de 3 tapis moulés, bords relevés. Millésime 2023, version DM-i.",
  "descLong": "Jeu de 3 tapis moulés, bords relevés. Millésime 2023, version DM-i.",
  "slug": "ECP00571",
  "alt": "Tapis de sol simple épaisseur (2023, DM-i) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00572",
  "name": "Bac de rangement de coffre",
  "price": 49.9,
  "priceCents": 4990,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac moulé compartimenté pour le coffre arrière.",
  "descLong": "Bac moulé compartimenté pour le coffre arrière.",
  "slug": "ECP00572",
  "alt": "Bac de rangement de coffre — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00573",
  "name": "Bac de coffre avant (frunk)",
  "price": 49.9,
  "priceCents": 4990,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement moulé pour le coffre avant.",
  "descLong": "Bac de rangement moulé pour le coffre avant.",
  "slug": "ECP00573",
  "alt": "Bac de coffre avant (frunk) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00574",
  "name": "Bacs de vide-poches de portes (jeu de 4, 2023-2024)",
  "price": 32.9,
  "priceCents": 3290,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Quatre bacs à insérer dans les vide-poches de portes. Version DM-i.",
  "descLong": "Quatre bacs à insérer dans les vide-poches de portes. Version DM-i.",
  "slug": "ECP00574",
  "alt": "Bacs de vide-poches de portes (jeu de 4, 2023-2024) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00575",
  "name": "Bac de rangement de console centrale (2023-2024)",
  "price": 25.9,
  "priceCents": 2590,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac compartimenté pour la console centrale. Version DM-i.",
  "descLong": "Bac compartimenté pour la console centrale. Version DM-i.",
  "slug": "ECP00575",
  "alt": "Bac de rangement de console centrale (2023-2024) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00576",
  "name": "Bac de rangement de boîte à gants (2023-2024)",
  "price": 25.9,
  "priceCents": 2590,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac compartimenté à poser dans la boîte à gants. Version DM-i.",
  "descLong": "Bac compartimenté à poser dans la boîte à gants. Version DM-i.",
  "slug": "ECP00576",
  "alt": "Bac de rangement de boîte à gants (2023-2024) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00577",
  "name": "Bac de rangement inférieur de console centrale (2022)",
  "price": 27.9,
  "priceCents": 2790,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac pour l'espace ouvert sous la console centrale.",
  "descLong": "Bac pour l'espace ouvert sous la console centrale.",
  "slug": "ECP00577",
  "alt": "Bac de rangement inférieur de console centrale (2022) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00578",
  "name": "Bac de rangement d'accoudoir (2022)",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac compartimenté à poser dans l'accoudoir central.",
  "descLong": "Bac compartimenté à poser dans l'accoudoir central.",
  "slug": "ECP00578",
  "alt": "Bac de rangement d'accoudoir (2022) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00579",
  "name": "Insert porte-gobelets (2023, DM-i)",
  "price": 22.9,
  "priceCents": 2290,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-car-side",
  "desc": "Insert à poser dans les porte-gobelets de console. Se retire pour le nettoyage.",
  "descLong": "Insert à poser dans les porte-gobelets de console. Se retire pour le nettoyage.",
  "slug": "ECP00579",
  "alt": "Insert porte-gobelets (2023, DM-i) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00580",
  "name": "Insert porte-gobelets (2025, EV)",
  "price": 21.9,
  "priceCents": 2190,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-car-side",
  "desc": "Insert à poser dans les porte-gobelets de console. Se retire pour le nettoyage.",
  "descLong": "Insert à poser dans les porte-gobelets de console. Se retire pour le nettoyage.",
  "slug": "ECP00580",
  "alt": "Insert porte-gobelets (2025, EV) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00581",
  "name": "Tapis de charge à induction (2022)",
  "price": 21.9,
  "priceCents": 2190,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis silicone pour la zone de charge à induction. Antidérapant, découpé au format du logement.",
  "descLong": "Tapis silicone pour la zone de charge à induction. Antidérapant, découpé au format du logement.",
  "slug": "ECP00581",
  "alt": "Tapis de charge à induction (2022) — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00582",
  "name": "Séparateurs de boîte à gants",
  "price": 37.9,
  "priceCents": 3790,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Cloisons à poser dans la boîte à gants pour compartimenter le rangement.",
  "descLong": "Cloisons à poser dans la boîte à gants pour compartimenter le rangement.",
  "slug": "ECP00582",
  "alt": "Séparateurs de boîte à gants — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00585",
  "name": "Pédales sport accélérateur + frein",
  "price": 36.9,
  "priceCents": 3690,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shoe-prints",
  "desc": "Couvre-pédales en aluminium brossé à inserts antidérapants. Pose sur les pédales d'origine.",
  "descLong": "Couvre-pédales en aluminium brossé à inserts antidérapants. Pose sur les pédales d'origine.",
  "slug": "ECP00585",
  "alt": "Pédales sport accélérateur + frein — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00586",
  "name": "Tapis silicone de console centrale",
  "price": 28.9,
  "priceCents": 2890,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-road",
  "desc": "Tapis silicone découpé au format de la console centrale. Antidérapant, se retire pour le nettoyage.",
  "descLong": "Tapis silicone découpé au format de la console centrale. Antidérapant, se retire pour le nettoyage.",
  "slug": "ECP00586",
  "alt": "Tapis silicone de console centrale — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00588",
  "name": "Protections d'écran verre trempé — navigation 15,6\" + combiné 10,25\"",
  "price": 27.9,
  "priceCents": 2790,
  "modeles": [
   "Seal"
  ],
  "categorie": "Intérieur",
  "icon": "fa-shield-halved",
  "desc": "Jeu de deux films en verre trempé haute définition : un pour l'écran central 15,6\", un pour le combiné 10,25\".",
  "descLong": "Jeu de deux films en verre trempé haute définition : un pour l'écran central 15,6\", un pour le combiné 10,25\".",
  "slug": "ECP00588",
  "alt": "Protections d'écran verre trempé — navigation 15,6\" + combiné 10,25\" — XPERIENCE VISION, accessoire BYD Seal"
 },
 {
  "id": "ECP00636",
  "name": "Coussins de sièges (jeu de 3)",
  "price": 26.9,
  "priceCents": 2690,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-couch",
  "desc": "Jeu de trois coussins : deux assises avant et une banquette arrière.",
  "descLong": "Jeu de trois coussins : deux assises avant et une banquette arrière.",
  "slug": "ECP00636",
  "alt": "Coussins de sièges (jeu de 3) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP00915",
  "name": "Extensions d'ailes avant 6 pièces (2026)",
  "price": 466.9,
  "priceCents": 46690,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Extérieur",
  "icon": "fa-wind",
  "desc": "Jeu de 6 extensions d'ailes pour les passages de roue avant.",
  "descLong": "Jeu de 6 extensions d'ailes pour les passages de roue avant.",
  "slug": "ECP00915",
  "alt": "Extensions d'ailes avant 6 pièces (2026) — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP00975",
  "name": "Bacs de rangement latéraux de coffre 4 pièces (2023-2025)",
  "price": 39.9,
  "priceCents": 3990,
  "modeles": [
   "Seal U"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Jeu de 4 bacs de rangement pour les creux latéraux gauche et droit du coffre.",
  "descLong": "Jeu de 4 bacs de rangement pour les creux latéraux gauche et droit du coffre.",
  "slug": "ECP00975",
  "alt": "Bacs de rangement latéraux de coffre 4 pièces (2023-2025) — XPERIENCE VISION, accessoire BYD Seal U"
 },
 {
  "id": "ECP00976",
  "name": "Support tablette pour places arrière",
  "price": 38.9,
  "priceCents": 3890,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-tablet-screen-button",
  "desc": "Support de tablette à fixer sur l'appui-tête, orientation réglable.",
  "descLong": "Support de tablette à fixer sur l'appui-tête, orientation réglable.",
  "slug": "ECP00976",
  "alt": "Support tablette pour places arrière — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP01097",
  "name": "Support tablette pour dossier de siège",
  "price": 35.9,
  "priceCents": 3590,
  "modeles": [
   "Dolphin"
  ],
  "categorie": "Intérieur",
  "icon": "fa-tablet-screen-button",
  "desc": "Support à fixer sur les tiges d'appuie-tête avant. Bras articulé, largeur réglable, montage sans outil.",
  "descLong": "Support à fixer sur les tiges d'appuie-tête avant. Bras articulé, largeur réglable, montage sans outil.",
  "slug": "ECP01097",
  "alt": "Support tablette pour dossier de siège — XPERIENCE VISION, accessoire BYD Dolphin"
 },
 {
  "id": "ECP01099",
  "name": "Support tablette pour dossier de siège",
  "price": 38.9,
  "priceCents": 3890,
  "modeles": [
   "Atto 2"
  ],
  "categorie": "Intérieur",
  "icon": "fa-tablet-screen-button",
  "desc": "Support universel pour tablette ou smartphone, fixation sur les tiges d'appuie-tête avant. Bras articulé, orientation et largeur réglables, montage sans outil. Conçu pour les passagers arrière.",
  "descLong": "Support universel pour tablette ou smartphone, fixation sur les tiges d'appuie-tête avant. Bras articulé, orientation et largeur réglables, montage sans outil. Conçu pour les passagers arrière.",
  "slug": "ECP01099",
  "alt": "Support tablette pour dossier de siège — XPERIENCE VISION, accessoire BYD Atto 2"
 },
 {
  "id": "ECP01100",
  "name": "Support tablette pour dossier de siège",
  "price": 33.9,
  "priceCents": 3390,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-tablet-screen-button",
  "desc": "Support à fixer sur les tiges d'appuie-tête avant. Bras articulé, largeur réglable.",
  "descLong": "Support à fixer sur les tiges d'appuie-tête avant. Bras articulé, largeur réglable.",
  "slug": "ECP01100",
  "alt": "Support tablette pour dossier de siège — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP01294",
  "name": "Bac de rangement à charge à induction",
  "price": 25.9,
  "priceCents": 2590,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de console centrale intégrant la zone de charge à induction.",
  "descLong": "Bac de console centrale intégrant la zone de charge à induction.",
  "slug": "ECP01294",
  "alt": "Bac de rangement à charge à induction — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP01302",
  "name": "Bac de rangement arrière d'écran",
  "price": 31.9,
  "priceCents": 3190,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Intérieur",
  "icon": "fa-box",
  "desc": "Bac de rangement à loger derrière l'écran central.",
  "descLong": "Bac de rangement à loger derrière l'écran central.",
  "slug": "ECP01302",
  "alt": "Bac de rangement arrière d'écran — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP01312",
  "name": "Jantes aluminium 18 pouces",
  "price": 34.9,
  "priceCents": 3490,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Extérieur",
  "icon": "fa-circle-notch",
  "desc": "Jantes 18 pouces, largeur 7J, entraxe 5×120, déport 40 mm. Finition bicolore noir et usiné.",
  "descLong": "Jantes 18 pouces, largeur 7J, entraxe 5×120, déport 40 mm. Finition bicolore noir et usiné.",
  "slug": "ECP01312",
  "alt": "Jantes aluminium 18 pouces — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP01322",
  "name": "Habillages silicone à logo (jeu de 4)",
  "price": 27.9,
  "priceCents": 2790,
  "modeles": [
   "Atto 3"
  ],
  "categorie": "Intérieur",
  "icon": "fa-gem",
  "desc": "Jeu de quatre habillages silicone marqués du logo BYD.",
  "descLong": "Jeu de quatre habillages silicone marqués du logo BYD.",
  "slug": "ECP01322",
  "alt": "Habillages silicone à logo (jeu de 4) — XPERIENCE VISION, accessoire BYD Atto 3"
 },
 {
  "id": "ECP01334",
  "name": "Logos BYD avant et arrière",
  "price": 46.9,
  "priceCents": 4690,
  "modeles": [
   "Sealion 7"
  ],
  "categorie": "Extérieur",
  "icon": "fa-gem",
  "desc": "Logos BYD avant et arrière, finition noire, adhésif 3M.",
  "descLong": "Logos BYD avant et arrière, finition noire, adhésif 3M.",
  "slug": "ECP01334",
  "alt": "Logos BYD avant et arrière — XPERIENCE VISION, accessoire BYD Sealion 7"
 },
 {
  "id": "ECP01336",
  "name": "Logos BYD avant et arrière",
  "price": 38.9,
  "priceCents": 3890,
  "modeles": [
   "Seal"
  ],
  "categorie": "Extérieur",
  "icon": "fa-gem",
  "desc": "Paire de logos BYD adhésifs, avant et arrière, finition noir mat.",
  "descLong": "Paire de logos BYD adhésifs, avant et arrière, finition noir mat.",
  "slug": "ECP01336",
  "alt": "Logos BYD avant et arrière — XPERIENCE VISION, accessoire BYD Seal"
 }
];
});
