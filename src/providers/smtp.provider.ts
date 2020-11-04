import nodemailer, { Transporter } from 'nodemailer';

import { Provider, SendHtmlData, SendData } from './provider';

const {
  MAIL_SMTP_HOST,
  MAIL_SMTP_PORT,
  MAIL_SMTP_SECURE,
  MAIL_SMTP_USER,
  MAIL_SMTP_PASS,
} = process.env as {
  MAIL_SMTP_HOST: string;
  MAIL_SMTP_PORT: string;
  MAIL_SMTP_SECURE: string;
  MAIL_SMTP_USER: string;
  MAIL_SMTP_PASS: string;
};

export default class SMTPProvider implements Provider {
  transport: Transporter;

  constructor() {
    if (
      !MAIL_SMTP_HOST ||
      !MAIL_SMTP_PORT ||
      !MAIL_SMTP_SECURE ||
      !MAIL_SMTP_USER ||
      !MAIL_SMTP_PASS
    ) {
      throw new Error('SMTP Config not found!');
    }

    this.transport = nodemailer.createTransport({
      host: MAIL_SMTP_HOST,
      port: Number(MAIL_SMTP_PORT),
      secure: Boolean(MAIL_SMTP_SECURE), // upgrade later with STARTTLS
      auth: {
        user: MAIL_SMTP_USER,
        pass: MAIL_SMTP_PASS,
      },
    });
  }

  async sendHtml({ to, subject, html }: SendHtmlData): Promise<void> {
    await this.transport.sendMail({
      from: MAIL_SMTP_USER,
      to,
      subject,
      html,
    });
  }

  async send({ to, subject, text }: SendData): Promise<void> {
    await this.transport.sendMail({
      from: MAIL_SMTP_USER,
      to,
      subject,
      text,
    });
  }
}
