export interface SendHtmlData {
  to: string;
  subject: string;
  html: string;
}

export interface SendData {
  to: string;
  subject: string;
  text: string;
}

export interface Provider {
  sendHtml({ to, subject, html }: SendHtmlData): Promise<void>;

  send({ to, subject, text }: SendData): Promise<void>;
}
