import nodemailer from 'nodemailer';
import { MailAdapter, SendMailDTO } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: Number(process.env.MAILER_PORT),
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailDTO): Promise<void> {

    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.io>',
      to: 'adriano.olr@gmail.com',
      subject,
      html: body,
    })
  }
}