#!/usr/bin/env node
/**
 * Applique les images produits dans index.html :
 *   - Chaque <article class="cat-card"> avec data-add-acc="SKU" : remplace
 *     <div class="cat-card-media"><i class="..."></i></div>
 *     par <div class="cat-card-media"><picture>...</picture></div>
 *
 *   - Chaque <article class="cat-bs-card"> (bestsellers, écrans) : remplace
 *     <i class="... cat-bs-icon"></i>
 *     par <div class="cat-bs-media"><picture>...</picture></div>
 *
 * Idempotent : ne fait rien si la card a déjà une balise <picture>.
 *
 * Usage :
 *   npm run apply:images              # applique
 *   npm run apply:images -- --dry-run # affiche sans modifier
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const MAPPING = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'product-images.json'), 'utf8'));
const TARGET_FILE = path.join(ROOT, 'index.html');

function color(txt, c) {
    const codes = { red: 31, green: 32, yellow: 33, cyan: 36, dim: 2 };
    return `\x1b[${codes[c] || 0}m${txt}\x1b[0m`;
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function pictureTag(slug, alt, { className, lazy = true } = {}) {
    const cls = className ? ` class="${className}"` : '';
    const loading = lazy ? ' loading="lazy"' : '';
    return `<picture${cls}><source srcset="img/produits/${slug}.webp" type="image/webp"><img src="img/produits/${slug}.jpeg" alt="${escapeHtml(alt)}"${loading} decoding="async" width="1200" height="900"></picture>`;
}

function main() {
    let html = fs.readFileSync(TARGET_FILE, 'utf8');
    const origHtml = html;

    let replacedCatCard = 0;
    let replacedBsCard = 0;
    let missingImage = [];
    let alreadyDone = 0;

    // =============== 1. cat-card (33 produits extérieur/recharge/intérieur) ===============
    // Pattern : <article class="cat-card"><div class="cat-card-media"><i class="fa-solid XYZ cat-card-icon"></i></div><div class="cat-card-body">...data-add-acc="SKU"...
    // On remplace le bloc cat-card-media entier.
    const catCardRegex = /<article class="cat-card">\s*<div class="cat-card-media"><i class="fa-solid [^"]+cat-card-icon"><\/i><\/div>([\s\S]*?data-add-acc="([A-Z]+-\d+)"[\s\S]*?)<\/article>/g;

    html = html.replace(catCardRegex, (match, rest, sku) => {
        const meta = MAPPING[sku];
        if (!meta) {
            missingImage.push(sku);
            return match;
        }
        replacedCatCard++;
        return `<article class="cat-card"><div class="cat-card-media">${pictureTag(meta.slug, meta.alt)}</div>${rest}</article>`;
    });

    // Détecter les cat-card déjà traitées (idempotence)
    const catCardAlreadyRegex = /<article class="cat-card">\s*<div class="cat-card-media"><picture>[\s\S]*?data-add-acc="([A-Z]+-\d+)"/g;
    let m;
    while ((m = catCardAlreadyRegex.exec(html)) !== null) alreadyDone++;

    // =============== 2. cat-bs-card (bestsellers PACK-* + écrans ECR-*) ===============
    // Pattern : <article class="cat-bs-card..."> [<div class="cat-bs-card-tag">...</div>] <i class="fa-solid XYZ cat-bs-icon"></i><h3>...
    // On garde le tag et on remplace juste le <i> par un wrapper <div class="cat-bs-media"><picture>...</picture></div>
    const bsCardRegex = /<article class="cat-bs-card[^"]*">([\s\S]*?)<i class="fa-solid [^"]+cat-bs-icon"><\/i>([\s\S]*?data-add-(?:acc|service)="([A-Z]+-[A-Z]+)"[\s\S]*?)<\/article>/g;

    html = html.replace(bsCardRegex, (match, before, rest, sku) => {
        const meta = MAPPING[sku];
        if (!meta) {
            missingImage.push(sku);
            return match;
        }
        replacedBsCard++;
        const articleClass = match.match(/<article class="([^"]+)"/)[1];
        return `<article class="${articleClass}">${before}<div class="cat-bs-media">${pictureTag(meta.slug, meta.alt)}</div>${rest}</article>`;
    });

    // Détecter les cat-bs-card déjà traitées
    const bsCardAlreadyRegex = /<article class="cat-bs-card[^"]*">[\s\S]*?<div class="cat-bs-media"><picture>[\s\S]*?data-add-(?:acc|service)="([A-Z]+-[A-Z]+)"/g;
    while ((m = bsCardAlreadyRegex.exec(html)) !== null) alreadyDone++;

    // =============== Résumé ===============
    console.log(`\n🖼  Apply product images ${DRY_RUN ? '(DRY RUN)' : ''}\n`);
    console.log(`  ${color('[cat-card]', 'cyan')}   ${replacedCatCard} produit(s) mis à jour`);
    console.log(`  ${color('[cat-bs]', 'cyan')}     ${replacedBsCard} produit(s) bestsellers/écrans mis à jour`);
    console.log(`  ${color('[idempot]', 'dim')}   ${alreadyDone} déjà traité(s), ignoré(s)`);

    if (missingImage.length > 0) {
        console.log(`\n  ${color('⚠', 'yellow')}  SKUs sans image dans le mapping :`);
        for (const sku of missingImage) console.log(`      - ${sku}`);
    }

    if (html === origHtml) {
        console.log(color('\n  Aucun changement (déjà à jour).', 'dim'));
        return;
    }

    if (DRY_RUN) {
        console.log(color('\n⚠  DRY RUN : index.html non modifié.', 'yellow'));
    } else {
        fs.writeFileSync(TARGET_FILE, html, 'utf8');
        console.log(color('\n✓ index.html mis à jour.', 'green'));
    }
}

main();
