/* ==========================================================================
   GET  /.netlify/functions/avis-liste        → les avis PUBLIÉS + le résumé
   POST /.netlify/functions/avis-liste?utile=<id> → incrémente « cet avis m'a été utile »

   Ne renvoie JAMAIS d'e-mail, d'adresse IP ni d'avis en attente.
   ========================================================================== */
import { getStore } from '@netlify/blobs';

const VIDE = { avis: [], resume: { total: 0, moyenne: 0, repartition: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, avecPhoto: 0, criteres: {} } };

function json(corps, statut = 200, entetes = {}) {
  return new Response(JSON.stringify(corps), {
    status: statut,
    headers: { 'content-type': 'application/json; charset=utf-8', ...entetes }
  });
}

export default async (req) => {
  let store;
  try {
    store = getStore({ name: 'avis', consistency: 'strong' });
  } catch (e) {
    // Blobs non configuré : on renvoie un catalogue vide plutôt qu'une erreur,
    // pour que la page s'affiche proprement au lieu de casser.
    return json(VIDE, 200, { 'cache-control': 'no-store' });
  }

  /* ---------- vote « utile » ---------- */
  if (req.method === 'POST') {
    const id = new URL(req.url).searchParams.get('utile');
    if (!id || !/^av_[a-z0-9_]+$/i.test(id)) return json({ ok: false }, 400);
    try {
      const u = (await store.get('utiles.json', { type: 'json' })) || {};
      u[id] = (u[id] || 0) + 1;
      await store.setJSON('utiles.json', u);
      return json({ ok: true, utile: u[id] });
    } catch (e) {
      return json({ ok: false }, 500);
    }
  }

  if (req.method !== 'GET') return json({ ok: false, message: 'Méthode non autorisée' }, 405);

  /* ---------- lecture ---------- */
  try {
    const pub = (await store.get('public.json', { type: 'json' })) || VIDE;
    const utiles = (await store.get('utiles.json', { type: 'json' })) || {};

    const avis = (pub.avis || []).map((a) => ({ ...a, utile: (a.utile || 0) + (utiles[a.id] || 0) }));

    return json(
      { avis, resume: pub.resume || VIDE.resume },
      200,
      { 'cache-control': 'public, max-age=60, stale-while-revalidate=600' }
    );
  } catch (e) {
    return json(VIDE, 200, { 'cache-control': 'no-store' });
  }
};
