"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const locale = formData.get("locale") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Campos obrigatórios faltando" };
  }

  const isEnglish = locale === "en";
  const emailSubject = isEnglish
    ? `Contato via Portfólio (EN) - ${name}`
    : `Contato via Portfólio (PT) - ${name}`;

  // Template HTML limpo para não parecer mensagem de robô quando você responder
  const htmlTemplate = `
    <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
      <div style="margin-bottom: 20px; font-size: 14px; color: #666;">
        <strong>Nova mensagem de:</strong> ${name} &lt;${email}&gt;<br />
        <strong>Origem:</strong> gothd.dev (${isEnglish ? "Inglês" : "Português"})
      </div>
      <div style="padding: 15px; border-left: 3px solid #ccc; background-color: #f9f9f9;">
        ${message.replace(/\n/g, "<br>")}
      </div>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: "Contato Gothd <contato@gothd.dev>",
      to: "ruanalt@aol.com",
      subject: emailSubject,
      replyTo: email, // Garante que ao clicar em "Responder", vai para o visitante
      html: htmlTemplate,
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
