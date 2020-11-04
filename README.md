# MM Node Easy Mail

Easy way to send mail with node application.

## Supports

- Local Test (save message in file)
- Amazon SES
- SMTP
- Gmail

## How to use

Install:

```
yarn add mm-node-easy-mail
```

Create a template `templates/register-mail.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>


  Hello {{name}},<br />
  Your registration code is here! <br /><br />

  Code: {{code}}

</body>
</html>
```

Send E-mail:

```js
const path = require('path');
const {mailService} = require('mm-node-easy-mail');

mailService.sendHtml({
  to: 'emailto@gmail.com',
  subject: 'Confirm Registration',
  template_data: {
    name: 'Marcus Matos',
    code: 'QWE123'
  },
  template_path: path.resolve(__dirname, 'templates/register-mail.html')
});
```

## Confugure ENV for SMTP

```
MAIL_PROVIDER="smtp"
MAIL_SMTP_HOST="smtp.example.com"
MAIL_SMTP_PORT="587"
MAIL_SMTP_SECURE="false"
MAIL_SMTP_USER="noreply@example.com"
MAIL_SMTP_PASS="******"
```

## Confugure ENV for Gmail

```
MAIL_PROVIDER="gmail"
MAIL_GMAIL_USER="noreply@example.com"
MAIL_GMAIL_PASS="******"
```

## Confugure ENV for Amazon SES

```
MAIL_PROVIDER="ses"
MAIL_SES_REGION="sa-east-1"
MAIL_SES_FROM="noreply@example.com"

AWS_ACCESS_KEY_ID="******"
AWS_SECRET_ACCESS_KEY="******"
AWS_DEFAULT_REGION="sa-east-1"
```
