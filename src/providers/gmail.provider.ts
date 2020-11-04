import nodemailer, { Transporter } from 'nodemailer';

import { Provider, SendHtmlData, SendData } from './provider';

const { MAIL_GMAIL_USER, MAIL_GMAIL_PASS } = process.env as {
  MAIL_GMAIL_USER: string;
  MAIL_GMAIL_PASS: string;
};

export default class GmailProvider implements Provider {
  transport: Transporter;

  constructor() {
    if (!MAIL_GMAIL_USER || !MAIL_GMAIL_PASS) {
      throw new Error('GMAIL Config not found!');
    }

    this.transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: MAIL_GMAIL_USER,
        pass: MAIL_GMAIL_PASS,
      },
    });
  }

  async sendHtml({ to, subject, html }: SendHtmlData): Promise<void> {
    await this.transport.sendMail({
      from: MAIL_GMAIL_USER,
      to,
      subject,
      html,
    });
  }

  async send({ to, subject, text }: SendData): Promise<void> {
    await this.transport.sendMail({
      from: MAIL_GMAIL_USER,
      to,
      subject,
      text,
    });
  }
}
