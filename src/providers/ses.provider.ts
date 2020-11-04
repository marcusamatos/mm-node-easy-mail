import aws from 'aws-sdk';
import nodemailer, { Transporter } from 'nodemailer';

import { Provider, SendHtmlData, SendData } from './provider';

const { MAIL_SES_REGION, MAIL_SES_FROM } = process.env as {
  MAIL_SES_REGION: string;
  MAIL_SES_FROM: string;
};

export default class SESProvider implements Provider {
  transport: Transporter;

  constructor() {
    if (!MAIL_SES_REGION || !MAIL_SES_FROM) {
      throw new Error('SES Config not found!');
    }

    this.transport = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: MAIL_SES_REGION,
      }),
    });
  }

  async sendHtml({ to, subject, html }: SendHtmlData): Promise<void> {
    await this.transport.sendMail({
      from: MAIL_SES_FROM,
      to,
      subject,
      html,
    });
  }

  async send({ to, subject, text }: SendData): Promise<void> {
    await this.transport.sendMail({
      from: MAIL_SES_FROM,
      to,
      subject,
      text,
    });
  }
}
