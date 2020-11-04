import path from 'path';
import fs, { promises as fsp } from 'fs';
import mailService from '../src/mail.service';

it('should send e-mail', async () => {
  await mailService.sendEmailTemplate({
    template_data: {
      name: 'Marcus Matos',
      code: 'QWE123',
    },
    template_path: path.resolve(__dirname, 'template.html'),
    subject: 'onfirm Registration',
    to: 'emailto@gmail.com',
  });

  expect(
    fs.existsSync(
      path.resolve(__dirname, '../data/emails/emailto@gmail.com/email.html'),
    ),
  ).toBeTruthy();
  const content = await fsp.readFile(
    path.resolve(__dirname, '../data/emails/emailto@gmail.com/email.html'),
    'utf-8',
  );

  expect(content).toMatch(/Hello Marcus Matos/);
  expect(content).toMatch(/Code: QWE123/);
});
