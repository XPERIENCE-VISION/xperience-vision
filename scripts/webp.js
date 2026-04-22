#!/usr/bin/env node
/**
 * Génère des versions .webp pour toutes les images JPEG/PNG du dossier img/.
 * À lancer avec : npm run build:webp
 *
 * Sortie : img/<nom>.webp à côté de chaque source.
 * Idempotent : ne regénère pas si le .webp est plus récent que la source.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMG_DIR = path.join(__dirname, '..', 'img');
const QUALITY = 82;

function shouldRegenerate(srcPath, destPath) {
    if (!fs.existsSync(destPath)) return true;
    const srcStat = fs.statSync(srcPath);
    const destStat = fs.statSync(destPath);
    return srcStat.mtimeMs > destStat.mtimeMs;
}

async function convert(srcPath) {
    const ext = path.extname(srcPath).toLowerCase();
    const base = path.basename(srcPath, ext);
    const destPath = path.join(path.dirname(srcPath), `${base}.webp`);

    if (!shouldRegenerate(srcPath, destPath)) {
        return { srcPath, destPath, skipped: true };
    }

    await sharp(srcPath)
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(destPath);

    const srcSize = fs.statSync(srcPath).size;
    const destSize = fs.statSync(destPath).size;
    const gain = ((1 - destSize / srcSize) * 100).toFixed(1);
    return { srcPath, destPath, srcSize, destSize, gain };
}

async function main() {
    if (!fs.existsSync(IMG_DIR)) {
        console.error(`Dossier introuvable : ${IMG_DIR}`);
        process.exit(1);
    }

    const files = fs.readdirSync(IMG_DIR)
        .filter(f => /\.(jpe?g|png)$/i.test(f))
        .map(f => path.join(IMG_DIR, f));

    if (!files.length) {
        console.log('Aucune image JPEG/PNG à convertir.');
        return;
    }

    console.log(`Conversion WebP de ${files.length} image(s) — quality ${QUALITY}…\n`);

    let regenerated = 0;
    let skipped = 0;
    let totalSrc = 0;
    let totalDest = 0;

    for (const file of files) {
        try {
            const result = await convert(file);
            const name = path.basename(file);
            if (result.skipped) {
                skipped++;
                console.log(`  [skip]  ${name} (à jour)`);
            } else {
                regenerated++;
                totalSrc += result.srcSize;
                totalDest += result.destSize;
                console.log(`  [ok]    ${name.padEnd(40)} ${(result.srcSize / 1024).toFixed(0).padStart(5)} KB → ${(result.destSize / 1024).toFixed(0).padStart(5)} KB  (-${result.gain}%)`);
            }
        } catch (err) {
            console.error(`  [err]   ${path.basename(file)} : ${err.message}`);
        }
    }

    console.log(`\n${regenerated} converti(s) · ${skipped} ignoré(s)`);
    if (regenerated > 0) {
        const gainPct = ((1 - totalDest / totalSrc) * 100).toFixed(1);
        console.log(`Économie totale : ${((totalSrc - totalDest) / 1024).toFixed(0)} KB (-${gainPct}%)`);
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
