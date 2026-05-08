import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("[Email] SMTP not configured. Skipping email sending.");
    return;
  }

  const mailOptions = {
    from: `"${data.name}" <${process.env.SMTP_USER}>`,
    to: process.env.OWNER_EMAIL || process.env.SMTP_USER,
    replyTo: data.email,
    subject: `Novo Contato: ${data.subject}`,
    text: `Nome: ${data.name}\nEmail: ${data.email}\n\nMensagem:\n${data.message}`,
    html: `
      <h3>Novo contato via Portfólio</h3>
      <p><strong>Nome:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Assunto:</strong> ${data.subject}</p>
      <br/>
      <p><strong>Mensagem:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("[Email] Contact email sent successfully");
  } catch (error) {
    console.error("[Email] Failed to send email:", error);
  }
}
