/**
 * MAILER — envoi d'emails via SMTP OVH
 *
 * Utilise nodemailer + les credentials de la boîte mail OVH.
 * Les emails partent réellement depuis contact@xperience-vision.fr.
 */

const nodemailer = require('nodemailer');

let transporterCache = null;

function getTransporter() {
    if (transporterCache) return transporterCache;

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
        throw new Error('SMTP credentials missing — check SMTP_HOST/SMTP_USER/SMTP_PASS env vars');
    }

    transporterCache = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,         // SSL si 465, STARTTLS sinon
        auth: { user, pass },
        tls: { rejectUnauthorized: true }
    });

    return transporterCache;
}

/**
 * Envoie un email.
 * @param {Object} opts
 * @param {string} opts.to - destinataire (peut être plusieurs séparés par virgule)
 * @param {string} opts.subject - sujet
 * @param {string} opts.html - corps HTML
 * @param {string} [opts.replyTo] - reply-to optionnel
 * @param {string} [opts.bcc] - copie cachée
 * @returns {Promise<{messageId: string, response: string}>}
 */
async function sendMail({ to, subject, html, replyTo, bcc }) {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || `XPERIENCE VISION <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
        replyTo,
        bcc
    });
    return { messageId: info.messageId, response: info.response };
}

module.exports = { sendMail };
