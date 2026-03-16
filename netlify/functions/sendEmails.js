exports.handler = async (event) => {
    // On n'accepte que les requêtes POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body);
    const RESEND_API_KEY = process.env.RESEND_API_KEY; // Clé secrète configurée sur Netlify

    // Configuration de l'email
    const resendBody = {
        // Tant que tu n'as pas de nom de domaine vérifié sur Resend, tu DOIS utiliser cette adresse d'expédition :
        from: 'XPERIENCE VISION <onboarding@resend.dev>', 
        // L'adresse où TU veux recevoir les messages de tes clients :
        to: ['contact@xperience-vision.fr '], // <-- REMPLACE PAR TON EMAIL
        reply_to: data.email, // Permet de faire "Répondre" directement au client
        subject: `Nouveau contact site : ${data.subject} - ${data.name}`,
        html: `
            <h3>Nouveau message depuis xperience-vision.fr</h3>
            <p><strong>Nom :</strong> ${data.name}</p>
            <p><strong>Email :</strong> ${data.email}</p>
            <p><strong>Véhicule :</strong> ${data.vehicle}</p>
            <p><strong>Sujet :</strong> ${data.subject}</p>
            <hr/>
            <p><strong>Message :</strong><br/>${data.message.replace(/\n/g, '<br/>')}</p>
        `
    };

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resendBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur Resend: ${errorText}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email envoyé avec succès" })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};