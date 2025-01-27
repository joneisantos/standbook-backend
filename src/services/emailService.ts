import nodemailer from 'nodemailer';

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com', // Substitua pelo host SMTP do seu provedor
  port: 587, // Porta SMTP
  auth: {
    user: 'standbook@outlook.com.br', // Substitua pelo seu usuário SMTP
    pass: 'basicAuthentication', // Substitua pela sua senha SMTP
  },
});

/**
 * Envia um e-mail utilizando o Nodemailer.
 * @param to - Endereço de e-mail do destinatário.
 * @param subject - Assunto do e-mail.
 * @param text - Conteúdo do e-mail em texto simples.
 * @param html - Conteúdo do e-mail em HTML (opcional).
 */
export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string
): Promise<void> {
  try {
    const info = await transporter.sendMail({
      from: '"Nome do Remetente" <no-reply@seudominio.com>', // Substitua pelo endereço de e-mail do remetente
      to,
      subject,
      text,
      html,
    });
    console.log('E-mail enviado: %s', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw new Error('Erro ao enviar e-mail');
  }
}
