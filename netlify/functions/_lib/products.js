/**
 * CATALOGUE PRODUITS — référentiel server-side
 *
 * Tous les produits/services vendables avec leur prix réel.
 * Utilisé par create-checkout-session.js pour valider les montants
 * côté serveur (zero-trust).
 *
 * IMPORTANT : ne jamais faire confiance au prix envoyé par le frontend.
 *
 * Types :
 *  - 'produit' : livré à domicile (accessoires, packs)
 *  - 'service' : installation par XPERIENCE VISION (écrans) — nécessite RDV
 */

// Prix en CENTIMES d'euros (Stripe attend des cents)
const PRODUCTS = {

    // ========== ÉCRANS — INSTALLATION XPERIENCE VISION (services) ==========
    'ECR-FAM': { name: 'Tablette 10.1" Famille', price: 60000, type: 'service' },
    'ECR-POL': { name: 'Écran plafond 13.3" FHD Polyvalent', price: 69900, type: 'service' },
    'ECR-PRE': { name: 'Écran plafond 17.3" FHD Premium', price: 109900, type: 'service' },

    // ========== PACKS SIGNATURE — BESTSELLERS (produits livrés) ==========
    'PACK-CAF': { name: 'Pack Café — Café Express', price: 12900, type: 'produit' },
    'PACK-CLN': { name: 'Pack Clean — Clean & Shine', price: 8900, type: 'produit' },
    'PACK-CAD': { name: 'Pack Cadeau — Coffret Signature', price: 14900, type: 'produit' },

    // ========== ACCESSOIRES EXTÉRIEUR (produits livrés) ==========
    'EXT-001': { name: 'Barres de toit aluminium', price: 34900, type: 'produit' },
    'EXT-002': { name: 'Coffre de toit 440 litres', price: 58900, type: 'produit' },
    'EXT-003': { name: 'Porte-vélos attelage 2 places', price: 27900, type: 'produit' },
    'EXT-004': { name: 'Pare-boue sur-mesure x4', price: 7900, type: 'produit' },
    'EXT-005': { name: 'Becquet sport arrière', price: 29900, type: 'produit' },
    'EXT-006': { name: 'Film PPF anti-rayures', price: 49000, type: 'produit' },
    'EXT-007': { name: 'Baguettes de portes inox', price: 12900, type: 'produit' },
    'EXT-008': { name: 'Caméra de recul HD 1080p', price: 24900, type: 'produit' },
    'EXT-009': { name: 'Jantes sport 18-20 pouces', price: 89900, type: 'produit' },
    'EXT-010': { name: 'Spoilers latéraux sport', price: 38900, type: 'produit' },
    'EXT-011': { name: 'Décorations chromées extérieur', price: 10900, type: 'produit' },
    'EXT-012': { name: 'Protection pare-chocs arrière', price: 8900, type: 'produit' },

    // ========== ACCESSOIRES RECHARGE (produits livrés) ==========
    'REC-001': { name: 'Câble Type 2 7,4 kW — 6m', price: 8900, type: 'produit' },
    'REC-002': { name: 'Câble CCS DC Rapide', price: 14900, type: 'produit' },
    'REC-003': { name: 'Câble T2 vers prise domestique', price: 6900, type: 'produit' },
    'REC-004': { name: 'Wallbox 11 kW connectée', price: 79900, type: 'produit' },
    'REC-005': { name: 'Borne portable 3,7 kW', price: 22900, type: 'produit' },
    'REC-006': { name: 'Adaptateur CCS / CHAdeMO', price: 11900, type: 'produit' },
    'REC-007': { name: 'Sac de transport câble premium', price: 5900, type: 'produit' },
    'REC-008': { name: 'Protection prise de charge (lot 2)', price: 3900, type: 'produit' },
    'REC-009': { name: 'Wallbox 22 kW pro triphasée', price: 119000, type: 'produit' },
    'REC-010': { name: 'Câble T2 / T2 10m rallonge', price: 11900, type: 'produit' },
    'REC-011': { name: 'Adaptateur Schuko mobile', price: 4900, type: 'produit' },
    'REC-012': { name: 'Support câble mural garage', price: 2900, type: 'produit' },

    // ========== ACCESSOIRES INTÉRIEUR & QUOTIDIEN (produits livrés) ==========
    'INT-001': { name: 'Tapis de sol premium', price: 8900, type: 'produit' },
    'INT-002': { name: 'Protection coffre bac', price: 11900, type: 'produit' },
    'INT-003': { name: 'Seuils de porte lumineux', price: 14900, type: 'produit' },
    'INT-004': { name: 'Rangement console cuir', price: 6900, type: 'produit' },
    'INT-005': { name: 'Housse de clé anti-RFID', price: 3900, type: 'produit' },
    'INT-006': { name: 'Écran anti-espion', price: 19900, type: 'produit' },
    'INT-007': { name: 'Pare-soleil magnétique', price: 7900, type: 'produit' },
    'INT-008': { name: 'Housses de siège premium', price: 28900, type: 'produit' },
    'INT-009': { name: 'Filet séparation coffre', price: 4900, type: 'produit' },
    'INT-010': { name: 'Éclairage LED ambiance RGB', price: 18900, type: 'produit' },
    'INT-011': { name: 'Chargeur à induction 15W', price: 8900, type: 'produit' },
    'INT-012': { name: 'Cache-bagages enrouleur', price: 13900, type: 'produit' },

    // ========== ACCESSOIRES SUR-MESURE BYD (configurateur) ==========
    'BYD-001': { name: 'Film protection écran rotatif 15.6" BYD', price: 8900, type: 'produit' },
    'BYD-002': { name: 'Tapis TPE 3D logotés BYD', price: 14900, type: 'produit' },
    'BYD-003': { name: 'Coque clé cuir nappa BYD', price: 5900, type: 'produit' },
    'BYD-004': { name: 'Seuils de porte LED BYD', price: 18900, type: 'produit' },
    'BYD-005': { name: 'Protection coffre sur-mesure BYD', price: 11900, type: 'produit' },
    'BYD-006': { name: 'Habillage console centrale carbone BYD', price: 24900, type: 'produit' },
    'BYD-007': { name: 'Habillage console alcantara BYD', price: 29900, type: 'produit' },
    'BYD-008': { name: 'Films teintés homologués BYD', price: 34900, type: 'produit' },
    'BYD-009': { name: 'Protection toit panoramique UV BYD', price: 19900, type: 'produit' },
    'BYD-010': { name: 'Adaptateur charge Type 2 / CCS premium BYD', price: 17900, type: 'produit' },
    'BYD-011': { name: 'Support smartphone magnétique BYD', price: 4900, type: 'produit' },
    'BYD-012': { name: 'Caches valves logotés BYD', price: 2900, type: 'produit' },
    'BYD-013': { name: 'Pédales aluminium sport BYD', price: 8900, type: 'produit' },
    'BYD-014': { name: 'Dashcam intégrée discrète BYD', price: 44900, type: 'produit' },

    // ========== ACCESSOIRES SUR-MESURE TESLA (configurateur) ==========
    'TSL-001': { name: 'Console centrale wrap alcantara Tesla', price: 22900, type: 'produit' },
    'TSL-002': { name: 'Console centrale wrap carbone Tesla', price: 19900, type: 'produit' },
    'TSL-003': { name: 'Boutons physiques volant Highland', price: 15900, type: 'produit' },
    'TSL-004': { name: 'Films PPF capot Tesla', price: 69000, type: 'produit' },
    'TSL-005': { name: 'Films PPF pare-chocs avant Tesla', price: 49000, type: 'produit' },
    'TSL-006': { name: 'Pack PPF intégral Tesla', price: 289000, type: 'produit' },
    'TSL-007': { name: 'Jantes aero covers alternatifs Tesla', price: 34900, type: 'produit' },
    'TSL-008': { name: 'Tapis coffre + frunk Tesla', price: 18900, type: 'produit' },
    'TSL-009': { name: 'Caméra recul HD améliorée Tesla', price: 29900, type: 'produit' },
    'TSL-010': { name: 'Hub USB multiport boîte à gants Tesla', price: 7900, type: 'produit' },
    'TSL-011': { name: 'Pédales aluminium Tesla', price: 9900, type: 'produit' },
    'TSL-012': { name: 'Tapis 3D TPE logotés Tesla', price: 16900, type: 'produit' },
    'TSL-013': { name: 'Seuils de porte LED Tesla', price: 19900, type: 'produit' },
    'TSL-014': { name: 'Film protection écran central Tesla', price: 7900, type: 'produit' },
    'TSL-015': { name: 'Dashcam Sentry Mode pro Tesla', price: 39900, type: 'produit' },

    // ========== ACCESSOIRES SUR-MESURE XPENG (configurateur) ==========
    'XPG-001': { name: 'Films écran double dashboard XPeng', price: 12900, type: 'produit' },
    'XPG-002': { name: 'Pédales aluminium sport XPeng', price: 8900, type: 'produit' },
    'XPG-003': { name: 'Habillage volant cuir nappa XPeng', price: 34900, type: 'produit' },
    'XPG-004': { name: 'Capot chargeur sans fil renforcé XPeng', price: 7900, type: 'produit' },
    'XPG-005': { name: 'Module CarPlay sans fil XPeng', price: 24900, type: 'produit' },
    'XPG-006': { name: 'Tapis 3D TPE logotés XPeng', price: 15900, type: 'produit' },
    'XPG-007': { name: 'Films teintés homologués XPeng', price: 34900, type: 'produit' },
    'XPG-008': { name: 'Protection coffre sur-mesure XPeng', price: 11900, type: 'produit' },
    'XPG-009': { name: 'Coque clé premium XPeng', price: 4900, type: 'produit' },
    'XPG-010': { name: 'Seuils de porte LED XPeng', price: 17900, type: 'produit' },

    // ========== ACCESSOIRES SUR-MESURE BMW (configurateur) ==========
    'BMW-001': { name: 'Tapis 3D TPE logotés BMW M', price: 17900, type: 'produit' },
    'BMW-002': { name: 'Films PPF capot BMW', price: 69000, type: 'produit' },
    'BMW-003': { name: 'Habillage console carbone M BMW', price: 34900, type: 'produit' },
    'BMW-004': { name: 'Pédales aluminium M BMW', price: 11900, type: 'produit' },
    'BMW-005': { name: 'Seuils LED illuminés BMW', price: 21900, type: 'produit' },
    'BMW-006': { name: 'Films teintés homologués BMW', price: 34900, type: 'produit' },
    'BMW-007': { name: 'Coque clé cuir cousu main BMW', price: 7900, type: 'produit' },
    'BMW-008': { name: 'Protection coffre cuir BMW', price: 14900, type: 'produit' },
    'BMW-009': { name: 'Caches valves BMW M', price: 3900, type: 'produit' },
    'BMW-010': { name: 'Habillage volant alcantara BMW', price: 44900, type: 'produit' },
    'BMW-011': { name: 'Cache moteur alu brossé BMW M', price: 19900, type: 'produit' },
    'BMW-012': { name: 'Dashcam intégrée BMW', price: 49900, type: 'produit' },

    // ========== ACCESSOIRES SUR-MESURE MERCEDES-BENZ (configurateur) ==========
    'MRC-001': { name: 'Tapis 3D TPE logotés Mercedes', price: 18900, type: 'produit' },
    'MRC-002': { name: 'Films PPF capot Mercedes', price: 69000, type: 'produit' },
    'MRC-003': { name: 'Habillage console bois précieux Mercedes', price: 44900, type: 'produit' },
    'MRC-004': { name: 'Pédales aluminium AMG Mercedes', price: 12900, type: 'produit' },
    'MRC-005': { name: 'Seuils LED illuminés Mercedes', price: 22900, type: 'produit' },
    'MRC-006': { name: 'Films teintés homologués Mercedes', price: 34900, type: 'produit' },
    'MRC-007': { name: 'Coque clé cuir nappa Mercedes', price: 8900, type: 'produit' },
    'MRC-008': { name: 'Protection coffre sur-mesure Mercedes SUV', price: 16900, type: 'produit' },
    'MRC-009': { name: 'Étoile éclairée calandre Mercedes', price: 29900, type: 'produit' },
    'MRC-010': { name: 'Habillage volant cuir/alcantara Mercedes', price: 49900, type: 'produit' },
    'MRC-011': { name: 'Pack ambient lighting upgrade Mercedes', price: 59000, type: 'produit' },
    'MRC-012': { name: 'Dashcam intégrée discrète Mercedes', price: 49900, type: 'produit' },

    // ========== ACCESSOIRES SUR-MESURE RANGE ROVER (configurateur) ==========
    'RR-001':  { name: 'Tapis cuir/TPE logotés Range Rover', price: 22900, type: 'produit' },
    'RR-002':  { name: 'Films PPF intégral Range Rover', price: 299000, type: 'produit' },
    'RR-003':  { name: 'Habillage console bois noyer Range Rover', price: 54900, type: 'produit' },
    'RR-004':  { name: 'Marche-pieds rétractables LED Range Rover', price: 129000, type: 'produit' },
    'RR-005':  { name: 'Seuils LED illuminés Range Rover', price: 24900, type: 'produit' },
    'RR-006':  { name: 'Films teintés homologués Range Rover', price: 44900, type: 'produit' },
    'RR-007':  { name: 'Coque clé cuir cousu main Range Rover', price: 9900, type: 'produit' },
    'RR-008':  { name: 'Protection coffre cuir Range Rover', price: 19900, type: 'produit' },
    'RR-009':  { name: 'Habillage volant cuir/alcantara Range Rover', price: 54900, type: 'produit' },
    'RR-010':  { name: 'Dashcam intégrée premium Range Rover', price: 54900, type: 'produit' }
};

function getProduct(id) {
    return PRODUCTS[id] || null;
}

module.exports = { PRODUCTS, getProduct };
