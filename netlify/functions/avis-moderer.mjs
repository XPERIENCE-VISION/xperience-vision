/* ==========================================================================
   /.netlify/functions/avis-moderer      — RÉSERVÉ À L'ADMINISTRATEUR

   GET  ?etat=en_attente|publie|refuse   → la file correspondante
   POST { id, action, motif?, reponse? } → publier | refuser | repondre | supprimer
   POST { action:'importer', avis:[…] }  → reprise des avis déjà en ligne
   POST { id, action:'modifier', … }     → corriger titre / texte / note / critères
   POST { id, action:'photo-ajouter', photo, role? }  → ajouter une photo
   POST { id, action:'photo-role', cle, role }        → marquer avant / après
   POST { id, action:'photo-retirer', cle }           → retirer UNE photo

   Aucune action ne supprime une photo sans qu'on la lui demande nommément.

   Protection : en-tête  x-avis-cle  qui doit valoir la variable
   d'environnement AVIS_CLE_ADMIN. Sans cette variable, la fonction refuse
   tout — on ne laisse jamais une porte ouverte par défaut.
   ========================================================================== */
import { getStore } from '@netlify/blobs';

const MOTIFS = [
  'Contenu promotionnel ou spam',
  'Propos injurieux ou discriminatoires',
  'Sans rapport avec le produit ou la prestation',
  'Aucune commande correspondante',
  'Données personnelles d\'un tiers',
  'Photo hors sujet'
];

const MAX_OCTETS_PHOTO = 4 * 1024 * 1024;

/* Même contrôle que côté dépôt : on vérifie les octets d'en-tête,
   jamais le type annoncé. */
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

/* Les anciens avis stockent photos: ["cle", …], les nouveaux
   photos: [{c, r}, …]. On normalise sans jamais rien perdre. */
function normPhotos(a) {
  return (a.photos || []).map((p) => (typeof p === 'string' ? { c: p, r: null } : { c: p.c, r: p.r || null }))
    .filter((p) => p.c);
}

function json(corps, statut = 200) {
  return new Response(JSON.stringify(corps), {
    status: statut,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  });
}

