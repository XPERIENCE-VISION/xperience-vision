/* ==========================================================================
   POST /.netlify/functions/avis-envoyer
   Reçoit un avis déposé par un visiteur, le range en « en_attente ».
   Rien n'est publié ici : la publication passe obligatoirement par
   avis-moderer, donc par une action humaine.

   Variables d'environnement facultatives :
     RESEND_API_KEY      → pour recevoir une alerte e-mail à chaque dépôt
     AVIS_EMAIL_NOTIF    → l'adresse qui reçoit l'alerte
     AVIS_EMAIL_EXPED    → l'expéditeur (domaine vérifié chez Resend)
   Si elles sont absentes, tout fonctionne : il n'y a simplement pas d'e-mail.
   ========================================================================== */
import { getStore } from '@netlify/blobs';

const MAX_PHOTOS = 3;
const CRITERES = ['produit', 'delai', 'pose', 'prix', 'relation'];
const MAX_OCTETS_PHOTO = 4 * 1024 * 1024;   // après redimensionnement navigateur
const MAX_PAR_JOUR = 3;                      // par adresse IP

function json(corps, statut = 200) {
  return new Response(JSON.stringify(corps), {
    status: statut,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  });
}

function propre(v, max) {
  return String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, max);
}

/* Empreinte non réversible de l'IP : sert uniquement à limiter les dépôts.
   On ne stocke jamais l'adresse en clair. */
async function empreinte(ip) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('xva|' + ip));
  return Array.from(new Uint8Array(buf)).slice(0, 8).map((b) => b.toString(16).padStart(2, '0')).join('');
}

/* Vérifie que la chaîne est bien une image, par ses octets d'en-tête,
   et pas seulement par ce que le navigateur prétend. */
function imageValide(dataUrl) {
  const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl || '');
  if (!m) return null;
  let bin;
  try { bin = Buffer.from(m[2], 'base64'); } catch (e) { return null; }
  if (!bin.length || bin.length > MAX_OCTETS_PHOTO) return null;
  const jpeg = bin[0] === 0xff && bin[1] === 0xd8 && bin[2] === 0xff;
  const png = bin[0] === 0x89 && bin[1] === 0x50 && bin[2] === 0x4e && bin[3] === 0x47;
  const webp = bin.slice(0, 4).toString('ascii') === 'RIFF' && bin.slice(8, 12).toString('ascii') === 'WEBP';
  if (!jpeg && !png && !webp) return null;
  return { octets: bin, type: 'image/' + m[1], ext: m[1] === 'jpeg' ? 'jpg' : m[1] };
}

async function prevenir(avis) {
  const cle = process.env.RESEND_API_KEY;
  const dest = process.env.AVIS_EMAIL_NOTIF;
  const exped = process.env.AVIS_EMAIL_EXPED;
  if (!cle || !dest || !exped) return;
  const corps =
    `Nouvel avis en attente de modération.\n\n` +
    `${avis.note}/5 — ${avis.titre}\n` +
    `${avis.prenom} ${avis.initiale ? avis.initiale + '.' : ''} · ${avis.email}\n` +
    `${avis.modele || 'véhicule non précisé'} · ${avis.type}\n` +
    `${avis.photos.length} photo(s)\n\n` +
    `${avis.texte}\n\n` +
    `Modérer : https://xperiencevision.com/moderation-avis`;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: 'Bearer ' + cle, 'content-type': 'application/json' },
      body: JSON.stringify({ from: exped, to: [dest], subject: `Avis ${avis.note}★ à modérer — ${avis.titre}`, text: corps })
    });
  } catch (e) { /* l'e-mail ne doit jamais faire échouer le dépôt */ }
}

