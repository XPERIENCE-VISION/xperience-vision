/* ==========================================================================
   XPERIENCE VISION — Avis clients (côté navigateur) — V5
   Autonome, sans dépendance, sans framework.

   Trois surfaces :
     · la page dédiée  /avis        → #xva-page
     · la section d'accueil #avis   → #xva-section
     · un encart court              → [data-xva-encart]
   Le script ne fait rien si aucun conteneur n'est présent.
   ========================================================================== */
(function () {
  'use strict';

  var API = '/.netlify/functions/avis-liste';
  var API_ENVOI = '/.netlify/functions/avis-envoyer';
  var PHOTO = '/.netlify/functions/avis-photo?c=';
  /* Le SOCLE : le fichier d'avis historique du site. Il reste la source de
     vérité pour les avis qui y figurent — on ne les copie pas, on ne les
     déplace pas, on les lit là où ils sont. Les avis déposés par les clients
     s'ajoutent par-dessus, via les fonctions. Si le fichier n'existe pas ou
     si les fonctions ne répondent pas, l'autre couche fonctionne quand même. */
  var SOCLE = '/data/reviews.json';
  var PAR_PAGE = 12;

  /* Le mur « Les photos de nos clients » ne montre QUE les photos envoyées par
     les clients eux-mêmes. Les photos du socle sont des pages de brochure : elles
     restent visibles sur la carte de leur avis, mais elles n'ont rien à faire dans
     un mur qui promet des photos prises par les clients.
     Passer à true les y fait entrer — mais il faut alors corriger le titre et le
     sous-titre du mur dans avis.html, qui ne seraient plus exacts. */
  var MUR_SOCLE = false;

  /* ------------------------------------------------------------- véhicules
     Nos écrans ne sont pas réservés à une marque : les avis actuels parlent
     déjà de Porsche, Mercedes, DS, Renault et Seres autant que de BYD.

     Cette liste n'est qu'une AIDE À LA SAISIE — des suggestions proposées au
     client pendant qu'il tape. Elle ne restreint rien : le champ reste libre,
     et un véhicule absent d'ici s'enregistre sans problème. Les filtres du
     site, eux, ne lisent jamais cette liste : ils sont construits à partir
     des véhicules réellement présents dans les avis.

     Pour équiper une marque de plus, il suffit d'ajouter ses modèles ici.
     Rien d'autre à toucher, nulle part. */
  var VEHICULES = [
    'BYD Dolphin', 'BYD Atto 2', 'BYD Atto 3', 'BYD Seal', 'BYD Seal U', 'BYD Sealion 7',
    'Tesla Model 3', 'Tesla Model Y',
    'Mercedes GLC', 'Mercedes Classe C', 'Mercedes EQB',
    'Porsche Cayenne', 'Porsche Macan',
    'Renault Espace', 'Renault Austral', 'Renault Scenic',
    'Peugeot 3008', 'Peugeot 5008', 'Peugeot 208',
    'DS 7 Crossback', 'DS 4',
    'Audi Q5', 'Audi Q7', 'BMW X3', 'BMW X5',
    'Volkswagen Tiguan', 'Volkswagen ID.4',
    'Seres 3', 'MG ZS', 'Kia EV6', 'Hyundai Tucson'
  ];

  /* Marques dont le nom fait plus d'un mot : sans cette liste, « Land Rover
     Discovery » serait rangé sous la marque « Land ». */
  var MARQUES_COMPOSEES = ['Land Rover', 'Alfa Romeo', 'Mercedes-Benz', 'Aston Martin', 'Rolls-Royce'];

  /* Deux écritures d'une même marque ne doivent pas faire deux pastilles.
     Le client écrit ce qu'il veut ; c'est ici qu'on réconcilie. */
  var ALIAS_MARQUES = { 'mercedes-benz': 'Mercedes', 'vw': 'Volkswagen', 'citroen': 'Citroën' };

  /* La marque se déduit du véhicule saisi. Aucune marque n'est privilégiée. */
  function marqueDe(vehicule) {
    var v = String(vehicule || '').trim();
    if (!v) return '';
    var m = '';
    for (var i = 0; i < MARQUES_COMPOSEES.length; i++) {
      if (v.toLowerCase().indexOf(MARQUES_COMPOSEES[i].toLowerCase()) === 0) { m = MARQUES_COMPOSEES[i]; break; }
    }
    if (!m) m = v.split(/\s+/)[0];
    return ALIAS_MARQUES[m.toLowerCase()] || m;
  }

  var TYPES = ["Installation d'écran", 'Accessoire véhicule', 'Pack exclusif', 'Conseil / SAV'];
  var MOTS = { 1: 'Très déçu', 2: 'Décevant', 3: 'Correct', 4: 'Bien', 5: 'Excellent' };

  /* Notes de détail. « pose » n'est proposée que pour une prestation posée :
     demander la qualité de la pose sur un tapis de coffre n'aurait pas de sens. */
  var CRITERES = [
    { cle: 'produit', nom: 'Qualité du produit' },
    { cle: 'delai', nom: 'Respect des délais' },
    { cle: 'pose', nom: 'Qualité de la pose', types: ["Installation d'écran", 'Pack exclusif'] },
    { cle: 'prix', nom: 'Rapport qualité-prix' },
    { cle: 'relation', nom: 'Relation client' }
  ];

  /* Thèmes détectés automatiquement dans le texte des avis : chaque thème
     compte le nombre d'avis qui emploient l'un de ses mots. Rien n'est saisi
     à la main, donc rien ne peut être maquillé. */
  var THEMES = [
    { cle: 'pose', nom: 'Qualité de la pose', mots: ['pose', 'posé', 'install', 'montage', 'monté', 'technicien', 'atelier'] },
    { cle: 'delai', nom: 'Délais', mots: ['délai', 'delai', 'rapide', 'vite', 'attente', 'livr', 'expédi', 'expedi'] },
    { cle: 'finition', nom: 'Finition', mots: ['finition', 'propre', 'nickel', 'impeccable', 'soigné', 'soigne', 'ajust', 'découpe', 'decoupe'] },
    { cle: 'conseil', nom: 'Conseil', mots: ['conseil', 'réponse', 'reponse', 'accueil', 'écoute', 'ecoute', 'explique', 'sav'] },
    { cle: 'qualite', nom: 'Qualité du produit', mots: ['qualité', 'qualite', 'solide', 'robuste', 'matériau', 'materiau', 'résist', 'resist'] },
    { cle: 'prix', nom: 'Rapport qualité-prix', mots: ['prix', 'tarif', 'cher', 'rapport'] }
  ];

  /* ---------------------------------------------------------------- outils */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function jour(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    if (isNaN(d)) return '';
    return ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();
  }
  function fr(n) { return String(n).replace('.', ','); }
  /* une note s'écrit toujours avec une décimale : « 5,0 » et non « 5 »,
     sinon la colonne de chiffres n'est plus alignée. */
  function note1(n) { return Number(n).toFixed(1).replace('.', ','); }
  function sansAccent(t) {
    return String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  function calme() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function etoiles(n, classe) {
    var h = '<span class="xva-stars ' + (classe || '') + '" role="img" aria-label="' + n + ' sur 5">';
    for (var i = 1; i <= 5; i++) {
      h += '<svg viewBox="0 0 24 24" class="' + (i <= n ? 'xva-sf' : 'xva-se') + '" aria-hidden="true">'
        + '<path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
    }
    return h + '</span>';
  }
  /* Les photos peuvent arriver sous deux formes : une simple clé (ancien
     format) ou un objet {c: clé, r: 'avant'|'apres'}. On normalise une fois
     pour toutes, pour que le reste du code n'ait jamais à s'en soucier. */
  function photos(a) {
    return (a && a.photos ? a.photos : []).map(function (p) {
      return (typeof p === 'string')
        ? { c: p, r: null, w: null }
        : { c: p.c, r: p.r || null, w: p.w || null };
    }).filter(function (p) { return p.c; });
  }

  /* Le site historique sert ses photos en <picture> : WebP d'abord, JPEG en
     repli. On conserve exactement ce comportement pour ces photos-là. */
  function baliseImage(p, alt, classe) {
    var img = '<img loading="lazy" decoding="async" src="' + urlPhoto(p.c) + '" alt="' + esc(alt) + '"'
      + (classe ? ' class="' + classe + '"' : '') + '>';
    if (!p.w) return img;
    return '<picture><source srcset="' + urlPhoto(p.w) + '" type="image/webp">' + img + '</picture>';
  }
  function paireAB(a) {
    var l = photos(a);
    var av = l.filter(function (p) { return p.r === 'avant'; })[0];
    var ap = l.filter(function (p) { return p.r === 'apres'; })[0];
    return (av && ap) ? { avant: av, apres: ap, reste: l.filter(function (p) { return p !== av && p !== ap; }) } : null;
  }
  /* Trois formes de photo cohabitent :
       · une clé de stockage       → "av_xxx_0.jpg"      → servie par la fonction
       · un fichier déjà sur le site → "img/xxx.jpeg"     → servi tel quel
       · une URL ou une image inline → "https://…", "data:…"
     Les avis repris de l'ancien système utilisent la deuxième forme : leurs
     photos restent où elles sont, on ne les déplace ni ne les recopie. */
  function urlPhoto(c) {
    if (/^(data:|https?:|\/)/.test(c)) return c;
    if (/^(img|assets|photos|medias?)\//i.test(c)) return '/' + c;
    return PHOTO + encodeURIComponent(c);
  }

  var ICO = {
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>',
    pouce: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 21h2V9H2zm19.83-9.88A2 2 0 0 0 20 9h-5.5l.83-4.03.03-.28a1.5 1.5 0 0 0-.44-1.06L14 2.5 7.6 8.9A2 2 0 0 0 7 10.3V19a2 2 0 0 0 2 2h8a2 2 0 0 0 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73z"/></svg>',
    lien: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.9 12a3.1 3.1 0 0 1 3.1-3.1h4V7H7a5 5 0 0 0 0 10h4v-1.9H7A3.1 3.1 0 0 1 3.9 12M8 13h8v-2H8zm9-6h-4v1.9h4a3.1 3.1 0 0 1 0 6.2h-4V17h4a5 5 0 0 0 0-10"/></svg>',
    loupe: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"/></svg>',
    bouclier: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9z"/></svg>',
    cle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.7 19 13.6 9.9A7 7 0 0 0 4.3 1.3l4 4-2.9 2.9-4-4A7 7 0 0 0 9.9 13.6l9.1 9.1a1 1 0 0 0 1.4 0l2.3-2.3a1 1 0 0 0 0-1.4"/></svg>'
  };

  /* Le badge dépend de ce que l'avis concerne : on a posé quelque chose dans
     la voiture, ou on a livré un produit. Deux réalités différentes, deux
     mentions différentes. Aucun badge si rien n'a été vérifié. */
  function badge(a) {
    if (!a.verifie) return '';
    var pose = a.type === "Installation d'écran" || a.type === 'Pack exclusif';
    return pose
      ? '<span class="xva-badge xva-badge-pose">' + ICO.cle + 'Installation vérifiée</span>'
      : '<span class="xva-badge xva-badge-achat">' + ICO.bouclier + 'Achat vérifié</span>';
  }

  /* ------------------------------------------------------------- état local */
  var E = {
    avis: [], resume: null, charge: false, erreur: null,
    filtreNote: null, filtrePhoto: false, filtreMarque: null, filtreTheme: null,
    recherche: '', tri: 'recent', page: 1,
    utiles: {}, deplies: {}
  };
  try { E.utiles = JSON.parse(localStorage.getItem('xva_utiles') || '{}'); } catch (e) { E.utiles = {}; }

  /* ----------------------------------------------------------- chargement  */
  /* L'appel peut avoir été lancé très tôt par un script en tête de page :
     on réutilise sa promesse plutôt que d'en refaire un. */
  /* Lit le fichier historique et le traduit dans le format interne.
     Ne jette jamais : s'il est absent ou illisible, on renvoie une liste vide. */
  function chargerSocle() {
    return fetch(SOCLE, { headers: { accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : { reviews: [] }; })
      .then(function (d) {
        return (Array.isArray(d.reviews) ? d.reviews : []).map(function (v) {
          var nom = String(v.auteur || '').trim();
          var m = /^(.+?)\s+([A-ZÀ-Ÿ])\.?$/.exec(nom);      // « Julien M. »
          var base = String(v.photo || '').trim();
          return {
            id: 'soc_' + (v.id || Math.random().toString(36).slice(2, 8)),
            origine: 'socle',
            note: parseInt(v.note, 10) || 5,
            prenom: m ? m[1] : (nom || 'Client'),
            initiale: m ? m[2] : '',
            modele: v.vehicule || '',
            type: '', produit: null, criteres: null,
            titre: '',                                       // ce format n'a pas de titre : on n'en invente pas
            texte: v.texte || '',
            photos: base ? [{ c: 'img/' + base + '.jpeg', w: 'img/' + base + '.webp', r: null }] : [],
            verifie: false,                                  // aucun rattachement à une commande : pas de badge
            dateExperience: v.date || null,
            datePublication: v.date || null,
            reponse: null, utile: 0
          };
        });
      })
      .catch(function () { return []; });
  }

  function charger() {
    var apiP = (window.__xvaPrecharge || fetch(API, { headers: { accept: 'application/json' } }))
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .catch(function (err) {
        if (window.console && console.warn) console.warn('[avis] fonctions indisponibles :', err.message);
        return { avis: [], resume: null };
      });

    return Promise.all([chargerSocle(), apiP])
      .then(function (res) {
        var socle = res[0];
        var d = res[1] || {};
        var nouveaux = Array.isArray(d.avis) ? d.avis : [];

        /* Si un avis du socle a déjà été repris dans le nouveau système,
           on n'affiche pas les deux : la version reprise fait foi. */
        var repris = {};
        nouveaux.forEach(function (a) { if (a.refSocle) repris[a.refSocle] = 1; });
        socle = socle.filter(function (a) { return !repris[a.id.replace(/^soc_/, '')]; });

        E.avis = nouveaux.concat(socle);
        E.resume = calculerResume(E.avis);
        E.charge = true;
      })
      .catch(function (err) {
        /* Les deux couches ont échoué. Le visiteur ne doit jamais lire un
           message technique : il voit l'état vide, normal et propre. */
        if (window.console && console.warn) console.warn('[avis] chargement impossible :', err.message);
        E.erreur = err.message; E.charge = true; E.avis = []; E.resume = calculerResume([]);
      });
  }

  function calculerResume(l) {
    var r = { total: l.length, moyenne: 0, repartition: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, avecPhoto: 0, criteres: {} };
    if (!l.length) return r;
    var s = 0;
    l.forEach(function (a) {
      s += a.note;
      r.repartition[a.note] = (r.repartition[a.note] || 0) + 1;
      if (photos(a).length) r.avecPhoto++;
    });
    r.moyenne = Math.round((s / l.length) * 10) / 10;
    return r;
  }

  /* Moyennes par critère, recalculées côté navigateur si le serveur ne les
     fournit pas encore (avis repris de l'ancien site, par exemple). */
  function criteresMoyens() {
    if (E.resume && E.resume.criteres && Object.keys(E.resume.criteres).length) {
      return CRITERES.map(function (c) {
        var v = E.resume.criteres[c.cle];
        return v && v.n ? { cle: c.cle, nom: c.nom, moy: v.moy, n: v.n } : null;
      }).filter(Boolean);
    }
    return CRITERES.map(function (c) {
      var vals = E.avis.map(function (a) { return a.criteres && a.criteres[c.cle]; })
        .filter(function (v) { return v >= 1 && v <= 5; });
      if (!vals.length) return null;
      var m = vals.reduce(function (x, y) { return x + y; }, 0) / vals.length;
      return { cle: c.cle, nom: c.nom, moy: Math.round(m * 10) / 10, n: vals.length };
    }).filter(Boolean);
  }

  function themesCalcules() {
    return THEMES.map(function (t) {
      var n = E.avis.filter(function (a) { return correspondTheme(a, t.cle); }).length;
      return { cle: t.cle, nom: t.nom, n: n };
    }).filter(function (t) { return t.n > 0; }).sort(function (a, b) { return b.n - a.n; });
  }
  function correspondTheme(a, cle) {
    var t = THEMES.filter(function (x) { return x.cle === cle; })[0];
    if (!t) return true;
    var txt = sansAccent((a.titre || '') + ' ' + (a.texte || ''));
    return t.mots.some(function (m) { return txt.indexOf(sansAccent(m)) !== -1; });
  }

  function filtres() {
    var l = E.avis.slice();
    if (E.filtreNote) l = l.filter(function (a) { return a.note === E.filtreNote; });
    if (E.filtrePhoto) l = l.filter(function (a) { return photos(a).length; });
    if (E.filtreMarque) l = l.filter(function (a) { return marqueDe(a.modele) === E.filtreMarque; });
    if (E.filtreTheme) l = l.filter(function (a) { return correspondTheme(a, E.filtreTheme); });
    if (E.recherche) {
      var q = sansAccent(E.recherche);
      l = l.filter(function (a) {
        return sansAccent([a.titre, a.texte, a.prenom, a.modele, a.type].join(' ')).indexOf(q) !== -1;
      });
    }
    if (E.tri === 'note') l.sort(function (x, y) { return y.note - x.note; });
    else if (E.tri === 'note_asc') l.sort(function (x, y) { return x.note - y.note; });
    else if (E.tri === 'photo') l.sort(function (x, y) { return photos(y).length - photos(x).length; });
    else if (E.tri === 'utile') l.sort(function (x, y) { return (y.utile || 0) - (x.utile || 0); });
    else l.sort(function (x, y) { return new Date(y.datePublication || 0) - new Date(x.datePublication || 0); });
    return l;
  }
  function filtreActif() {
    return !!(E.filtreNote || E.filtrePhoto || E.filtreMarque || E.filtreTheme || E.recherche);
  }

  /* -------------------------------------------------------------- gabarits */
  function carte(a) {
    var ab = paireAB(a);
    var liste = photos(a);
    var vignettes, comparateur = '';

    if (ab) {
      /* Une paire avant/après existe : on montre le comparateur à poignée,
         et on ne répète pas les deux mêmes images en dessous. */
      comparateur = '<div class="xva-ab" data-ab tabindex="0" role="slider" aria-label="Comparer avant et après"'
        + ' aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">'
        + baliseImage(ab.apres, 'Après, chez ' + a.prenom)
        + baliseImage(ab.avant, 'Avant, chez ' + a.prenom, 'xva-ab-av')
        + '<span class="xva-ab-poignee"></span>'
        + '<span class="xva-ab-lbl xva-ab-l1">Avant</span>'
        + '<span class="xva-ab-lbl xva-ab-l2">Après</span>'
        + '</div>'
        + '<p class="xva-ab-note">' + ICO.check + 'Photos envoyées par le client — faites glisser pour comparer</p>';
      liste = ab.reste;
    }

    var photosHtml = liste.map(function (p) {
      var i = photos(a).indexOf(p);
      return '<button class="xva-tile" data-lb="' + esc(a.id) + '" data-i="' + i + '" aria-label="Agrandir la photo">'
        + baliseImage(p, 'Photo · ' + a.prenom)
        + '</button>';
    }).join('');

    var long = (a.texte || '').length > 260;
    var ouvert = !!E.deplies[a.id];
    var corps = '<p class="xva-avis-txt' + (long && !ouvert ? ' xva-coupe' : '') + '">'
      + esc(a.texte).replace(/\n+/g, '<br>') + '</p>'
      + (long ? '<button class="xva-lire" data-lire="' + esc(a.id) + '">'
        + (ouvert ? 'Réduire' : 'Lire la suite') + '</button>' : '');

    /* Le détail par critère n'est montré que s'il dit quelque chose de plus
       que la note globale. Cinq fois « 5/5 » sous un avis 5 étoiles, c'est
       du bruit ; « Respect des délais 2/5 » sous un 4 étoiles, c'est utile. */
    var mini = '';
    if (a.criteres) {
      var dits = CRITERES.map(function (c) {
        var v = a.criteres[c.cle];
        return v ? { nom: c.nom, v: v } : null;
      }).filter(Boolean);
      var informe = dits.some(function (d) { return d.v !== a.note; });
      if (dits.length && informe) {
        mini = '<div class="xva-mini-crit">' + dits.map(function (d) {
          return '<span' + (d.v < a.note ? ' class="xva-bas"' : '') + '>'
            + esc(d.nom) + ' <b>' + d.v + '/5</b></span>';
        }).join('') + '</div>';
      }
    }

    return '<article class="xva-avis xva-rev" id="' + esc(a.id) + '">'
      + '<div class="xva-avis-top">'
      + '<div class="xva-av" aria-hidden="true">' + esc((a.prenom || '?').charAt(0).toUpperCase()) + '</div>'
      + '<div class="xva-qui">'
      + '<div class="xva-nom">' + esc(a.prenom) + (a.initiale ? ' ' + esc(a.initiale) + '.' : '')
      + badge(a)
      + '</div>'
      + '<div class="xva-sous">' + (a.modele ? esc(a.modele) + ' · ' : '')
      + (a.dateExperience ? 'expérience du ' + jour(a.dateExperience) : '') + '</div>'
      + '</div></div>'
      + etoiles(a.note)
      + (a.titre ? '<h3 class="xva-avis-titre">' + esc(a.titre) + '</h3>' : '')
      + corps
      + mini
      + comparateur
      + (photosHtml ? '<div class="xva-avis-photos">' + photosHtml + '</div>' : '')
      + (a.reponse && a.reponse.texte
        ? '<div class="xva-rep"><b>' + ICO.check + 'Réponse de XPERIENCE VISION</b>' + esc(a.reponse.texte) + '</div>' : '')
      + '<div class="xva-avis-bas">'
      + '<span>Publié le ' + jour(a.datePublication) + '</span>'
      + '<span style="display:flex;gap:6px;align-items:center">'
      + '<button class="xva-lien" data-copier="' + esc(a.id) + '" aria-label="Copier le lien de cet avis">' + ICO.lien + '</button>'
      + '<button class="xva-utile' + (E.utiles[a.id] ? ' xva-on' : '') + '" data-utile="' + esc(a.id) + '">'
      + ICO.pouce + 'Utile<em style="font-style:normal;opacity:.7"> · ' + ((a.utile || 0) + (E.utiles[a.id] ? 1 : 0)) + '</em></button>'
      + '</span></div></article>';
  }

  function vide() {
    if (!E.avis.length) {
      return '<div class="xva-vide"><b>Aucun avis publié pour le moment</b>'
        + 'Soyez le premier à raconter votre expérience.</div>';
    }
    return '<div class="xva-vide"><b>Aucun avis ne correspond</b>'
      + 'Retirez un filtre ou modifiez votre recherche pour voir plus d\'avis.</div>';
  }

  /* ------------------------------------------------------------ rendu page */
  function compteur(el, cible) {
    if (!el) return;
    if (calme() || !cible) { el.textContent = cible ? note1(cible) : '—'; return; }
    var t0 = null, duree = 850;
    function pas(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / duree, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = note1(cible * e);
      if (p < 1) requestAnimationFrame(pas);
    }
    requestAnimationFrame(pas);
  }

  function peindreRepartition(racine) {
    var r = E.resume;
    var di = $('[data-xva=dist]', racine);
    if (!di) return;
    di.innerHTML = [5, 4, 3, 2, 1].map(function (n) {
      var c = r.repartition[n] || 0;
      var p = r.total ? Math.round(c / r.total * 100) : 0;
      return '<button class="xva-dist-row' + (E.filtreNote === n ? ' xva-on' : '') + '" data-note="' + n + '" '
        + 'aria-pressed="' + (E.filtreNote === n) + '" aria-label="' + c + ' avis à ' + n + ' étoiles">'
        + '<span>' + n + ' ★</span><span class="xva-t"><i data-p="' + p + '"></i></span><em>' + c + '</em></button>';
    }).join('');
    requestAnimationFrame(function () {
      $$('.xva-dist-row .xva-t i', di).forEach(function (b) { b.style.width = b.dataset.p + '%'; });
    });
  }

  /* Les marques présentes dans les avis, avec leur nombre d'avis.
     Construit à chaque rendu : une marque de plus dans les avis = une pastille
     de plus, sans toucher au code. */
  function marquesPresentes() {
    var vus = {};
    E.avis.forEach(function (a) {
      var m = marqueDe(a.modele);
      if (m) vus[m] = (vus[m] || 0) + 1;
    });
    return Object.keys(vus)
      .sort(function (x, y) { return vus[y] - vus[x] || x.localeCompare(y, 'fr'); })
      .map(function (m) { return { nom: m, n: vus[m] }; });
  }

  function peindreMarques(racine) {
    var mo = $('[data-xva=marques]', racine) || $('[data-xva=modeles]', racine);
    if (!mo) return;
    /* On filtre par MARQUE, pas par modèle exact : c'est ce qui tient quand le
       catalogue de véhicules équipés s'allonge. Le modèle précis reste
       accessible par la recherche, qui cherche aussi dans ce champ. */
    var presentes = marquesPresentes();
    var bmo = mo.closest('.xva-ligne') || mo;
    /* Une seule marque : la pastille « Toutes » et son unique voisine ne
       filtrent rien. On masque plutôt que d'afficher un choix qui n'en est pas un. */
    if (presentes.length < 2) { bmo.style.display = 'none'; return; }
    bmo.style.display = '';
    mo.innerHTML = '<button class="xva-chip' + (E.filtreMarque ? '' : ' xva-on') + '" data-marque="">Toutes les marques</button>'
      + presentes.map(function (m) {
        return '<button class="xva-chip' + (E.filtreMarque === m.nom ? ' xva-on' : '') + '" data-marque="' + esc(m.nom) + '">'
          + esc(m.nom) + '<em>' + m.n + '</em></button>';
      }).join('');
  }

  /* Chiffres, notes par critère, avis en une et équilibrage du duo.
     Partagé par la page /avis ET par la section de la page d'accueil : sans ça,
     les mêmes conteneurs collés dans index.html resteraient vides. */
  function peindreBlocs(racine) {
    var r = E.resume;
    var st = $('[data-xva=stats]', racine);
    if (st) {
      var bien = E.avis.filter(function (a) { return a.note >= 4; }).length;
      var pct = r.total ? Math.round(bien / r.total * 100) : 0;
      st.innerHTML = [
        /* Le seul doré de cette rangée : c'est la note, donc il le mérite.
           Sur la page d'accueil, c'est même le seul endroit où le score apparaît. */
        ['<span class="xva-or-vrai">' + (r.total ? note1(r.moyenne) : '—') + '</span>', 'Note moyenne sur 5'],
        [r.total, r.total > 1 ? 'Avis publiés' : 'Avis publié'],
        [r.total ? pct + ' %' : '—', 'Notes de 4 étoiles et plus'],
        [r.avecPhoto, 'Avis avec photo']
      ].map(function (t) { return '<div class="xva-stat"><b>' + t[0] + '</b><span>' + t[1] + '</span></div>'; }).join('');
    }

    /* notes par critère */
    var cr = $('[data-xva=criteres]', racine);
    if (cr) {
      var lc = criteresMoyens();
      var bloc = cr.closest('.xva-crit');
      if (!lc.length) { if (bloc) bloc.style.display = 'none'; }
      else {
        if (bloc) bloc.style.display = '';
        cr.innerHTML = lc.map(function (c) {
          return '<div class="xva-crit-l">'
            + '<span class="xva-n">' + esc(c.nom) + '</span>'
            + '<span class="xva-v">' + note1(c.moy) + '</span>'
            + '<span class="xva-j"><i data-p="' + (c.moy / 5 * 100) + '"></i></span>'
            + '</div>';
        }).join('');
        var pied = $('[data-xva=criteres-pied]', racine);
        if (pied) {
          var n = lc.reduce(function (m, c) { return Math.max(m, c.n); }, 0);
          pied.textContent = 'Calculé sur ' + n + ' avis ayant détaillé leur note.';
        }
        requestAnimationFrame(function () {
          $$('.xva-crit-l .xva-j i', cr).forEach(function (b) { b.style.width = b.dataset.p + '%'; });
        });
      }
    }

    var une = $('[data-xva=une]', racine);
    if (une) {
      var cand = E.avis.filter(function (a) { return a.note === 5 && a.texte && a.texte.length > 60; })
        .sort(function (x, y) { return (y.utile || 0) - (x.utile || 0); })[0];
      var bu = une.closest('.xva-une');
      if (!cand) { if (bu) bu.style.display = 'none'; }
      else {
        if (bu) bu.style.display = '';
        var ex = cand.texte.length > 190 ? cand.texte.slice(0, 187).replace(/\s+\S*$/, '') + '…' : cand.texte;
        une.innerHTML = etoiles(5, 'xva-lg')
          + '<q>' + esc(ex) + '</q>'
          + '<p class="xva-une-qui"><b>' + esc(cand.prenom) + (cand.initiale ? ' ' + esc(cand.initiale) + '.' : '') + '</b>'
          + (cand.modele ? ' · ' + esc(cand.modele) : '') + '</p>';
      }
    }

    /* Le duo n'a de sens en deux colonnes que si ses deux blocs sont là. */
    var duo = $('.xva-duo', racine);
    if (duo) {
      var visibles = $$(':scope > *', duo).filter(function (e) { return e.style.display !== 'none'; });
      duo.classList.toggle('xva-solo', visibles.length < 2);
      duo.style.display = visibles.length ? '' : 'none';
    }
  }

  function rendrePage() {
    var racine = $('#xva-page');
    if (!racine) return;
    var r = E.resume;

    var hs = $('[data-xva=hero-score]', racine);
    if (hs) {
      hs.innerHTML = r.total ? '<b><span id="xva-cpt">0,0</span></b><i>/5</i>' : '<b>—</b>';
      if (r.total) compteur($('#xva-cpt'), r.moyenne);
    }
    var he = $('[data-xva=hero-stars]', racine);
    if (he) he.innerHTML = r.total ? etoiles(Math.round(r.moyenne), 'xva-xl') : '';
    var hm = $('[data-xva=hero-meta]', racine);
    if (hm) hm.innerHTML = r.total
      ? 'Sur <b>' + r.total + '</b> avis clients' + (r.avecPhoto ? ', dont <b>' + r.avecPhoto + '</b> avec photo' : '')
      : 'Les premiers avis arrivent bientôt';

    var bs = $('[data-xva=bar-score]');
    if (bs) bs.innerHTML = '<em>' + (r.total ? note1(r.moyenne) : '—') + '</em>' + etoiles(Math.round(r.moyenne), 'xva-xs');

    peindreBlocs(racine);

    var th = $('[data-xva=themes]', racine);
    if (th) {
      var lt = themesCalcules();
      th.innerHTML = lt.map(function (t) {
        return '<button class="xva-theme' + (E.filtreTheme === t.cle ? ' xva-on' : '') + '" data-theme="' + t.cle + '">'
          + esc(t.nom) + '<em>' + t.n + '</em></button>';
      }).join('');
      var bt = th.closest('.xva-sec');
      if (bt) bt.style.display = lt.length ? '' : 'none';
    }

    var mur = $('[data-xva=mur]', racine);
    if (mur) {
      var tuiles = [];
      E.avis.forEach(function (a) {
        if (!MUR_SOCLE && a.origine === 'socle') return;
        photos(a).forEach(function (p, i) {
          tuiles.push({ id: a.id, i: i, c: p.c, w: p.w, r: p.r, qui: a.prenom, mod: a.modele });
        });
      });
      var bm = mur.closest('.xva-sec');
      /* Un lien de la barre collante pointe vers ce bloc : s'il disparaît, le
         lien doit disparaître avec lui, sinon il mène dans le vide. */
      var lienMur = bm && bm.id ? $('.xva-navsec a[href="#' + bm.id + '"]') : null;
      if (lienMur) lienMur.style.display = tuiles.length ? '' : 'none';
      /* Le filet doré qui précède le bloc doit partir avec lui : sinon deux
         filets se retrouvent collés, avec du vide entre les deux. */
      var filetMur = bm && bm.previousElementSibling;
      if (filetMur && filetMur.classList.contains('xva-filet')) {
        filetMur.style.display = tuiles.length ? '' : 'none';
      }
      if (!tuiles.length) { if (bm) bm.style.display = 'none'; }
      else {
        if (bm) bm.style.display = '';
        mur.innerHTML = tuiles.slice(0, 12).map(function (t) {
          return '<button class="xva-tile" data-lb="' + esc(t.id) + '" data-i="' + t.i + '" aria-label="Agrandir la photo">'
            + baliseImage(t, 'Photo · ' + t.qui)
            + '<span class="xva-tile-cap">' + (t.r === 'avant' ? 'Avant · ' : t.r === 'apres' ? 'Après · ' : '')
            + esc(t.qui) + (t.mod ? ' · ' + esc(t.mod) : '') + '</span></button>';
        }).join('');
      }
    }

    peindreRepartition(racine);
    peindreMarques(racine);

    rendreListe(racine);
  }

  function rendreListe(racine) {
    racine = racine || $('#xva-page');
    var g = $('[data-xva=grille]', racine);
    if (!g) return;
    var l = filtres();
    var vus = l.slice(0, E.page * PAR_PAGE);
    g.innerHTML = vus.length ? vus.map(carte).join('') : vide();
    g.classList.toggle('xva-lourd', vus.length > 24);

    var c = $('[data-xva=compte]', racine);
    if (c) {
      c.textContent = l.length
        ? l.length + (l.length > 1 ? ' avis' : ' avis') + (l.length !== E.avis.length ? ' sur ' + E.avis.length : '')
        : 'Aucun résultat';
    }

    /* bouton « afficher plus » + jauge de progression */
    var zp = $('[data-xva=plus]', racine);
    if (zp) {
      if (vus.length >= l.length) zp.innerHTML = '';
      else {
        zp.innerHTML = '<div class="xva-plus-jauge"><i style="width:' + Math.round(vus.length / l.length * 100) + '%"></i></div>'
          + '<span>' + vus.length + ' avis sur ' + l.length + '</span>'
          + '<button class="xva-btn xva-btn-fant" data-plus>Afficher plus d\'avis</button>';
      }
    }

    /* pastilles de filtres actifs */
    var pa = $('[data-xva=actifs]', racine);
    if (pa) {
      var p = [];
      if (E.filtreNote) p.push(['note', E.filtreNote + ' étoile' + (E.filtreNote > 1 ? 's' : '')]);
      if (E.filtrePhoto) p.push(['photo', 'Avec photo']);
      if (E.filtreMarque) p.push(['marque', E.filtreMarque]);
      if (E.filtreTheme) {
        var t = THEMES.filter(function (x) { return x.cle === E.filtreTheme; })[0];
        p.push(['theme', t ? t.nom : E.filtreTheme]);
      }
      if (E.recherche) p.push(['recherche', '« ' + E.recherche + ' »']);
      pa.innerHTML = p.map(function (x) {
        return '<button class="xva-pastille" data-retirer="' + x[0] + '">' + esc(x[1]) + '<i aria-hidden="true">×</i>'
          + '<span class="xva-sr">Retirer ce filtre</span></button>';
      }).join('') + (p.length > 1 ? '<button class="xva-pastille" data-retirer="tout">Tout effacer<i aria-hidden="true">×</i></button>' : '');
    }

    var live = $('[data-xva=annonce]', racine);
    if (live) live.textContent = l.length + ' avis correspondent aux filtres.';

    observer();
  }

  /* --------------------------------------------------------- rendu section */
  function rendreSection() {
    var racine = $('#xva-section');
    if (!racine) return;
    var r = E.resume;
    var t = $('[data-xva=resume]', racine);
    if (t) t.innerHTML = r.total
      ? etoiles(Math.round(r.moyenne), 'xva-lg') + ' <b style="font-size:19px">' + note1(r.moyenne) + '/5</b>'
      + ' <span style="color:var(--xva-txt-3)">· ' + r.total + ' avis</span>'
      : '<span style="color:var(--xva-txt-3)">Les premiers avis arrivent bientôt</span>';

    /* Rien à montrer : la section entière s'efface plutôt que d'afficher
       une zone vide au milieu de la page d'accueil. */
    if (!r.total) {
      var hote = racine.closest('section') || racine;
      hote.style.display = 'none';
      return;
    }
    /* Les mêmes conteneurs que la page dédiée, s'ils ont été collés dans
       index.html : chiffres, notes par critère, avis en une. Chacun se masque
       seul s'il n'a rien à montrer. */
    peindreBlocs(racine);

    var g = $('[data-xva=apercu]', racine);
    if (g) {
      /* L'aperçu de la page d'accueil montre ce qui convainc le plus :
         d'abord un avant/après s'il y en a un, puis les avis avec photo,
         puis les plus utiles. C'est la vitrine, pas la liste complète. */
      var poids = function (a) { return paireAB(a) ? 2 : (photos(a).length ? 1 : 0); };
      var l = E.avis.slice().sort(function (x, y) {
        return poids(y) - poids(x)
          || (y.utile || 0) - (x.utile || 0)
          || new Date(y.datePublication || 0) - new Date(x.datePublication || 0);
      }).slice(0, 3);
      g.innerHTML = l.length ? l.map(carte).join('') : vide();
      observer();
    }
    var lien = $('[data-xva=lien-tous]', racine);
    if (lien && r.total) lien.textContent = 'Voir les ' + r.total + ' avis';
  }

  /* -------------------------------------------------------- encarts courts */
  function rendreEncarts() {
    var r = E.resume;
    $$('[data-xva-encart]').forEach(function (el) {
      var mode = el.getAttribute('data-xva-encart');
      var code = el.getAttribute('data-xva-produit');

      if (mode === 'produit' && code) {
        var l = E.avis.filter(function (a) { return a.produit === code; });
        if (!l.length) {
          el.innerHTML = '<div class="xva-encart-top" style="color:var(--xva-txt-3)">Aucun avis sur ce produit pour l\'instant.</div>'
            + '<div class="xva-encart-liens"><button data-xva-ouvrir data-xva-produit="' + esc(code) + '">Donner le premier avis</button></div>';
          return;
        }
        var moy = Math.round(l.reduce(function (s, a) { return s + a.note; }, 0) / l.length * 10) / 10;
        var ph = l.filter(function (a) { return photos(a).length; }).length;
        el.innerHTML = '<div class="xva-encart-top">' + etoiles(Math.round(moy), 'xva-xs')
          + ' <b>' + note1(moy) + '/5</b> <span style="color:var(--xva-txt-3)">· ' + l.length
          + ' avis' + (ph ? ', dont ' + ph + ' avec photo' : '') + '</span></div>'
          + '<div class="xva-encart-liens">'
          + '<a href="/avis?produit=' + encodeURIComponent(code) + '" style="color:var(--xva-or-clair);text-decoration:none;border-bottom:1px solid rgba(191,149,63,.35)">Lire les avis</a>'
          + '<button data-xva-ouvrir data-xva-produit="' + esc(code) + '">Donner mon avis sur ce produit</button>'
          + '</div>';
        return;
      }

      if (!r.total) { el.style.display = 'none'; return; }
      el.style.display = '';
      if (mode === 'mini') {
        el.innerHTML = etoiles(Math.round(r.moyenne), 'xva-xs')
          + ' <b>' + note1(r.moyenne) + '/5</b>'
          + ' <span>— ' + r.total + ' avis clients</span> <u>Lire les avis</u>';
      }
      if (mode === 'etoiles') {
        el.innerHTML = etoiles(Math.round(r.moyenne), 'xva-xs') + ' <span style="color:var(--xva-txt-3)">(' + r.total + ')</span>';
      }
    });
  }

  /* --------------------------------------------------------------- toast   */
  var minuteurToast;
  function toast(m) {
    var t = $('#xva-toast');
    if (!t) return;
    t.textContent = m; t.classList.add('xva-on');
    clearTimeout(minuteurToast);
    minuteurToast = setTimeout(function () { t.classList.remove('xva-on'); }, 2400);
  }

  /* Quelle zone est en train d'être manipulée : le panneau s'il est ouvert,
     sinon la page. Évite de repeindre deux fois ou au mauvais endroit. */
  function racineActive() { return panneauOuvert() ? PAN.el : ($('#xva-page') || document); }
  function raffraichir() {
    if (panneauOuvert()) rendrePanneau();
    else { rendrePage(); rendreSection(); }
  }

  /* ------------------------------------------------------------ événements */
  function brancher() {
    document.addEventListener('click', function (ev) {
      var t = ev.target.closest && ev.target.closest(
        '[data-note],[data-marque],[data-theme],[data-f],[data-utile],[data-lb],[data-xva-ouvrir],[data-plus],[data-lire],[data-copier],[data-retirer],[data-xva-tous]');
      if (!t) return;

      if (t.hasAttribute('data-xva-tous')) { ev.preventDefault(); ouvrirPanneau(); return; }

      if (t.hasAttribute('data-xva-ouvrir')) {
        ev.preventDefault();
        ouvrirFormulaire({ produit: t.getAttribute('data-xva-produit') || null });
        return;
      }
      if (t.hasAttribute('data-plus')) { E.page++; rendreListe(racineActive()); return; }
      if (t.hasAttribute('data-lire')) {
        var idl = t.getAttribute('data-lire');
        E.deplies[idl] = !E.deplies[idl];
        rendreListe(racineActive());
        var el = document.getElementById(idl);
        if (el) $$('.xva-rev', el.parentNode).forEach(function (x) { x.classList.add('xva-vu'); });
        return;
      }
      if (t.hasAttribute('data-copier')) {
        var u = location.origin + '/avis#' + t.getAttribute('data-copier');
        if (navigator.clipboard) navigator.clipboard.writeText(u).then(function () { toast('Lien de l\'avis copié'); });
        else toast(u);
        return;
      }
      if (t.hasAttribute('data-retirer')) {
        var q = t.getAttribute('data-retirer');
        if (q === 'tout') { E.filtreNote = null; E.filtrePhoto = false; E.filtreMarque = null; E.filtreTheme = null; E.recherche = ''; }
        if (q === 'note') E.filtreNote = null;
        if (q === 'photo') E.filtrePhoto = false;
        if (q === 'marque') E.filtreMarque = null;
        if (q === 'theme') E.filtreTheme = null;
        if (q === 'recherche') E.recherche = '';
        var ch = $('#xva-q', racineActive()); if (ch) { ch.value = E.recherche; majRecherche(racineActive()); }
        E.page = 1; raffraichir(); return;
      }
      if (t.hasAttribute('data-note')) {
        var n = +t.getAttribute('data-note');
        E.filtreNote = (E.filtreNote === n) ? null : n; E.page = 1; raffraichir(); return;
      }
      if (t.hasAttribute('data-marque')) {
        E.filtreMarque = t.getAttribute('data-marque') || null; E.page = 1; raffraichir(); return;
      }
      if (t.hasAttribute('data-theme')) {
        var c = t.getAttribute('data-theme');
        E.filtreTheme = (E.filtreTheme === c) ? null : c; E.page = 1; raffraichir();
        if (!panneauOuvert()) {
          var z = $('#xva-tous') || $('#xva-section');
          if (z) z.scrollIntoView({ behavior: calme() ? 'auto' : 'smooth', block: 'start' });
        }
        return;
      }
      if (t.hasAttribute('data-f')) {
        var f = t.getAttribute('data-f');
        if (f === 'photo') E.filtrePhoto = !E.filtrePhoto;
        if (f === 'tous') { E.filtreNote = null; E.filtrePhoto = false; E.filtreMarque = null; E.filtreTheme = null; }
        var zone = racineActive();
        $$('[data-f]', zone).forEach(function (b) { b.classList.remove('xva-on'); });
        var cible = E.filtrePhoto ? $('[data-f=photo]', zone) : $('[data-f=tous]', zone);
        if (cible) cible.classList.add('xva-on');
        E.page = 1; raffraichir(); return;
      }
      if (t.hasAttribute('data-utile')) {
        var id = t.getAttribute('data-utile');
        if (E.utiles[id]) return;
        E.utiles[id] = 1;
        try { localStorage.setItem('xva_utiles', JSON.stringify(E.utiles)); } catch (e) { }
        t.classList.add('xva-on');
        var em = t.querySelector('em');
        if (em) em.textContent = ' · ' + (parseInt(em.textContent.replace(/\D/g, ''), 10) + 1);
        fetch(API + '?utile=' + encodeURIComponent(id), { method: 'POST' }).catch(function () { });
        return;
      }
      if (t.hasAttribute('data-lb')) { ouvrirVisionneuse(t.getAttribute('data-lb'), +t.getAttribute('data-i')); }
    });

    var sel = $('[data-xva=tri]');
    if (sel) sel.addEventListener('change', function () { E.tri = this.value; E.page = 1; rendreListe(); });

    /* recherche, avec un léger délai pour ne pas recalculer à chaque touche */
    var q = $('#xva-q'), minuteur;
    if (q) {
      q.addEventListener('input', function () {
        clearTimeout(minuteur);
        var v = this.value;
        minuteur = setTimeout(function () { E.recherche = v.trim(); E.page = 1; rendreListe(); majRecherche(); }, 220);
        majRecherche();
      });
      var vider = $('#xva-q-vider');
      if (vider) vider.addEventListener('click', function () {
        q.value = ''; E.recherche = ''; E.page = 1; rendreListe(); majRecherche(); q.focus();
      });
    }

    brancherNav();
    poserComparateurs();

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panneauOuvert()) fermerPanneau();
    });

    var bar = $('.xva-bar'), hero = $('.xva-hero');
    if (bar && hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        bar.classList.toggle('xva-on', !es[0].isIntersecting);
      }, { rootMargin: '-80px 0px 0px 0px' }).observe(hero);
    }
  }
  function majRecherche(racine) {
    var z = $('.xva-search', racine || document), q = $('#xva-q', racine || document);
    if (z && q) z.classList.toggle('xva-plein', !!q.value);
  }

  /* navigation interne : la section visible s'allume dans la barre */
  function brancherNav() {
    var liens = $$('.xva-navsec a');
    if (!liens.length || !('IntersectionObserver' in window)) return;
    var cibles = liens.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
    if (!cibles.length) return;
    var obsNav = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        liens.forEach(function (a) { a.classList.toggle('xva-on', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    cibles.forEach(function (c) { obsNav.observe(c); });
  }

  /* ------------------------------------------------------- révélation défil */
  var obs = null;
  function observer() {
    if (!('IntersectionObserver' in window) || calme()) {
      $$('.xva-rev').forEach(function (e) { e.classList.add('xva-vu'); });
      return;
    }
    if (!obs) {
      obs = new IntersectionObserver(function (es) {
        es.forEach(function (e, i) {
          if (!e.isIntersecting) return;
          var el = e.target;
          setTimeout(function () { el.classList.add('xva-vu'); }, Math.min(i * 55, 330));
          obs.unobserve(el);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    }
    $$('.xva-rev:not(.xva-vu)').forEach(function (e) { obs.observe(e); });
  }

  /* --------------------------------------------------------- visionneuse   */
  var LB = { liste: [], i: 0, rendre: null };
  function ouvrirVisionneuse(idAvis, idx) {
    var a = E.avis.filter(function (x) { return x.id === idAvis; })[0];
    if (!a) return;
    var l = photos(a);
    if (!l.length) return;
    LB.liste = l.map(function (p) {
      return { src: urlPhoto(p.c), w: p.w ? urlPhoto(p.w) : null, qui: a.prenom, mod: a.modele,
        r: p.r === 'avant' ? 'Avant' : p.r === 'apres' ? 'Après' : null };
    });
    LB.i = idx || 0;
    LB.rendre = document.activeElement;
    var lb = $('#xva-lb'); if (!lb) return;
    peindreVisionneuse();
    lb.classList.add('xva-on');
    document.body.style.overflow = 'hidden';
    var x = $('.xva-lb-x', lb); if (x) x.focus();
  }
  function peindreVisionneuse() {
    var lb = $('#xva-lb'); if (!lb) return;
    var p = LB.liste[LB.i];
    $('img', lb).src = p.src;
    $('.xva-lb-info', lb).textContent = (p.r ? p.r + ' — ' : '') + 'Photo de ' + p.qui
      + (p.mod ? ' · ' + p.mod : '') + '   (' + (LB.i + 1) + '/' + LB.liste.length + ')';
    $$('.xva-lb-nav', lb).forEach(function (b) { b.style.display = LB.liste.length > 1 ? '' : 'none'; });
  }
  function fermerVisionneuse() {
    var lb = $('#xva-lb'); if (!lb) return;
    lb.classList.remove('xva-on');
    document.body.style.overflow = '';
    if (LB.rendre && LB.rendre.focus) LB.rendre.focus();
  }
  function brancherVisionneuse() {
    var lb = $('#xva-lb'); if (!lb) return;
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('xva-lb-x')) return fermerVisionneuse();
      if (e.target.classList.contains('xva-lb-prev')) { LB.i = (LB.i - 1 + LB.liste.length) % LB.liste.length; peindreVisionneuse(); }
      if (e.target.classList.contains('xva-lb-next')) { LB.i = (LB.i + 1) % LB.liste.length; peindreVisionneuse(); }
    });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('xva-on')) return;
      if (e.key === 'Escape') fermerVisionneuse();
      if (e.key === 'ArrowLeft') { LB.i = (LB.i - 1 + LB.liste.length) % LB.liste.length; peindreVisionneuse(); }
      if (e.key === 'ArrowRight') { LB.i = (LB.i + 1) % LB.liste.length; peindreVisionneuse(); }
    });
  }


  /* ====================================================== COMPARATEUR A/B */
  /* Une seule image visible, une poignée qui découpe. Fonctionne à la
     souris, au doigt et au clavier (flèches gauche/droite). */
  function poserComparateurs() {
    function place(el, clientX) {
      var r = el.getBoundingClientRect();
      var pct = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
      el.style.setProperty('--x', pct + '%');
      el.setAttribute('aria-valuenow', Math.round(pct));
    }
    document.addEventListener('pointerdown', function (e) {
      var el = e.target.closest && e.target.closest('[data-ab]');
      if (!el) return;
      el.setPointerCapture && el.setPointerCapture(e.pointerId);
      place(el, e.clientX);
      function bouge(ev) { place(el, ev.clientX); }
      function fin() {
        document.removeEventListener('pointermove', bouge);
        document.removeEventListener('pointerup', fin);
      }
      document.addEventListener('pointermove', bouge);
      document.addEventListener('pointerup', fin);
    });
    document.addEventListener('keydown', function (e) {
      var el = document.activeElement;
      if (!el || !el.hasAttribute || !el.hasAttribute('data-ab')) return;
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      var v = parseFloat(el.getAttribute('aria-valuenow') || 50);
      v = Math.max(0, Math.min(100, v + (e.key === 'ArrowRight' ? 5 : -5)));
      el.style.setProperty('--x', v + '%');
      el.setAttribute('aria-valuenow', Math.round(v));
    });
  }

  /* ================================================ PANNEAU PLEIN ÉCRAN   */
  /* Construit à la volée : rien à coller dans index.html. Le principe une
     seule page est conservé — on ne change jamais d'adresse. */
  var PAN = { el: null, rendre: null };

  function construirePanneau() {
    if (PAN.el) return PAN.el;
    var d = document.createElement('div');
    d.className = 'xva-panneau xva';
    d.id = 'xva-panneau';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    d.setAttribute('aria-label', 'Tous les avis clients');
    d.innerHTML =
      '<div class="xva-pan-tete"><div class="xva-pan-tete-in">'
      + '<h2>Tous les avis</h2>'
      + '<span class="xva-pan-score" data-xva="pan-score"></span>'
      + '<span class="xva-bar-sep" style="flex:1"></span>'
      + '<button class="xva-btn xva-btn-or xva-btn-sm" data-xva-ouvrir>Donner mon avis</button>'
      + '<button class="xva-x" style="position:static" data-pan-fermer aria-label="Fermer">×</button>'
      + '</div></div>'
      + '<div class="xva-pan-corps"><div class="xva-w">'
      + '<div class="xva-tools">'
      + '<div class="xva-dist" data-xva="dist" role="group" aria-label="Filtrer par note"></div>'
      + '<div class="xva-filtres">'
      + '<div class="xva-ligne">'
      + '<label class="xva-search"><span class="xva-sr">Rechercher dans les avis</span>'
      + ICO.loupe
      + '<input type="search" id="xva-q" placeholder="Rechercher : « pose », « plafond », « Mercedes », « délai »…" autocomplete="off">'
      + '<button type="button" class="xva-vider" id="xva-q-vider" aria-label="Effacer la recherche">×</button></label>'
      + '<select class="xva-select" data-xva="tri" aria-label="Trier les avis">'
      + '<option value="recent">Plus récents</option><option value="utile">Les plus utiles</option>'
      + '<option value="note">Mieux notés</option><option value="note_asc">Moins bien notés</option>'
      + '<option value="photo">Avec photo d\'abord</option></select></div>'
      + '<div class="xva-ligne"><div class="xva-seg" data-xva="marques"></div></div>'
      + '<div class="xva-ligne"><div class="xva-seg">'
      + '<button class="xva-chip xva-on" data-f="tous">Tous</button>'
      + '<button class="xva-chip xva-chip-or" data-f="photo">Avec photo</button></div>'
      + '<span class="xva-sp"></span><span class="xva-compte" data-xva="compte"></span></div>'
      + '<div class="xva-actifs" data-xva="actifs"></div>'
      + '</div></div>'
      + '<p class="xva-sr" role="status" aria-live="polite" data-xva="annonce"></p>'
      + '<div class="xva-grille" data-xva="grille"></div>'
      + '<div class="xva-plus" data-xva="plus"></div>'
      + '</div></div>';
    document.body.appendChild(d);

    d.addEventListener('click', function (e) {
      if (e.target.closest('[data-pan-fermer]')) fermerPanneau();
    });
    var sel = $('[data-xva=tri]', d);
    if (sel) sel.addEventListener('change', function () { E.tri = this.value; E.page = 1; rendreListe(d); });
    var q = $('#xva-q', d), minuteur;
    if (q) {
      q.addEventListener('input', function () {
        clearTimeout(minuteur);
        var v = this.value;
        minuteur = setTimeout(function () { E.recherche = v.trim(); E.page = 1; rendrePanneau(); }, 220);
        majRecherche(d);
      });
      var vd = $('#xva-q-vider', d);
      if (vd) vd.addEventListener('click', function () {
        q.value = ''; E.recherche = ''; E.page = 1; rendrePanneau(); majRecherche(d); q.focus();
      });
    }
    PAN.el = d;
    return d;
  }

  function rendrePanneau() {
    var d = PAN.el; if (!d) return;
    var r = E.resume;
    var sc = $('[data-xva=pan-score]', d);
    if (sc) sc.innerHTML = r.total
      ? etoiles(Math.round(r.moyenne), 'xva-xs') + ' <b>' + note1(r.moyenne) + '/5</b> · ' + r.total + ' avis'
      : '';
    peindreRepartition(d);
    peindreMarques(d);
    rendreListe(d);
  }

  function ouvrirPanneau() {
    var d = construirePanneau();
    PAN.rendre = document.activeElement;
    E.page = 1;
    rendrePanneau();
    d.classList.add('xva-on');
    document.body.style.overflow = 'hidden';
    var q = $('#xva-q', d); if (q) setTimeout(function () { q.focus(); }, 140);
  }
  function fermerPanneau() {
    if (!PAN.el) return;
    PAN.el.classList.remove('xva-on');
    document.body.style.overflow = '';
    if (PAN.rendre && PAN.rendre.focus) PAN.rendre.focus();
  }
  function panneauOuvert() { return !!(PAN.el && PAN.el.classList.contains('xva-on')); }

  /* ========================================================== FORMULAIRE   */
  var F = { note: 0, criteres: {}, photos: [], produit: null, jeton: null, pas: 1, rendre: null };

  function ouvrirFormulaire(opts) {
    opts = opts || {};
    F.produit = opts.produit || null;
    F.jeton = opts.jeton || (new URLSearchParams(location.search)).get('j') || null;
    F.pas = 1;
    F.rendre = document.activeElement;
    var ov = $('#xva-ov'); if (!ov) return;
    $('#xva-etape-fin').style.display = 'none';
    $('#xva-formulaire').style.display = '';
    allerA(1);
    ov.classList.add('xva-on');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { var b = $('#xva-picker button'); if (b) b.focus(); }, 140);
  }
  function fermerFormulaire() {
    var ov = $('#xva-ov'); if (!ov) return;
    ov.classList.remove('xva-on');
    document.body.style.overflow = '';
    if (F.rendre && F.rendre.focus) F.rendre.focus();
  }

  function allerA(n) {
    F.pas = n;
    $$('.xva-pas').forEach(function (p) { p.classList.toggle('xva-on', +p.getAttribute('data-pas') === n); });
    $$('.xva-prog div').forEach(function (d, i) {
      d.classList.toggle('xva-faite', i + 1 < n);
      d.classList.toggle('xva-encours', i + 1 === n);
    });
    var m = $('.xva-modal'); if (m) m.scrollTop = 0;
    var err = $('#xva-err'); if (err) err.classList.remove('xva-on');
  }

  function peindreNote(n) {
    $$('#xva-picker button').forEach(function (b, k) { b.classList.toggle('xva-lit', k < n); });
    var m = $('#xva-picker .xva-mot');
    if (m) m.textContent = n ? MOTS[n] : 'Cliquez sur les étoiles';
  }

  /* les critères proposés dépendent de ce que l'avis concerne */
  function peindreCriteres() {
    var z = $('#xva-criteres'); if (!z) return;
    var type = ($('#xva-f-type') || {}).value || '';
    var liste = CRITERES.filter(function (c) { return !c.types || c.types.indexOf(type) !== -1; });
    z.innerHTML = liste.map(function (c) {
      var v = F.criteres[c.cle] || 0;
      var et = '';
      for (var i = 1; i <= 5; i++) {
        et += '<button type="button" class="' + (i <= v ? 'xva-lit' : '') + '" data-crit="' + c.cle + '" data-v="' + i + '" '
          + 'aria-label="' + esc(c.nom) + ' : ' + i + ' sur 5">'
          + '<svg viewBox="0 0 24 24"><path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></button>';
      }
      return '<div class="xva-crit-ligne"><span>' + esc(c.nom) + '</span><div class="xva-mini-picker">' + et + '</div></div>';
    }).join('');
    // on oublie les critères qui ne s'appliquent plus au type choisi
    Object.keys(F.criteres).forEach(function (k) {
      if (!liste.some(function (c) { return c.cle === k; })) delete F.criteres[k];
    });
  }

  /* Redimensionne et ré-encode la photo dans le navigateur.
     Effet de bord voulu : le passage par <canvas> SUPPRIME les métadonnées
     EXIF, donc la position GPS du domicile du client. */
  function preparerPhoto(fichier) {
    return new Promise(function (ok, ko) {
      if (!/^image\/(jpeg|png|webp)$/.test(fichier.type)) return ko(new Error('format'));
      if (fichier.size > 12 * 1024 * 1024) return ko(new Error('poids'));
      var url = URL.createObjectURL(fichier);
      var img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(url);
        var MAX = 1600;
        var r = Math.min(MAX / img.width, MAX / img.height, 1);
        var w = Math.round(img.width * r), h = Math.round(img.height * r);
        var c = document.createElement('canvas');
        c.width = w; c.height = h;
        var x = c.getContext('2d');
        x.fillStyle = '#ffffff'; x.fillRect(0, 0, w, h);
        x.drawImage(img, 0, 0, w, h);
        ok(c.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = function () { URL.revokeObjectURL(url); ko(new Error('lecture')); };
      img.src = url;
    });
  }
  function ajouterPhotos(fs) {
    var liste = Array.prototype.slice.call(fs, 0, Math.max(0, 3 - F.photos.length));
    if (!liste.length) return;
    Promise.all(liste.map(function (f) {
      return preparerPhoto(f).catch(function (e) {
        montrerErreur(e.message === 'poids' ? 'Une photo dépasse 12 Mo : ' + f.name
          : 'Ce fichier n\'est pas une image utilisable : ' + f.name);
        return null;
      });
    })).then(function (res) {
      res.filter(Boolean).forEach(function (d) { F.photos.push({ d: d, r: null }); });
      peindreVignettes();
    });
  }
  function peindreVignettes() {
    var z = $('#xva-vign'); if (!z) return;
    z.innerHTML = F.photos.map(function (p, i) {
      return '<figure>'
        + '<span class="xva-img"><img src="' + p.d + '" alt="Photo ' + (i + 1) + '">'
        + '<button type="button" data-sup="' + i + '" aria-label="Retirer la photo ' + (i + 1) + '">×</button></span>'
        + '<span class="xva-roles">'
        + '<button type="button" class="' + (p.r === 'avant' ? 'xva-on' : '') + '" data-role="avant" data-i="' + i + '">Avant</button>'
        + '<button type="button" class="' + (p.r === 'apres' ? 'xva-on' : '') + '" data-role="apres" data-i="' + i + '">Après</button>'
        + '</span></figure>';
    }).join('');
    var d = $('#xva-drop'); if (d) d.style.display = F.photos.length >= 3 ? 'none' : '';
  }

  function montrerErreur(m) {
    var e = $('#xva-err'); if (!e) return;
    e.textContent = m; e.classList.add('xva-on');
    e.scrollIntoView({ behavior: calme() ? 'auto' : 'smooth', block: 'center' });
  }
  function val(id) { var el = $(id); return el ? el.value.trim() : ''; }

  /* Le véhicule est saisi librement : rien à faire de plus que lire le champ.
     Conservé comme fonction pour garder un seul endroit à changer si la saisie
     évolue un jour (deux champs marque + modèle, par exemple). */
  function modeleSaisi() { return val('#xva-f-modele'); }

  function validerPas(n) {
    var e = $('#xva-err'); if (e) e.classList.remove('xva-on');
    if (n === 1) {
      if (!val('#xva-f-type')) { montrerErreur('Indiquez d\'abord ce que concerne votre avis.'); return false; }
      if (!F.note) { montrerErreur('Merci de donner une note globale.'); return false; }
      return true;
    }
    if (n === 2) {
      if (!val('#xva-f-titre')) { montrerErreur('Merci de donner un titre à votre avis.'); return false; }
      if (val('#xva-f-texte').length < 40) { montrerErreur('Votre avis doit faire au moins 40 caractères.'); return false; }
      return true;
    }
    if (n === 3) {
      if (val('#xva-f-prenom').length < 2) { montrerErreur('Merci d\'indiquer votre prénom.'); return false; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val('#xva-f-mail'))) { montrerErreur('L\'adresse e-mail n\'est pas valide.'); return false; }
      if (!$('#xva-c1').checked || !$('#xva-c2').checked) { montrerErreur('Merci de cocher les deux cases avant d\'envoyer.'); return false; }
      return true;
    }
    return true;
  }

  function envoyer() {
    if (val('#xva-f-piege')) return;
    if (!validerPas(3)) return;

    var bouton = $('#xva-envoyer');
    if (bouton) { bouton.disabled = true; bouton.textContent = 'Envoi en cours…'; }

    fetch(API_ENVOI, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        note: F.note, criteres: F.criteres,
        prenom: val('#xva-f-prenom'),
        initiale: val('#xva-f-nom').slice(0, 1).toUpperCase(),
        email: val('#xva-f-mail'),
        modele: modeleSaisi(), type: val('#xva-f-type'),
        titre: val('#xva-f-titre'), texte: val('#xva-f-texte'),
        photos: F.photos.map(function (p) { return { d: p.d, r: p.r }; }),
        produit: F.produit, jeton: F.jeton, piege: ''
      })
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (bouton) { bouton.disabled = false; bouton.textContent = 'Envoyer mon avis'; }
        if (!res.ok) return montrerErreur(res.d && res.d.message ? res.d.message : 'L\'envoi a échoué. Réessayez dans un instant.');
        $('#xva-formulaire').style.display = 'none';
        $('#xva-etape-fin').style.display = '';
        var m = $('.xva-modal'); if (m) m.scrollTop = 0;
        F.note = 0; F.criteres = {}; F.photos = []; peindreVignettes(); peindreNote(0);
      })
      .catch(function () {
        if (bouton) { bouton.disabled = false; bouton.textContent = 'Envoyer mon avis'; }
        montrerErreur('Connexion impossible. Vérifiez votre réseau et réessayez.');
      });
  }

  function brancherFormulaire() {
    var pk = $('#xva-picker'); if (!pk) return;
    var mot = $('.xva-mot', pk);
    for (var i = 1; i <= 5; i++) {
      (function (n) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', n + ' étoile' + (n > 1 ? 's' : ''));
        b.innerHTML = '<svg viewBox="0 0 24 24"><path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
        b.addEventListener('mouseenter', function () { peindreNote(n); });
        b.addEventListener('focus', function () { peindreNote(n); });
        b.addEventListener('click', function () { F.note = n; peindreNote(n); });
        pk.insertBefore(b, mot);
      })(i);
    }
    pk.addEventListener('mouseleave', function () { peindreNote(F.note); });

    /* Champ libre avec suggestions, pas une liste fermée : aucune marque n'est
       imposée, et un véhicule inconnu de nos listes s'écrit sans obstacle.
       Les suggestions = notre liste d'aide + les véhicules déjà vus dans les
       avis publiés. La deuxième source rend le champ meilleur tout seul,
       à mesure que de nouvelles marques arrivent. */
    var dl = $('#xva-f-modele-liste');
    if (dl) {
      var vus = {};
      VEHICULES.forEach(function (v) { vus[v] = 1; });
      E.avis.forEach(function (a) { if (a.modele) vus[a.modele] = 1; });
      dl.innerHTML = Object.keys(vus).sort(function (x, y) { return x.localeCompare(y, 'fr'); })
        .map(function (v) { return '<option value="' + esc(v) + '"></option>'; }).join('');
    }
    var ty = $('#xva-f-type');
    if (ty) {
      ty.innerHTML = '<option value="">— Choisir —</option>'
        + TYPES.map(function (t) { return '<option>' + t + '</option>'; }).join('');
      ty.addEventListener('change', peindreCriteres);
    }
    peindreCriteres();

    var zc = $('#xva-criteres');
    if (zc) zc.addEventListener('click', function (e) {
      var b = e.target.closest('[data-crit]'); if (!b) return;
      var cle = b.getAttribute('data-crit'), v = +b.getAttribute('data-v');
      F.criteres[cle] = (F.criteres[cle] === v) ? 0 : v;
      if (!F.criteres[cle]) delete F.criteres[cle];
      peindreCriteres();
    });

    var tx = $('#xva-f-texte');
    if (tx) tx.addEventListener('input', function () { $('#xva-cc').textContent = this.value.length; });

    var drop = $('#xva-drop'), file = $('#xva-f-file');
    if (drop && file) {
      drop.addEventListener('click', function () { file.click(); });
      drop.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); file.click(); } });
      drop.addEventListener('dragover', function (e) { e.preventDefault(); drop.classList.add('xva-hot'); });
      drop.addEventListener('dragleave', function () { drop.classList.remove('xva-hot'); });
      drop.addEventListener('drop', function (e) { e.preventDefault(); drop.classList.remove('xva-hot'); ajouterPhotos(e.dataTransfer.files); });
      file.addEventListener('change', function (e) { ajouterPhotos(e.target.files); this.value = ''; });
    }
    var zv = $('#xva-vign');
    if (zv) zv.addEventListener('click', function (e) {
      var sup = e.target.closest('[data-sup]');
      if (sup) { F.photos.splice(+sup.getAttribute('data-sup'), 1); return peindreVignettes(); }
      var rl = e.target.closest('[data-role]');
      if (!rl) return;
      var i = +rl.getAttribute('data-i'), r = rl.getAttribute('data-role');
      /* un seul « avant » et un seul « après » : le rôle est exclusif */
      if (F.photos[i].r === r) F.photos[i].r = null;
      else {
        F.photos.forEach(function (ph) { if (ph.r === r) ph.r = null; });
        F.photos[i].r = r;
      }
      peindreVignettes();
    });

    $$('[data-suivant]').forEach(function (b) {
      b.addEventListener('click', function () { if (validerPas(F.pas)) allerA(F.pas + 1); });
    });
    $$('[data-precedent]').forEach(function (b) {
      b.addEventListener('click', function () { allerA(Math.max(1, F.pas - 1)); });
    });
    var env = $('#xva-envoyer'); if (env) env.addEventListener('click', envoyer);
    $$('[data-xva-fermer]').forEach(function (b) { b.addEventListener('click', fermerFormulaire); });

    var ov = $('#xva-ov');
    if (ov) {
      ov.addEventListener('click', function (e) { if (e.target === ov) fermerFormulaire(); });
      /* le clavier reste enfermé dans la modale tant qu'elle est ouverte */
      ov.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') return fermerFormulaire();
        if (e.key !== 'Tab') return;
        var f = $$('button,input,select,textarea,a[href]', ov).filter(function (x) {
          return x.offsetParent !== null && !x.disabled;
        });
        if (!f.length) return;
        var prem = f[0], der = f[f.length - 1];
        if (e.shiftKey && document.activeElement === prem) { e.preventDefault(); der.focus(); }
        else if (!e.shiftKey && document.activeElement === der) { e.preventDefault(); prem.focus(); }
      });
    }
  }

  /* ---------------------------------------------------------------- départ */
  function demarrer() {
    if (!$('#xva-page') && !$('#xva-section') && !$('[data-xva-encart]')) return;
    brancher();
    brancherFormulaire();
    brancherVisionneuse();

    charger().then(function () {
      var q = new URLSearchParams(location.search);
      if (q.get('produit')) {
        var code = q.get('produit');
        var l = E.avis.filter(function (a) { return a.produit === code; });
        if (l.length) E.avis = l;
      }
      rendrePage();
      rendreSection();
      rendreEncarts();

      if (q.get('avis') === '1' || q.get('j')) ouvrirFormulaire({ jeton: q.get('j') });
      var n = parseInt(q.get('note'), 10);
      if (n >= 1 && n <= 5) { F.note = n; peindreNote(n); }

      /* lien direct vers un avis : on le déplie et on y va */
      if (location.hash && /^#av_/.test(location.hash)) {
        var cible = location.hash.slice(1);
        var idx = filtres().findIndex(function (a) { return a.id === cible; });
        if (idx >= 0) {
          E.page = Math.floor(idx / PAR_PAGE) + 1;
          E.deplies[cible] = true;
          rendreListe();
          setTimeout(function () {
            var el = document.getElementById(cible);
            if (el) { el.classList.add('xva-vu'); el.scrollIntoView({ behavior: calme() ? 'auto' : 'smooth', block: 'center' }); }
          }, 160);
        }
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
  else demarrer();

  /* exposé pour les autres scripts du site (fiche produit du configurateur) */
  window.XVAvis = {
    ouvrir: ouvrirFormulaire,
    donnees: function () { return { avis: E.avis, resume: E.resume }; },
    etoiles: etoiles,
    encartProduit: function (code, el) {
      if (!el) return;
      el.setAttribute('data-xva-encart', 'produit');
      el.setAttribute('data-xva-produit', code);
      el.classList.add('xva-encart');
      if (E.charge) rendreEncarts();
    }
  };
})();
