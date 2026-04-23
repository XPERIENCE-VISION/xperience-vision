#!/usr/bin/env node
/**
 * Télécharge automatiquement une image Unsplash pour chaque produit du mapping
 * `data/product-images.json`, la redimensionne (1200x900, qualité 85) et la
 * sauvegarde dans `img/produits/{slug}.jpeg` + génère la version .webp.
 *
 * Idempotent : ne retélécharge pas si le fichier existe déjà.
 *
 * Prérequis :
 *   1. Créer une app Unsplash : https://unsplash.com/oauth/applications
 *   2. Copier l'Access Key dans .env → UNSPLASH_ACCESS_KEY=...
 *
 * Usage :
 *   npm run fetch:images                   # télécharge tout (skip existants)
 *   npm run fetch:images -- --force        # retélécharge tout
 *   npm run fetch:images -- --only=EXT-001 # un seul produit
 *   npm run fetch:images -- --dry-run      # affiche ce qui serait fait sans télécharger
 *
 * Attribution :
 *   L'API Unsplash gratuite impose de créditer chaque photographe.
 *   Le script sauvegarde les crédits dans `img/produits/_unsplash-credits.json`.
 *   À afficher quelque part sur le site (ex. page mentions légales).
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const MAPPING_FILE = path.join(ROOT, 'data', 'product-images.json');
const OUT_DIR = path.join(ROOT, 'img', 'produits');
const CREDITS_FILE = path.join(OUT_DIR, '_unsplash-credits.json');

const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 900;
const JPEG_QUALITY = 85;
const WEBP_QUALITY = 82;
const DELAY_BETWEEN_REQUESTS_MS = 1100; // ~55 req/min (marge sous la limite 50 req/h dev, OK si prod)

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_API = 'https://api.unsplash.com';

// ==================== CLI args ====================
const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const DRY_RUN = args.includes('--dry-run');
const ONLY = (args.find(a => a.startsWith('--only=')) || '').split('=')[1];

// ==================== Helpers ====================
function log(msg, level = 'info') {
    const prefix = {
        info:  '       ',
        ok:    ' \x1b[32mOK\x1b[0m    ',
        skip:  ' \x1b[2mskip\x1b[0m  ',
        err:   ' \x1b[31mERR\x1b[0m   ',
        warn:  ' \x1b[33m!\x1b[0m     ',
        dry:   ' \x1b[36mdry\x1b[0m   '
    }[level] || '       ';
    console.log(`${prefix}${msg}`);
}

function httpsGet(url, headers = {}) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, { headers }, res => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                httpsGet(res.headers.location, headers).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode >= 400) {
                res.resume();
                reject(new Error(`HTTP ${res.statusCode} ${res.statusMessage} — ${url}`));
                return;
            }
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => resolve({ headers: res.headers, body: Buffer.concat(chunks) }));
            res.on('error', reject);
        });
        req.on('error', reject);
        req.end();
    });
}

async function searchUnsplash(query) {
    const url = `${UNSPLASH_API}/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&content_filter=high`;
    const { body } = await httpsGet(url, {
        'Authorization': `Client-ID ${ACCESS_KEY}`,
        'Accept-Version': 'v1'
    });
    const data = JSON.parse(body.toString('utf8'));
    if (!data.results || data.results.length === 0) return null;
    return data.results[0];
}

// Track download pour l'attribution Unsplash (obligatoire si usage à grande échelle)
async function pingDownload(downloadLocation) {
    try {
        await httpsGet(downloadLocation, {
            'Authorization': `Client-ID ${ACCESS_KEY}`,
            'Accept-Version': 'v1'
        });
    } catch (e) {
        // non bloquant
    }
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function loadCredits() {
    if (!fs.existsSync(CREDITS_FILE)) return {};
    try { return JSON.parse(fs.readFileSync(CREDITS_FILE, 'utf8')); } catch { return {}; }
}

function saveCredits(credits) {
    fs.writeFileSync(CREDITS_FILE, JSON.stringify(credits, null, 2), 'utf8');
}

// ==================== Main ====================
async function main() {
    if (!ACCESS_KEY && !DRY_RUN) {
        console.error('\n\x1b[31mErreur :\x1b[0m UNSPLASH_ACCESS_KEY manquante dans .env');
        console.error('  1. Créer une app : https://unsplash.com/oauth/applications');
        console.error('  2. Ajouter dans .env : UNSPLASH_ACCESS_KEY=ton_access_key');
        console.error('  3. Relancer la commande (ou tester d\'abord avec --dry-run).\n');
        process.exit(1);
    }

    if (!fs.existsSync(OUT_DIR)) {
        fs.mkdirSync(OUT_DIR, { recursive: true });
    }

    const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
    const credits = loadCredits();

    let entries = Object.entries(mapping).filter(([k]) => !k.startsWith('_'));
    if (ONLY) {
        entries = entries.filter(([k]) => k === ONLY);
        if (entries.length === 0) {
            console.error(`Produit "${ONLY}" introuvable dans ${MAPPING_FILE}`);
            process.exit(1);
        }
    }

    console.log(`\n📸 Fetch Unsplash — ${entries.length} produit(s) ${DRY_RUN ? '(DRY RUN)' : ''}\n`);

    let downloaded = 0, skipped = 0, failed = 0;

    for (const [sku, meta] of entries) {
        const jpegPath = path.join(OUT_DIR, `${meta.slug}.jpeg`);
        const webpPath = path.join(OUT_DIR, `${meta.slug}.webp`);

        if (!FORCE && fs.existsSync(jpegPath)) {
            skipped++;
            log(`${sku.padEnd(8)} ${meta.slug}`, 'skip');
            continue;
        }

        if (DRY_RUN) {
            log(`${sku.padEnd(8)} ${meta.slug}  ← query: "${meta.query}"`, 'dry');
            downloaded++;
            continue;
        }

        try {
            const photo = await searchUnsplash(meta.query);
            if (!photo) {
                failed++;
                log(`${sku.padEnd(8)} aucune image trouvée pour "${meta.query}"`, 'warn');
                continue;
            }

            // Télécharger
            const { body: imgBuffer } = await httpsGet(photo.urls.regular);

            // Resize + compress avec sharp
            await sharp(imgBuffer)
                .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'cover', position: 'attention' })
                .jpeg({ quality: JPEG_QUALITY, progressive: true })
                .toFile(jpegPath);

            await sharp(imgBuffer)
                .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'cover', position: 'attention' })
                .webp({ quality: WEBP_QUALITY, effort: 4 })
                .toFile(webpPath);

            // Ping attribution (obligatoire Unsplash)
            if (photo.links && photo.links.download_location) {
                await pingDownload(photo.links.download_location);
            }

            // Sauvegarder crédits
            credits[sku] = {
                slug: meta.slug,
                photo_id: photo.id,
                photo_url: photo.links.html,
                photographer: photo.user.name,
                photographer_url: `https://unsplash.com/@${photo.user.username}?utm_source=xperience-vision&utm_medium=referral`,
                query: meta.query,
                fetched_at: new Date().toISOString()
            };

            downloaded++;
            log(`${sku.padEnd(8)} ${meta.slug.padEnd(50)}  © ${photo.user.name}`, 'ok');

            await sleep(DELAY_BETWEEN_REQUESTS_MS);
        } catch (err) {
            failed++;
            log(`${sku.padEnd(8)} ${err.message}`, 'err');
            if (err.message.includes('403') || err.message.includes('401')) {
                console.error('\n\x1b[31mAccess Key invalide ou rate-limit atteint.\x1b[0m Vérifier .env.');
                break;
            }
        }
    }

    if (!DRY_RUN && Object.keys(credits).length > 0) {
        saveCredits(credits);
    }

    console.log(`\n${downloaded} téléchargée(s) · ${skipped} ignorée(s) · ${failed} échec(s)`);
    if (downloaded > 0 && !DRY_RUN) {
        console.log(`📁 Images : ${path.relative(ROOT, OUT_DIR)}/`);
        console.log(`📝 Crédits : ${path.relative(ROOT, CREDITS_FILE)}`);
    }
}

main().catch(err => {
    console.error('\x1b[31mErreur fatale :\x1b[0m', err);
    process.exit(1);
});
