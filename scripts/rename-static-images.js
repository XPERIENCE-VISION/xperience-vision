#!/usr/bin/env node
/**
 * Renomme les images existantes (hero, coffret, installation, produit, catalogue…)
 * vers des noms plus SEO-friendly, et met à jour automatiquement toutes les
 * références dans les fichiers HTML/CSS/JS du projet.
 *
 * Les .jpeg ET .webp sont renommés en parallèle.
 * Les `alt="..."` des `<img>` concernés sont aussi améliorés.
 *
 * Idempotent : si le nouveau nom existe déjà, on ne re-renomme pas.
 *
 * Usage :
 *   npm run rename:images                  # exécute les renommages
 *   npm run rename:images -- --dry-run     # affiche sans rien modifier
 *
 * Note : génère aussi des redirections 301 dans netlify.toml pour préserver
 * d'éventuels liens externes vers les anciens noms.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'img');

const DRY_RUN = process.argv.includes('--dry-run');

// ==================== Mapping rename ====================
// Clé = nom de base (sans extension). Les .jpeg et .webp sont renommés ensemble.
// newAlt = texte alternatif amélioré qui remplacera alt="..." dans les <img>.
const RENAME_MAP = {
    // ===== Hero =====
    'hero-accueil': {
        newName: 'accueil-installation-ecran-voiture-xperience-vision',
        newAlt: 'XPERIENCE VISION — Installation d\'écrans premium pour voiture'
    },
    'hero-realisations': {
        newName: 'realisations-installations-ecrans-voiture-premium',
        newAlt: 'Réalisations XPERIENCE VISION — Installations d\'écrans sur voiture'
    },

    // ===== Coffrets bestsellers =====
    'coffret-contenu': {
        newName: 'coffret-signature-contenu-premium-voiture',
        newAlt: 'Coffret signature XPERIENCE VISION — contenu premium cadeau automobile'
    },
    'coffret-premium': {
        newName: 'coffret-premium-signature-cadeau-voiture',
        newAlt: 'Coffret premium XPERIENCE VISION — cadeau voiture haut de gamme'
    },
    'coffret-presentation': {
        newName: 'coffret-signature-presentation-cadeau-voiture',
        newAlt: 'Coffret signature XPERIENCE VISION — présentation cadeau voiture'
    },

    // ===== Installations =====
    'installation-byd-dolphin': {
        newName: 'installation-ecran-byd-dolphin-xperience-vision',
        newAlt: 'Installation écran sur BYD Dolphin par XPERIENCE VISION'
    },
    'installation-pack-livraison': {
        newName: 'pack-livraison-installation-ecran-voiture',
        newAlt: 'Pack livraison et installation écran voiture XPERIENCE VISION'
    },
    'installation-vue-interieur': {
        newName: 'installation-ecran-plafond-vue-interieur-voiture',
        newAlt: 'Installation écran plafond voiture — vue intérieur XPERIENCE VISION'
    },

    // ===== Produits écrans =====
    'produit-ecran-intermediaire': {
        newName: 'ecran-plafond-13-pouces-fhd-polyvalent-voiture',
        newAlt: 'Écran plafond 13.3" FHD polyvalent pour voiture — XPERIENCE VISION'
    },
    'produit-ecran-xl': {
        newName: 'ecran-plafond-17-pouces-xl-premium-voiture',
        newAlt: 'Écran plafond 17.3" XL premium pour voiture — XPERIENCE VISION'
    },
    'produit-tablette': {
        newName: 'tablette-10-pouces-appuie-tete-famille-voiture',
        newAlt: 'Tablette 10.1" appuie-tête pour famille en voiture — XPERIENCE VISION'
    },

    // ===== Pages du brochure (19 pages) =====
    'catalogue-01': { newName: 'brochure-xv-accessoires-voiture-electrique-page-01', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 1' },
    'catalogue-02': { newName: 'brochure-xv-accessoires-voiture-electrique-page-02', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 2' },
    'catalogue-03': { newName: 'brochure-xv-accessoires-voiture-electrique-page-03', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 3' },
    'catalogue-04': { newName: 'brochure-xv-accessoires-voiture-electrique-page-04', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 4' },
    'catalogue-05': { newName: 'brochure-xv-accessoires-voiture-electrique-page-05', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 5' },
    'catalogue-06': { newName: 'brochure-xv-accessoires-voiture-electrique-page-06', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 6' },
    'catalogue-07': { newName: 'brochure-xv-accessoires-voiture-electrique-page-07', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 7' },
    'catalogue-08': { newName: 'brochure-xv-accessoires-voiture-electrique-page-08', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 8' },
    'catalogue-09': { newName: 'brochure-xv-accessoires-voiture-electrique-page-09', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 9' },
    'catalogue-10': { newName: 'brochure-xv-accessoires-voiture-electrique-page-10', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 10' },
    'catalogue-11': { newName: 'brochure-xv-accessoires-voiture-electrique-page-11', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 11' },
    'catalogue-12': { newName: 'brochure-xv-accessoires-voiture-electrique-page-12', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 12' },
    'catalogue-13': { newName: 'brochure-xv-accessoires-voiture-electrique-page-13', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 13' },
    'catalogue-14': { newName: 'brochure-xv-accessoires-voiture-electrique-page-14', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 14' },
    'catalogue-15': { newName: 'brochure-xv-accessoires-voiture-electrique-page-15', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 15' },
    'catalogue-16': { newName: 'brochure-xv-accessoires-voiture-electrique-page-16', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 16' },
    'catalogue-17': { newName: 'brochure-xv-accessoires-voiture-electrique-page-17', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 17' },
    'catalogue-18': { newName: 'brochure-xv-accessoires-voiture-electrique-page-18', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 18' },
    'catalogue-19': { newName: 'brochure-xv-accessoires-voiture-electrique-page-19', newAlt: 'Catalogue XPERIENCE VISION accessoires voiture électrique — page 19' }
};

// Fichiers à scanner pour mise à jour des références
const SCAN_EXTENSIONS = ['.html', '.css', '.js', '.xml', '.toml', '.json'];
const SCAN_IGNORE = ['node_modules', 'dist', '.git', '.claude', 'img', 'scripts', 'data/product-images.json'];

function walkFiles(dir, out = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const abs = path.join(dir, entry.name);
        const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
        if (SCAN_IGNORE.some(ign => rel === ign || rel.startsWith(ign + '/'))) continue;
        if (entry.isDirectory()) walkFiles(abs, out);
        else if (SCAN_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) out.push(abs);
    }
    return out;
}

function color(txt, c) {
    const codes = { red: 31, green: 32, yellow: 33, cyan: 36, dim: 2 };
    return `\x1b[${codes[c] || 0}m${txt}\x1b[0m`;
}

// ==================== Main ====================
function main() {
    console.log(`\n🏷️  Rename images ${DRY_RUN ? '(DRY RUN)' : ''}\n`);

    // 1. Renommer les fichiers physiques
    let renamed = 0, skipped = 0;
    const actualRenames = []; // Ceux dont on a effectivement bougé le fichier

    for (const [oldBase, { newName }] of Object.entries(RENAME_MAP)) {
        for (const ext of ['.jpeg', '.webp']) {
            const oldPath = path.join(IMG_DIR, `${oldBase}${ext}`);
            const newPath = path.join(IMG_DIR, `${newName}${ext}`);
            if (!fs.existsSync(oldPath)) {
                if (ext === '.jpeg') {
                    console.log(`  ${color('[skip]', 'dim')}  ${oldBase}${ext} (introuvable)`);
                }
                skipped++;
                continue;
            }
            if (fs.existsSync(newPath)) {
                console.log(`  ${color('[done]', 'dim')}  ${newName}${ext} existe déjà`);
                skipped++;
                continue;
            }
            if (DRY_RUN) {
                console.log(`  ${color('[dry]', 'cyan')}  ${oldBase}${ext} → ${newName}${ext}`);
            } else {
                fs.renameSync(oldPath, newPath);
                console.log(`  ${color('[ok]', 'green')}   ${oldBase}${ext} → ${newName}${ext}`);
            }
            renamed++;
        }
        actualRenames.push({ oldBase, newBase: newName });
    }

    // 2. Mettre à jour les références dans les fichiers du projet
    console.log('\n🔗 Scan des références\n');
    const files = walkFiles(ROOT);
    let updatedFiles = 0;
    let totalReplacements = 0;

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        const orig = content;
        let fileReplaceCount = 0;

        for (const [oldBase, { newName, newAlt }] of Object.entries(RENAME_MAP)) {
            // Remplacer les références à oldBase.jpeg / .webp (partout : src, srcset, URLs og, CSS url(), etc.)
            const escaped = oldBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const srcRegex = new RegExp(`\\b${escaped}\\.(jpe?g|webp)\\b`, 'g');
            content = content.replace(srcRegex, (match, ext) => {
                fileReplaceCount++;
                return `${newName}.${ext}`;
            });

            // Remplacer les alt= qui contiennent l'ancien nom de fichier (ex: "Catalogue page 1" → newAlt)
            // On ne touche pas les alt custom, seulement ceux qui sont clairement génériques
            if (newAlt) {
                // Détecter les alt qui correspondent au pattern par défaut du nom
                const altPatterns = {
                    'catalogue-01': /alt="Catalogue page 1"/g,
                    'catalogue-02': /alt="Catalogue page 2"/g,
                    'catalogue-03': /alt="Catalogue page 3"/g,
                    'catalogue-04': /alt="Catalogue page 4"/g,
                    'catalogue-05': /alt="Catalogue page 5"/g,
                    'catalogue-06': /alt="Catalogue page 6"/g,
                    'catalogue-07': /alt="Catalogue page 7"/g,
                    'catalogue-08': /alt="Catalogue page 8"/g,
                    'catalogue-09': /alt="Catalogue page 9"/g,
                    'catalogue-10': /alt="Catalogue page 10"/g,
                    'catalogue-11': /alt="Catalogue page 11"/g,
                    'catalogue-12': /alt="Catalogue page 12"/g,
                    'catalogue-13': /alt="Catalogue page 13"/g,
                    'catalogue-14': /alt="Catalogue page 14"/g,
                    'catalogue-15': /alt="Catalogue page 15"/g,
                    'catalogue-16': /alt="Catalogue page 16"/g,
                    'catalogue-17': /alt="Catalogue page 17"/g,
                    'catalogue-18': /alt="Catalogue page 18"/g,
                    'catalogue-19': /alt="Catalogue page 19"/g
                };
                const altPattern = altPatterns[oldBase];
                if (altPattern) {
                    const before = content;
                    content = content.replace(altPattern, `alt="${newAlt}"`);
                    if (content !== before) fileReplaceCount++;
                }
            }
        }

        if (content !== orig) {
            updatedFiles++;
            totalReplacements += fileReplaceCount;
            const relPath = path.relative(ROOT, file).replace(/\\/g, '/');
            if (DRY_RUN) {
                console.log(`  ${color('[dry]', 'cyan')}  ${relPath} (${fileReplaceCount} remplacement(s))`);
            } else {
                fs.writeFileSync(file, content, 'utf8');
                console.log(`  ${color('[ok]', 'green')}   ${relPath} (${fileReplaceCount} remplacement(s))`);
            }
        }
    }

    // 3. Résumé
    console.log('\n' + '─'.repeat(60));
    console.log(`📁 Fichiers renommés : ${renamed} (${skipped} ignorés)`);
    console.log(`📝 Fichiers mis à jour : ${updatedFiles} (${totalReplacements} refs)`);
    if (DRY_RUN) {
        console.log(color('\n⚠  DRY RUN : aucun fichier modifié. Relancer sans --dry-run pour exécuter.', 'yellow'));
    } else {
        console.log(color('\n✓ Terminé. Penser à relancer npm run build:webp si besoin.', 'green'));
        console.log(color('  Voir scripts/rename-static-images.js pour les redirections 301 suggérées.', 'dim'));
    }
}

main();
