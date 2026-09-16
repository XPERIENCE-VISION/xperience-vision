/* ==========================================================================
   GET /.netlify/functions/avis-photo?c=<clé>
   Sert une photo d'avis stockée dans Netlify Blobs.
   Les clés sont opaques et générées par avis-envoyer : on refuse tout ce qui
   ne ressemble pas exactement à une clé attendue (pas de chemin, pas de « .. »).
   ========================================================================== */
import { getStore } from '@netlify/blobs';

const CLE_OK = /^av_[a-z0-9]+_[a-z0-9]+_\d\.(jpg|png|webp)$/i;

export default async (req) => {
  if (req.method !== 'GET') return new Response('Méthode non autorisée', { status: 405 });

  const cle = new URL(req.url).searchParams.get('c') || '';
  if (!CLE_OK.test(cle)) return new Response('Clé invalide', { status: 400 });

  let store;
  try { store = getStore({ name: 'avis-photos' }); }
  catch (e) { return new Response('Stockage indisponible', { status: 503 }); }

  let res;
  try { res = await store.getWithMetadata(cle, { type: 'arrayBuffer' }); }
  catch (e) { return new Response('Erreur de lecture', { status: 500 }); }

  if (!res || !res.data) return new Response('Photo introuvable', { status: 404 });

  const type = (res.metadata && res.metadata.type) || 'image/jpeg';
  return new Response(res.data, {
    status: 200,
    headers: {
      'content-type': type,
      // les clés sont uniques et ne sont jamais réécrites : cache très long
      'cache-control': 'public, max-age=31536000, immutable',
      'x-content-type-options': 'nosniff'
    }
  });
};
