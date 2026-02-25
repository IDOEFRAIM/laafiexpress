import * as Brevo from '@getbrevo/brevo';

export async function POST(req: Request) {
  try {
    const { name, email, message, category, subject } = await req.json();

    console.log('Données reçues:', { name, email, message, category, subject });

    const client = new Brevo.BrevoClient({ apiKey: () => process.env.BREVO_API_KEY ?? '' });

    const payload = {
      subject: subject || 'Nouveau message de LAAFI CARGO',
      htmlContent: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              Nouvelle Idée Reçue
            </h2>
            <p><strong>De :</strong> ${name || 'Visiteur'}</p>
            <p><strong>Email :</strong> ${email || 'Non renseigné'}</p>
            <p><strong>Catégorie :</strong> <span style="background: #f1f5f9; padding: 2px 8px; border-radius: 4px;">${category || 'Général'}</span></p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Message :</strong></p>
            <p style="white-space: pre-wrap; background: #fafafa; padding: 15px; border-radius: 5px;">${message || ''}</p>
          </div>
        </body>
      </html>`,
      sender: { name: process.env.USER_NAME || 'Site Web Laafi', email: process.env.USER_EMAIL },
      to: [{ email: 'LaafiCargoInternational@gmail.com', name: 'Admin Laafi' }],
    } as any;

    const result = await client.transactionalEmails.sendTransacEmail(payload);

    return new Response(JSON.stringify({ success: true, response: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error("Erreur Brevo Details:", error?.response?.body || error);
    return new Response(JSON.stringify({
      error: "Erreur lors de l'envoi",
      details: error?.response?.body?.message || error?.message || String(error)
    }), { status: 500 });
  }
}