/* Comparaison à durée constante : évite de révéler la clé caractère par caractère. */
function memeCle(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/* Recalcule public.json à partir de tous les avis publiés.
   C'est ce fichier unique que lit avis-liste : une seule lecture côté visiteur. */
async function reconstruirePublic(store) {
  const { blobs } = await store.list({ prefix: 'a/' });
  const publies = [];
  for (const b of blobs) {
    const a = await store.get(b.key, { type: 'json' });
    if (a && a.statut === 'publie') publies.push(a);
  }
  publies.sort((x, y) => new Date(y.datePublication || 0) - new Date(x.datePublication || 0));

  const CRITERES = ['produit', 'delai', 'pose', 'prix', 'relation'];
  const resume = {
    total: publies.length, moyenne: 0,
    repartition: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    avecPhoto: 0, criteres: {}
  };
  let somme = 0;
  const cumul = {};
  for (const a of publies) {
    somme += a.note;
    resume.repartition[a.note] = (resume.repartition[a.note] || 0) + 1;
    if ((a.photos || []).length) resume.avecPhoto++;
    for (const c of CRITERES) {
      const v = a.criteres && a.criteres[c];
      if (!(v >= 1 && v <= 5)) continue;
      cumul[c] = cumul[c] || { s: 0, n: 0 };
      cumul[c].s += v; cumul[c].n++;
    }
  }
  if (publies.length) resume.moyenne = Math.round((somme / publies.length) * 10) / 10;
  for (const c of CRITERES) {
    if (cumul[c]) resume.criteres[c] = { moy: Math.round((cumul[c].s / cumul[c].n) * 10) / 10, n: cumul[c].n };
  }

  // version publique : ni e-mail, ni jeton, ni motif de refus
  const avis = publies.map((a) => ({
    id: a.id, note: a.note, criteres: a.criteres || null, prenom: a.prenom, initiale: a.initiale,
    modele: a.modele, type: a.type, produit: a.produit,
    titre: a.titre, texte: a.texte,
    photos: (a.photos || []).map((p) => (typeof p === 'string'
      ? { c: p, r: null, w: null }
      : { c: p.c, r: p.r || null, w: p.w || null })),
    origine: a.origine || null, refSocle: a.refSocle || null,
    verifie: !!a.verifie, dateExperience: a.dateExperience,
    datePublication: a.datePublication, reponse: a.reponse || null, utile: a.utile || 0
  }));

  await store.setJSON('public.json', { avis, resume, maj: new Date().toISOString() });
  return resume;
}

export default async (req) => {
  const attendue = process.env.AVIS_CLE_ADMIN;
  if (!attendue) {
    return json({ ok: false, message: "AVIS_CLE_ADMIN n'est pas définie sur Netlify. Modération désactivée." }, 503);
  }
  if (!memeCle(req.headers.get('x-avis-cle') || '', attendue)) {
    return json({ ok: false, message: 'Clé invalide.' }, 401);
  }

  let store, photos;
  try {
    store = getStore({ name: 'avis', consistency: 'strong' });
    photos = getStore({ name: 'avis-photos' });
  } catch (e) {
    return json({ ok: false, message: 'Stockage indisponible.' }, 503);
  }

  /* ---------------- lecture d'une file ---------------- */
  if (req.method === 'GET') {
    const etat = new URL(req.url).searchParams.get('etat') || 'en_attente';
    const { blobs } = await store.list({ prefix: 'a/' });
    const liste = [];
    for (const b of blobs) {
      const a = await store.get(b.key, { type: 'json' });
      if (a && a.statut === etat) liste.push(a);
    }
    liste.sort((x, y) => new Date(y.cree || 0) - new Date(x.cree || 0));
    const { blobs: tous } = await store.list({ prefix: 'a/' });
    return json({ ok: true, etat, avis: liste, total: tous.length, motifs: MOTIFS });
  }

  if (req.method !== 'POST') return json({ ok: false, message: 'Méthode non autorisée' }, 405);

  /* ---------------- action ---------------- */
  let d;
  try { d = await req.json(); } catch (e) { return json({ ok: false, message: 'Requête illisible.' }, 400); }

  /* --- reprise des avis déjà présents sur le site ---------------------
     Les avis repris sont publiés directement, mais SANS la mention
     « Achat vérifié » : elle suppose un rattachement automatique à une
     commande, qui n'existe pas pour ces avis-là.                       */
  if (d.action === 'importer') {
    const entrants = Array.isArray(d.avis) ? d.avis.slice(0, 200) : [];
    if (!entrants.length) return json({ ok: false, message: 'Aucun avis à importer.' }, 400);
    let repris = 0, ignores = 0;
    for (const e of entrants) {
      const note = parseInt(e.note, 10);
      const titre = String(e.titre || '').trim().slice(0, 70);
      const texte = String(e.texte || '').trim().slice(0, 1000);
      const prenom = String(e.prenom || '').trim().slice(0, 40);
      if (!(note >= 1 && note <= 5) || !prenom || !texte) { ignores++; continue; }
      const id = 'av_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
      const quand = e.date ? new Date(e.date).toISOString() : new Date().toISOString();
      await store.setJSON('a/' + id, {
        id, statut: 'publie', note, prenom,
        initiale: String(e.initiale || '').slice(0, 1).toUpperCase(),
        email: '', modele: String(e.modele || '').slice(0, 40),
        type: String(e.type || '').slice(0, 40), produit: null,
        titre: titre || texte.slice(0, 60), texte, criteres: null,
        /* Les photos reprises sont référencées PAR CHEMIN, pas recopiées :
           les fichiers d'origine restent exactement où ils sont. */
        photos: (Array.isArray(e.photos) ? e.photos : []).slice(0, 6).map((ph) => {
          const c = String(typeof ph === 'string' ? ph : (ph && ph.c) || '').trim().slice(0, 200);
          const r = (ph && ph.r === 'avant') || (ph && ph.r === 'apres') ? ph.r : null;
          return c && /^(img|assets|photos|medias?)\/[\w./-]+$/i.test(c) ? { c, r } : null;
        }).filter(Boolean),
        verifie: false, jeton: null, origine: 'repris-du-site',
        /* Référence vers l'avis d'origine dans data/reviews.json : tant qu'elle
           est là, l'avis du fichier n'est plus affiché en double. */
        refSocle: String(e.refSocle || '').slice(0, 40) || null,
        dateExperience: quand.slice(0, 10), datePublication: quand,
        reponse: null, utile: 0, motifRefus: null, cree: quand
      });
      repris++;
      await new Promise((r) => setTimeout(r, 2));   // identifiants distincts
    }
    const resume = await reconstruirePublic(store);
    return json({ ok: true, repris, ignores, resume });
  }

  const id = String(d.id || '');
  if (!/^av_[a-z0-9_]+$/i.test(id)) return json({ ok: false, message: 'Identifiant invalide.' }, 400);

  const avis = await store.get('a/' + id, { type: 'json' });
  if (!avis) return json({ ok: false, message: 'Avis introuvable.' }, 404);

  switch (d.action) {
    case 'publier':
      avis.statut = 'publie';
      avis.datePublication = new Date().toISOString();
      avis.motifRefus = null;
      if (typeof d.verifie === 'boolean') avis.verifie = d.verifie;
      break;

    case 'refuser':
      avis.statut = 'refuse';
      avis.datePublication = null;
      avis.motifRefus = String(d.motif || '').slice(0, 120) || 'Non précisé';
      break;

    case 'repondre': {
      const t = String(d.reponse || '').trim().slice(0, 600);
      avis.reponse = t ? { texte: t, date: new Date().toISOString() } : null;
      break;
    }

    case 'modifier': {
      /* Correction éditoriale. On ne touche qu'aux champs explicitement
         fournis : tout ce qui n'est pas envoyé reste tel quel. */
      if (typeof d.titre === 'string') avis.titre = d.titre.trim().slice(0, 70);
      if (typeof d.texte === 'string') avis.texte = d.texte.trim().slice(0, 1000);
      if (typeof d.modele === 'string') avis.modele = d.modele.trim().slice(0, 40);
      if (typeof d.type === 'string') avis.type = d.type.trim().slice(0, 40);
      if (typeof d.prenom === 'string' && d.prenom.trim()) avis.prenom = d.prenom.trim().slice(0, 40);
      if (typeof d.initiale === 'string') avis.initiale = d.initiale.trim().slice(0, 1).toUpperCase();
      const n = parseInt(d.note, 10);
      if (n >= 1 && n <= 5) avis.note = n;
      if (d.criteres && typeof d.criteres === 'object') {
        const c = {};
        for (const k of ['produit', 'delai', 'pose', 'prix', 'relation']) {
          const v = parseInt(d.criteres[k], 10);
          if (v >= 1 && v <= 5) c[k] = v;
        }
        avis.criteres = Object.keys(c).length ? c : null;
      }
      avis.modifieLe = new Date().toISOString();
      break;
    }

    case 'photo-ajouter': {
      const l = normPhotos(avis);
      if (l.length >= 6) return json({ ok: false, message: 'Six photos maximum par avis.' }, 400);
      const im = imageValide(d.photo);
      if (!im) return json({ ok: false, message: "Cette image n'a pas pu être lue." }, 400);
      let role = (d.role === 'avant' || d.role === 'apres') ? d.role : null;
      if (role && l.some((p) => p.r === role)) role = null;   // un seul de chaque
      const cle = avis.id + '_m' + Date.now().toString(36) + '.' + im.ext;
      await photos.set(cle, im.octets, { metadata: { type: im.type } });
      avis.photos = l.concat([{ c: cle, r: role }]);
      break;
    }

    case 'photo-role': {
      const l = normPhotos(avis);
      const cible = String(d.cle || '');
      if (!l.some((p) => p.c === cible)) return json({ ok: false, message: 'Photo introuvable.' }, 404);
      let role = (d.role === 'avant' || d.role === 'apres') ? d.role : null;
      avis.photos = l.map((p) => {
        if (p.c === cible) return { c: p.c, r: role };
        if (role && p.r === role) return { c: p.c, r: null };  // le rôle est exclusif
        return p;
      });
      break;
    }

    case 'photo-retirer': {
      const l = normPhotos(avis);
      const cible = String(d.cle || '');
      if (!l.some((p) => p.c === cible)) return json({ ok: false, message: 'Photo introuvable.' }, 404);
      avis.photos = l.filter((p) => p.c !== cible);
      try { await photos.delete(cible); } catch (e) { }
      break;
    }

    case 'supprimer': {
      // suppression définitive, à la demande du client (droit RGPD)
      for (const ph of normPhotos(avis)) { try { await photos.delete(ph.c); } catch (e) { } }
      await store.delete('a/' + id);
      const r = await reconstruirePublic(store);
      return json({ ok: true, supprime: true, resume: r });
    }

    default:
      return json({ ok: false, message: 'Action inconnue.' }, 400);
  }

  await store.setJSON('a/' + id, avis);
  const resume = await reconstruirePublic(store);
  return json({ ok: true, avis, resume });
};
