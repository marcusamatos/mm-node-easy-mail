import hb from 'handlebars';
import fs, { promises as fsp } from 'fs';
import LocalProvider from './providers/local.provider';
import SMTPProvider from './providers/smtp.provider';
import GmailProvider from './providers/gmail.provider';
import SESProvider from './providers/ses.provider';
import { Provider } from './providers/provider';

const { MAIL_PROVIDER, MAIL_DEFAULT_TO } = process.env as {
  MAIL_PROVIDER: string;
  MAIL_DEFAULT_TO: string;
};

interface SendMailTemplateData<DataType> {
  to?: string;
  subject: string;
  template_path: string;
  template_data: DataType;
}

export const providers: any = {
  local: LocalProvider,
  smtp: SMTPProvider,
  gmail: GmailProvider,
  ses: SESProvider,
};

class MailService {
  provider: Provider;

  constructor() {
    if (!providers[MAIL_PROVIDER || 'local']) {
      throw new Error(`Mail Provider ${MAIL_PROVIDER} not found!`);
    }

    this.provider = new providers[MAIL_PROVIDER || 'local']();
  }

  async sendEmailTemplate<DataType>({
    to,
    subject,
    template_data,
    template_path,
  }: SendMailTemplateData<DataType>): Promise<void> {
    if (!to && !MAIL_DEFAULT_TO) {
      throw new Error('"to" param not found!');
    }

    if (!fs.existsSync(template_path)) {
      throw new Error(`Template ${template_path} not found!`);
    }

    const templateContent = await fsp.readFile(template_path, 'utf-8');
    const templateCompiled = hb.compile(templateContent.toString());
    const html = templateCompiled(template_data);

    await this.provider.sendHtml({
      to: to || MAIL_DEFAULT_TO,
      subject,
      html,
    });
  }
}

export default new MailService();
