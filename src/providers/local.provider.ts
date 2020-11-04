import path from 'path';
import fs, { promises as fsp } from 'fs';

import { Provider, SendHtmlData, SendData } from './provider';

const { MAIL_LOCAL_FROM } = process.env as {
  MAIL_LOCAL_FROM?: string;
};

export default class LocalProvider implements Provider {
  async save({
    from,
    to,
    subject,
    content,
  }: {
    to: string;
    subject: string;
    content: string;
    from: string;
  }): Promise<void> {
    if (!fs.existsSync(path.resolve('.', 'data'))) {
      await fsp.mkdir(path.resolve('.', 'data'));
    }

    if (!fs.existsSync(path.resolve('.', 'data', 'emails'))) {
      await fsp.mkdir(path.resolve('.', 'data', 'emails'));
    }

    if (!fs.existsSync(path.resolve('.', 'data', 'emails', to))) {
      await fsp.mkdir(path.resolve('.', 'data', 'emails', to));
    }

    const messagePath = path.resolve('data', 'emails', to);
    const messageFile = path.resolve(messagePath, 'email.html');

    const saveContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>(E-mail) ${subject}</title>
    </head>
    <body>
      <div>
        from: ${from} <br>
        to: ${to} <br>
        subject: ${subject} <b>
      </div>

      <hr />

      <div>
      ${content}
      </div>
    </body>
    </html>`;

    await fsp.writeFile(messageFile, saveContent, 'utf-8');
  }

  async sendHtml({ to, subject, html }: SendHtmlData): Promise<void> {
    await this.save({
      to,
      subject,
      content: html,
      from: MAIL_LOCAL_FROM || 'noreply@localhost',
    });
  }

  async send({ to, subject, text }: SendData): Promise<void> {
    await this.save({
      to,
      subject,
      content: text,
      from: MAIL_LOCAL_FROM || 'noreply@localhost',
    });
  }
}
