/* ============================================================
   CONCESSIONS — XPERIENCE VISION
   Data provider léger : expose window.XVConcessions.load() pour récupérer
   la liste depuis data/concessions.json. Consommé par le dropdown du
   formulaire pré-commande (dans catalogue.js).
   ============================================================ */

(function () {
    'use strict';

    let cache = null;

    async function load() {
        if (cache) return cache;
        try {
            const r = await fetch('data/concessions.json');
            const data = await r.json();
            cache = data.concessions || [];
        } catch (err) {
            console.error('[XV] Impossible de charger concessions.json', err);
            cache = [];
        }
        return cache;
    }

    function get(id) {
        if (!cache) return null;
        return cache.find(c => c.id === id) || null;
    }

    window.XVConcessions = { load, get };
})();
