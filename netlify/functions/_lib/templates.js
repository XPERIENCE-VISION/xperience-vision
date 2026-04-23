/**
 * TEMPLATES EMAILS — HTML brandés XPERIENCE VISION
 *
 * 3 templates :
 *  - adminOrder(...)   → mail interne à contact@xperience-vision.fr
 *  - clientOrder(...)  → mail confirmation commande au client
 *  - bookingConfirm(...) → mail RDV confirmé (uniquement si service) au client + admin
 *
 * Tous inline CSS (compatibilité Outlook, Gmail, etc.).
 */

const SITE_URL = process.env.SITE_URL || 'https://xperiencevision.com';

function fmtPrice(cents) {
    return (cents / 100).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

function fmtDate(isoDate) {
    if (!isoDate) return '';
    try {
        return new Date(isoDate).toLocaleString('fr-FR', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    } catch { return isoDate; }
}

function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
}

const BASE_STYLES = `
    body { margin: 0; padding: 0; background: #060606; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #e0e0e0; line-height: 1.6; }
    .wrapper { max-width: 620px; margin: 0 auto; padding: 32px 16px; }
    .card { background: linear-gradient(180deg, #151515 0%, #0a0a0a 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 0; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.5); }
    .header-bar { background: linear-gradient(90deg, rgba(191,149,63,0.18), rgba(191,149,63,0.05) 60%, transparent); padding: 28px 36px 22px; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .logo { font-size: 24px; font-weight: 900; letter-spacing: -0.02em; color: #fff; text-transform: uppercase; font-style: italic; margin: 0 0 4px; }
    .logo span { color: #888; font-weight: 300; }
    .logo-tag { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #fcf6ba; font-weight: 800; margin: 0; }
    .content { padding: 32px 36px 36px; }
    .eyebrow { font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase; color: #888; font-weight: 800; margin: 24px 0 10px; display: inline-block; padding: 4px 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 999px; }
    .eyebrow-gold { color: #fcf6ba; border-color: rgba(191,149,63,0.3); background: rgba(191,149,63,0.05); }
    h1 { color: #fff; font-size: 30px; font-weight: 900; font-style: italic; line-height: 1.05; margin: 10px 0 20px; letter-spacing: -0.025em; text-transform: uppercase; }
    h1 .accent { background: linear-gradient(135deg, #ffffff 40%, #888 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
    p { margin: 0 0 14px; color: #ccc; font-size: 14px; line-height: 1.7; }
    .section-title { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #fcf6ba; font-weight: 800; margin: 28px 0 14px; padding-bottom: 10px; border-bottom: 1px solid rgba(191,149,63,0.2); }
    .item-table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 12px 0 20px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; overflow: hidden; }
    .item-table th { background: rgba(255,255,255,0.05); color: #aaa; font-size: 10px; text-transform: uppercase; letter-spacing: 0.18em; padding: 12px 16px; text-align: left; font-weight: 800; }
    .item-table td { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ddd; font-size: 13px; vertical-align: top; }
    .item-table tr:last-child td { border-bottom: none; }
    .item-table .price { text-align: right; font-weight: 800; color: #fff; white-space: nowrap; }
    .item-table .ref { color: #666; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; font-family: "SF Mono", Consolas, monospace; }
    .item-table .name { font-weight: 700; color: #fff; font-size: 13px; }
    .subtotal-row td { background: rgba(255,255,255,0.03); font-weight: 800; color: #fff; font-size: 13px; padding: 14px 16px; border-top: 1px solid rgba(255,255,255,0.08); }
    .grand-total { background: linear-gradient(90deg, rgba(191,149,63,0.12), rgba(191,149,63,0.03)); border: 1px solid rgba(191,149,63,0.25); border-radius: 12px; padding: 18px 22px; margin: 20px 0; }
    .grand-total-row { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; }
    .grand-total-row-sub { color: #aaa; font-size: 12px; letter-spacing: 0.08em; }
    .grand-total-row-sub strong { color: #ddd; font-weight: 700; }
    .grand-total-divider { height: 1px; background: rgba(191,149,63,0.2); margin: 8px 0; border: none; }
    .grand-total-label { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; font-weight: 800; }
    .grand-total-value { font-size: 22px; font-weight: 900; color: #fcf6ba; letter-spacing: -0.02em; }
    .info-box { background: rgba(191,149,63,0.07); border: 1px solid rgba(191,149,63,0.22); border-radius: 14px; padding: 16px 20px; margin: 20px 0; }
    .info-box p { margin: 0; color: #fcf6ba; font-size: 13px; font-weight: 600; }
    .info-box strong { color: #fff; }
    .info-box-green { background: rgba(95,191,100,0.07); border: 1px solid rgba(95,191,100,0.22); border-radius: 14px; padding: 16px 20px; margin: 20px 0; }
    .info-box-green p { margin: 0; color: #b5e5b8; font-size: 13px; }
    .info-box-green strong { color: #fff; }
    .meta-grid { margin: 16px 0; padding: 18px 20px; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; }
    .meta-row { display: flex; padding: 6px 0; }
    .meta-label { flex-shrink: 0; width: 120px; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #888; font-weight: 700; padding-top: 2px; }
    .meta-value { flex: 1; color: #fff; font-size: 13px; font-weight: 500; line-height: 1.55; }
    .meta-value.muted { color: #aaa; font-weight: 400; }
    .cta { display: inline-block; background: linear-gradient(135deg, #ffffff, #f0f0f0); color: #000 !important; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 900; text-transform: uppercase; letter-spacing: 0.22em; font-size: 11px; margin-top: 20px; box-shadow: 0 8px 20px rgba(255,255,255,0.1); }
    .cta-gold { background: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728); color: #1a0e00 !important; box-shadow: 0 8px 20px rgba(191,149,63,0.25); }
    .footer { padding: 24px 36px; background: rgba(0,0,0,0.3); text-align: center; color: #666; font-size: 11px; line-height: 1.8; border-top: 1px solid rgba(255,255,255,0.06); }
    .footer a { color: #888; text-decoration: none; }
    .footer-links { margin: 4px 0 12px; }
    .footer-baseline { color: #fcf6ba; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; font-weight: 800; font-style: italic; margin: 12px 0 0; }
    .hero-date { display: inline-block; font-size: 20px; font-weight: 900; color: #1a0e00; background: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728); padding: 12px 24px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.02em; margin: 8px 0 16px; }
    .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent); margin: 24px 0; border: none; }
    .copy-id { display: inline-block; font-family: "SF Mono", Consolas, monospace; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); padding: 4px 10px; border-radius: 6px; color: #aaa; font-size: 11px; letter-spacing: 0.02em; word-break: break-all; }
`;

function renderItemTable(items, { showSubtotal = true, subtotalLabel = 'Sous-total' } = {}) {
    if (!items || !items.length) return '';
    const subtotal = items.reduce((s, it) => s + it.unitPrice * it.qty, 0);
    return `
        <table class="item-table" role="presentation">
            <thead>
                <tr>
                    <th style="width: 22%;">Référence</th>
                    <th>Désignation</th>
                    <th style="text-align:center;width: 55px;">Qté</th>
                    <th style="text-align:right;width: 90px;">Prix</th>
                </tr>
            </thead>
            <tbody>
                ${items.map(it => `
                    <tr>
                        <td><span class="ref">${escapeHtml(it.id)}</span></td>
                        <td><span class="name">${escapeHtml(it.name)}</span></td>
                        <td style="text-align:center;">${it.qty}</td>
                        <td class="price">${fmtPrice(it.unitPrice * it.qty)}</td>
                    </tr>
                `).join('')}
                ${showSubtotal ? `
                    <tr class="subtotal-row">
                        <td colspan="3">${escapeHtml(subtotalLabel)}</td>
                        <td class="price">${fmtPrice(subtotal)}</td>
                    </tr>
                ` : ''}
            </tbody>
        </table>
    `;
}

/**
 * Rend séparément les services (sur RDV) et les produits (livrés), avec un
 * total général (HT + TVA 20% + TTC) en bas — obligatoire pour e-commerce FR.
 */
function renderOrderBreakdown(items) {
    const services = items.filter(it => it.type === 'service');
    const produits = items.filter(it => it.type !== 'service');
    const grandTotalTtc = items.reduce((s, it) => s + it.unitPrice * it.qty, 0);
    const grandTotalHt = Math.round(grandTotalTtc / 1.20);
    const grandTotalTva = grandTotalTtc - grandTotalHt;

    let html = '';
    if (services.length) {
        html += `
            <p class="section-title">Installation sur RDV</p>
            ${renderItemTable(services, { subtotalLabel: 'Sous-total services TTC' })}
        `;
    }
    if (produits.length) {
        html += `
            <p class="section-title">Accessoires livrés</p>
            ${renderItemTable(produits, { subtotalLabel: 'Sous-total produits TTC' })}
        `;
    }
    html += `
        <div class="grand-total">
            <div class="grand-total-row grand-total-row-sub">
                <span>Total HT</span>
                <strong>${fmtPrice(grandTotalHt)}</strong>
            </div>
            <div class="grand-total-row grand-total-row-sub">
                <span>TVA 20 %</span>
                <strong>${fmtPrice(grandTotalTva)}</strong>
            </div>
            <hr class="grand-total-divider">
            <div class="grand-total-row">
                <span class="grand-total-label">Total TTC</span>
                <span class="grand-total-value">${fmtPrice(grandTotalTtc)}</span>
            </div>
        </div>
    `;
    return html;
}

function renderMetaGrid(rows) {
    const valid = rows.filter(r => r.value);
    if (!valid.length) return '';
    return `
        <div class="meta-grid">
            ${valid.map(r => `
                <div class="meta-row">
                    <span class="meta-label">${escapeHtml(r.label)}</span>
                    <span class="meta-value ${r.muted ? 'muted' : ''}">${r.html || escapeHtml(r.value)}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function wrap(content, title) {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <style>${BASE_STYLES}</style>
</head>
<body>
    <div class="wrapper">
        <div class="card">
            <div class="header-bar">
                <p class="logo">XPERIENCE <span>VISION</span></p>
                <p class="logo-tag">L'intégrateur digital embarqué premium</p>
            </div>
            <div class="content">
                ${content}
            </div>
            <div class="footer">
                <p style="color:#888;font-weight:700;">XPERIENCE VISION</p>
                <p>10 avenue Fridingen · 77100 Nanteuil-lès-Meaux</p>
                <p class="footer-links">
                    <a href="${SITE_URL}">xperiencevision.com</a>
                    &nbsp;·&nbsp;
                    <a href="mailto:contact@xperience-vision.fr">contact@xperience-vision.fr</a>
                </p>
                <p class="footer-baseline">Voyez plus loin · Vivez plus fort</p>
                <p style="margin-top:14px;font-size:10px;color:#555;">© 2026 XPERIENCE VISION · Tous droits réservés</p>
            </div>
        </div>
    </div>
</body>
</html>`;
}

function formatLieuRdv(lieu) {
    if (!lieu) return '';
    const label = lieu.label || (lieu.type === 'garage' ? 'Garage XPERIENCE VISION' : 'À domicile');
    const adresse = lieu.adresse || '';
    return adresse ? `${label}<br><span style="color:#888;font-size:12px;">${escapeHtml(adresse)}</span>` : label;
}

function formatAddress(customer) {
    const line1 = customer.adresse || '';
    const cp = customer.code_postal || '';
    const ville = customer.ville || '';
    const line2 = [cp, ville].filter(Boolean).join(' ');
    return [line1, line2].filter(Boolean).join('<br>');
}

function formatVehicle(customer) {
    const parts = [];
    if (customer.marque) parts.push(customer.marque);
    if (customer.modele) parts.push(customer.modele);
    const label = parts.join(' ');
    if (customer.immatriculation) {
        return label ? `${label} · ${customer.immatriculation}` : customer.immatriculation;
    }
    return label;
}

/**
 * Email envoyé à contact@xperience-vision.fr (notif interne nouvelle commande)
 */
function adminOrder({ session, items, customer, lieuRdv, booking, hasServices, hasProducts }) {
    const customerFullName = `${customer.prenom} ${customer.nom}`.trim() || 'Client inconnu';
    const addressHtml = formatAddress(customer) || 'Non renseignée';

    const clientMeta = renderMetaGrid([
        { label: 'Nº commande',  value: session.id,            html: `<span class="copy-id">${escapeHtml(session.id || '?')}</span>` },
        { label: 'Client',       value: customerFullName },
        { label: 'Email',        value: customer.email,        html: `<a href="mailto:${escapeHtml(customer.email)}" style="color:#fcf6ba;">${escapeHtml(customer.email)}</a>` },
        { label: 'Téléphone',    value: customer.telephone,    html: customer.telephone ? `<a href="tel:${escapeHtml(customer.telephone)}" style="color:#fff;">${escapeHtml(customer.telephone)}</a>` : '' },
        { label: 'Adresse',      value: addressHtml,           html: addressHtml }
    ]);

    let servicesBlock = '';
    if (hasServices) {
        const lieuIsGarage = lieuRdv?.type === 'garage';
        servicesBlock = `
            <div class="info-box">
                <p><strong>🛠️ ${lieuIsGarage ? 'PRESTATION EN GARAGE XPERIENCE VISION' : 'PRESTATION À DOMICILE'}</strong></p>
            </div>
            ${renderMetaGrid([
                { label: 'Véhicule',     value: formatVehicle(customer) },
                { label: 'Lieu du RDV',  value: lieuRdv?.label || '', html: lieuRdv ? formatLieuRdv(lieuRdv) : '' },
                { label: 'Créneau',      value: booking?.startTime ? fmtDate(booking.startTime) : '' },
                { label: 'Booking Cal',  value: booking?.uid,         html: booking?.uid ? `<span class="copy-id">${escapeHtml(booking.uid)}</span>` : '' }
            ])}
        `;
    }

    let shippingBlock = '';
    if (hasProducts) {
        const addr = session.shipping_details?.address || session.customer_details?.address;
        const shippingFormatted = addr
            ? [addr.line1, addr.line2, `${addr.postal_code || ''} ${addr.city || ''}`.trim(), addr.country].filter(Boolean).map(escapeHtml).join('<br>')
            : addressHtml;
        shippingBlock = `
            <div class="info-box">
                <p><strong>📦 LIVRAISON À DOMICILE</strong></p>
            </div>
            ${renderMetaGrid([
                { label: 'Adresse livraison', value: shippingFormatted, html: shippingFormatted }
            ])}
        `;
    }

    const actionText = [
        hasServices ? 'Préparez la prestation pour le créneau indiqué.' : '',
        hasProducts ? 'Préparez l\'expédition dès que possible.' : ''
    ].filter(Boolean).join(' ');

    const content = `
        <p class="eyebrow eyebrow-gold">Nouvelle commande · Payée</p>
        <h1>Commande <span class="accent">confirmée</span></h1>
        <p>Une nouvelle commande vient d'être payée intégralement. Voici tous les détails pour préparer la suite.</p>

        <p class="section-title">Client</p>
        ${clientMeta}

        ${servicesBlock}
        ${shippingBlock}

        <p class="section-title">Articles commandés</p>
        ${renderOrderBreakdown(items)}

        ${actionText ? `
            <div class="info-box-green">
                <p><strong>▶ À faire :</strong> ${escapeHtml(actionText)}</p>
            </div>
        ` : ''}

        <p style="text-align:center;margin-top:28px;">
            <a href="https://dashboard.stripe.com/payments/${escapeHtml(session.payment_intent || '')}" class="cta">Voir dans Stripe →</a>
        </p>
    `;
    return wrap(content, `Nouvelle commande — ${session.id}`);
}

/**
 * Email de confirmation de commande envoyé au client
 */
function clientOrder({ session, items, customer, lieuRdv, booking, hasServices, hasProducts }) {
    const firstName = customer.prenom || 'Cher client';

    let rdvBlock = '';
    if (hasServices) {
        const lieuIsGarage = lieuRdv?.type === 'garage';
        rdvBlock = `
            <p class="section-title">Votre rendez-vous</p>
            ${booking?.startTime ? `<p class="hero-date">${escapeHtml(fmtDate(booking.startTime))}</p>` : ''}
            ${renderMetaGrid([
                { label: 'Lieu du RDV', value: lieuRdv?.label || '', html: lieuRdv ? formatLieuRdv(lieuRdv) : '' },
                { label: 'Véhicule',    value: formatVehicle(customer) }
            ])}
            <div class="info-box">
                <p><strong>📍 Le jour J</strong></p>
                <p style="margin-top:8px;color:#ccc;">${
                    lieuIsGarage
                        ? 'Présentez-vous au garage XPERIENCE VISION à l\'heure du rendez-vous avec votre véhicule.'
                        : 'Notre technicien se présentera à l\'adresse indiquée à l\'heure du rendez-vous. Merci de préparer l\'accès à votre véhicule.'
                }</p>
            </div>
            <div class="info-box-green">
                <p><strong>✅ Un rappel automatique sera envoyé 24 h avant votre RDV.</strong></p>
            </div>
        `;
    }

    let shippingBlock = '';
    if (hasProducts) {
        shippingBlock = `
            <p class="section-title">Livraison</p>
            <p>Vos produits seront expédiés sous <strong style="color:#fff;">3 à 5 jours ouvrés</strong>. Vous recevrez un email avec le numéro de suivi dès l'envoi.</p>
            ${renderMetaGrid([
                { label: 'Adresse livraison', value: formatAddress(customer), html: formatAddress(customer) }
            ])}
        `;
    }

    const content = `
        <p class="eyebrow eyebrow-gold">Commande confirmée</p>
        <h1>Merci <span class="accent">${escapeHtml(firstName)}</span> !</h1>

        <p>Votre commande a bien été enregistrée. Retrouvez ci-dessous le récapitulatif complet.</p>

        ${renderMetaGrid([
            { label: 'Nº commande',   value: session.id,            html: `<span class="copy-id">${escapeHtml(session.id || '?')}</span>` },
            { label: 'Date',          value: fmtDate(new Date()) }
        ])}

        <p class="section-title">Votre commande</p>
        ${renderOrderBreakdown(items)}

        ${rdvBlock}
        ${shippingBlock}

        <hr class="divider" />

        <p style="color:#aaa;font-size:13px;text-align:center;">
            Une question ? Notre équipe vous répond sous 24 h<br>
            <a href="mailto:contact@xperience-vision.fr" style="color:#fcf6ba;font-weight:700;">contact@xperience-vision.fr</a>
        </p>

        <p style="text-align:center;margin-top:20px;">
            <a href="${SITE_URL}" class="cta cta-gold">Retour sur le site →</a>
        </p>
    `;
    return wrap(content, 'Confirmation de votre commande XPERIENCE VISION');
}

/**
 * Email "RDV confirmé" envoyé au client (uniquement si au moins un service)
 * Copie admin en BCC pour suivi technicien.
 */
function bookingConfirm({ customer, lieuRdv, booking, items }) {
    const firstName = customer.prenom || 'Cher client';
    const servicesOnly = items.filter(it => it.type === 'service');

    const serviceLines = servicesOnly.map(it => `<li style="color:#ddd;margin:4px 0;">• ${escapeHtml(it.name)} <span style="color:#888;">(×${it.qty})</span></li>`).join('');

    const lieuIsGarage = lieuRdv?.type === 'garage';
    const jourJText = lieuIsGarage
        ? "Présentez-vous au garage XPERIENCE VISION à l'heure du rendez-vous avec votre véhicule. Notre équipe s'occupe du reste."
        : "Notre technicien se présentera à l'adresse indiquée à l'heure du rendez-vous. Assurez-vous que votre véhicule soit accessible.";

    const content = `
        <p class="eyebrow eyebrow-gold">Rendez-vous confirmé</p>
        <h1>Votre RDV est validé, ${escapeHtml(firstName)} !</h1>

        <p>Nous avons bien bloqué votre créneau. Voici les détails :</p>

        ${booking?.startTime ? `<p class="hero-date">${escapeHtml(fmtDate(booking.startTime))}</p>` : ''}

        ${lieuRdv ? `
            <p class="eyebrow">Lieu du RDV</p>
            <p>${formatLieuRdv(lieuRdv)}</p>
        ` : ''}

        <p class="eyebrow">Votre véhicule</p>
        <p><strong style="color:#fff;">${escapeHtml(formatVehicle(customer) || 'Non renseigné')}</strong></p>

        ${serviceLines ? `
            <p class="eyebrow">Prestations réservées</p>
            <ul style="list-style:none;padding:0;margin:0 0 16px;">
                ${serviceLines}
            </ul>
        ` : ''}

        <div class="info-box">
            <p><strong>📍 Le jour J</strong></p>
            <p style="margin-top:8px;">${jourJText}</p>
        </div>

        <div class="info-box-green">
            <p><strong>✅ Un rappel sera envoyé 24h avant.</strong></p>
        </div>

        <p style="margin-top:32px;color:#aaa;font-size:13px;">Besoin de reprogrammer ? Répondez à cet email ou contactez-nous à <a href="mailto:contact@xperience-vision.fr" style="color:#fcf6ba;">contact@xperience-vision.fr</a>.</p>

        <p style="margin-top:24px;"><a href="${SITE_URL}" class="cta">Retour au site</a></p>
    `;
    return wrap(content, 'Votre rendez-vous XPERIENCE VISION est confirmé');
}

module.exports = { adminOrder, clientOrder, bookingConfirm, fmtPrice, fmtDate };
