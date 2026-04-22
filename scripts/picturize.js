#!/usr/bin/env node
/**
 * Convertit les <img src="img/*.jpeg|jpg|png" ...> en <picture> avec srcset WebP,
 * dans les fichiers HTML listés. Idempotent : ne touche pas aux <img> déjà dans <picture>.
 *
 * Lancement : node scripts/picturize.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILES = [
    'index.html',
    'histoire.html',
    'contact.html',
    'cgv.html',
    'mentions-legales.html'
];

// Regex : <img ... src="img/<nom>.<ext>" ... > (auto-fermant ou non)
// On capture l'ensemble du tag pour le réutiliser tel quel à l'intérieur du <picture>.
// On exclut les images sans préfixe img/ (icônes externes, data-uri, etc.).
const IMG_REGEX = /<img\s+([^>]*\bsrc\s*=\s*"img\/([^"]+\.(?:jpe?g|png))"[^>]*)>/gi;

function isAlreadyInPicture(html, matchIndex) {
    // Cherche en arrière le dernier <picture ou </picture> avant matchIndex
    const before = html.slice(0, matchIndex);
    const lastOpen = before.lastIndexOf('<picture');
    const lastClose = before.lastIndexOf('</picture>');
    return lastOpen > lastClose;
}

function convertFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let conversions = 0;

    const newContent = content.replace(IMG_REGEX, (full, attrs, srcFile, offset) => {
        if (isAlreadyInPicture(content, offset)) return full;
        // Construit le chemin .webp
        const webpFile = srcFile.replace(/\.(jpe?g|png)$/i, '.webp');
        // Vérifie que le .webp existe
        const webpAbs = path.join(ROOT, 'img', webpFile);
        if (!fs.existsSync(webpAbs)) {
            return full;
        }
        conversions++;
        return `<picture><source srcset="img/${webpFile}" type="image/webp"><img ${attrs}></picture>`;
    });

    if (conversions > 0) {
        fs.writeFileSync(filePath, newContent);
    }
    return conversions;
}

function main() {
    let total = 0;
    for (const f of FILES) {
        const filePath = path.join(ROOT, f);
        if (!fs.existsSync(filePath)) {
            console.log(`  [skip]  ${f} (introuvable)`);
            continue;
        }
        const n = convertFile(filePath);
        total += n;
        console.log(`  ${f.padEnd(28)} ${n} <img> → <picture>`);
    }
    console.log(`\n${total} balise(s) convertie(s) au total.`);
}

main();