export default async (req, context) => {
  if (req.method !== 'POST') return json({ ok: false, message: 'Méthode non autorisée' }, 405);

  let d;
  try { d = await req.json(); } catch (e) { return json({ ok: false, message: 'Requête illisible.' }, 400); }

  /* --- piège à robots : on répond « ok » sans rien enregistrer --- */
  if (propre(d.piege, 50)) return json({ ok: true });

  /* --- validation --- */
  const note = parseInt(d.note, 10);
  const prenom = propre(d.prenom, 40);
  const initiale = propre(d.initiale, 1).toUpperCase().replace(/[^A-ZÀ-Ÿ]/i, '');
  const email = propre(d.email, 120).toLowerCase();
  const titre = propre(d.titre, 70);
  const texte = propre(d.texte, 1000);
  const modele = propre(d.modele, 40);
  const type = propre(d.type, 40);
  const produit = propre(d.produit, 20) || null;

  /* notes de détail : facultatives, on ne garde que les clés connues
     et les valeurs entières de 1 à 5. Tout le reste est jeté. */
  const criteres = {};
  if (d.criteres && typeof d.criteres === 'object') {
    for (const c of CRITERES) {
      const v = parseInt(d.criteres[c], 10);
      if (v >= 1 && v <= 5) criteres[c] = v;
    }
  }

  if (!(note >= 1 && note <= 5)) return json({ ok: false, message: 'La note est manquante ou invalide.' }, 400);
  if (prenom.length < 2) return json({ ok: false, message: 'Le prénom est trop court.' }, 400);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return json({ ok: false, message: "L'adresse e-mail n'est pas valide." }, 400);
  if (!type) return json({ ok: false, message: "Précisez ce que concerne votre avis." }, 400);
  if (titre.length < 4) return json({ ok: false, message: 'Le titre est trop court.' }, 400);
  if (texte.length < 40) return json({ ok: false, message: 'Votre avis doit faire au moins 40 caractères.' }, 400);

  /* Les photos arrivent soit en simple chaîne data:, soit en objet
     { d: "data:…", r: "avant" | "apres" | null }. On accepte les deux. */
  const brutes = Array.isArray(d.photos) ? d.photos.slice(0, MAX_PHOTOS) : [];
  const images = [];
  let vuAvant = false, vuApres = false;
  for (const b of brutes) {
    const src = (typeof b === 'string') ? b : (b && b.d);
    let role = (typeof b === 'object' && b) ? b.r : null;
    if (role !== 'avant' && role !== 'apres') role = null;
    // un seul avant et un seul après : le second est simplement dégradé en photo normale
    if (role === 'avant') { if (vuAvant) role = null; else vuAvant = true; }
    if (role === 'apres') { if (vuApres) role = null; else vuApres = true; }
    const im = imageValide(src);
    if (!im) return json({ ok: false, message: "Une des photos n'a pas pu être lue. Réessayez avec une autre image." }, 400);
    im.role = role;
    images.push(im);
  }

  let store, photos;
  try {
    store = getStore({ name: 'avis', consistency: 'strong' });
    photos = getStore({ name: 'avis-photos' });
  } catch (e) {
    return json({ ok: false, message: "Le service d'avis n'est pas disponible pour le moment." }, 503);
  }

  /* --- limitation par IP --- */
  const ip = (req.headers.get('x-nf-client-connection-ip')
    || (req.headers.get('x-forwarded-for') || '').split(',')[0]
    || (context && context.ip) || 'inconnue').trim();
  const cleJour = 'rl/' + (await empreinte(ip)) + '-' + new Date().toISOString().slice(0, 10);
  try {
    const n = parseInt((await store.get(cleJour)) || '0', 10);
    if (n >= MAX_PAR_JOUR) {
      return json({ ok: false, message: 'Vous avez déjà déposé plusieurs avis aujourd\'hui. Réessayez demain.' }, 429);
    }
    await store.set(cleJour, String(n + 1));
  } catch (e) { /* si la limitation échoue, on laisse passer plutôt que de bloquer un vrai client */ }

  /* --- enregistrement --- */
  const id = 'av_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  const cles = [];
  try {
    for (let i = 0; i < images.length; i++) {
      const cle = id + '_' + i + '.' + images[i].ext;
      await photos.set(cle, images[i].octets, { metadata: { type: images[i].type } });
      cles.push({ c: cle, r: images[i].role });
    }
  } catch (e) {
    return json({ ok: false, message: "Les photos n'ont pas pu être enregistrées. Réessayez sans photo." }, 500);
  }

  const maintenant = new Date().toISOString();
  const avis = {
    id,
    statut: 'en_attente',
    note, criteres, prenom, initiale, email, modele, type, produit, titre, texte,
    photos: cles,
    verifie: false,                      // passera à true si un jeton de commande est fourni
    jeton: propre(d.jeton, 64) || null,
    dateExperience: maintenant.slice(0, 10),
    datePublication: null,
    reponse: null,
    utile: 0,
    motifRefus: null,
    cree: maintenant
  };

  try {
    await store.setJSON('a/' + id, avis);
  } catch (e) {
    return json({ ok: false, message: "L'avis n'a pas pu être enregistré. Réessayez dans un instant." }, 500);
  }

  await prevenir(avis);
  return json({ ok: true, id });
};
