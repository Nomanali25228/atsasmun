import nodemailer from 'nodemailer';
import clientPromise from '../src/app/lib/mongodb.js';
import { getEarlyBirdEmailHtml } from '../src/app/lib/earlyBirdTemplate.js';

async function sendToUser(targetEmail) {
  const client = await clientPromise;
  const db = client.db('atsasmun');
  
  let user = await db.collection('registrations_istanbul').findOne({
    Email: { $regex: '^' + targetEmail.trim() + '$', $options: 'i' }
  });

  if (!user) {
    const cols = ['registrations', 'registrations_dubai', 'registrations_baku'];
    for (const colName of cols) {
      try {
        const found = await db.collection(colName).findOne({
          Email: { $regex: '^' + targetEmail.trim() + '$', $options: 'i' }
        });
        if (found) {
          user = found;
          console.log(`Found user in ${colName}!`);
          break;
        }
      } catch (e) {}
    }
  }

  if (!user) {
    console.log(`User not found in DB, sending as test delegate to ${targetEmail}`);
    user = {
      FirstName: 'Noman',
      LastName: 'Ali',
      Email: targetEmail,
      customerId: 'cus_test83jka9821k',
      id: '1789760952509',
      RegistrationType: 'individual'
    };
  }

  const fullName = `${user.FirstName || ''} ${user.LastName || ''}`.trim() || user.FirstName || 'Delegate';
  const customerId = user.customerId || '';
  const id = user.id || '1';
  const isGroup = user.RegistrationType === 'group' || user.type === 'group';

  console.log(`Found user: ${fullName}, email: ${user.Email}, customerId: ${customerId}, id: ${id}`);

  const htmlContent = getEarlyBirdEmailHtml({
    name: fullName,
    customerId: customerId,
    id: id,
    isGroup: isGroup,
    deadline: '5th October, 2026'
  });

  const username = process.env.NEXT_PUBLIC_SMTP_USERNAME || process.env.SMTP_EMAIL;
  const password = process.env.NEXT_PUBLIC_SMTP_PASSWORD || process.env.SMTP_PASS;
  const smtpHost = process.env.NEXT_PUBLIC_SMPT_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || process.env.SMTP_PORT || '465');

  console.log(`Connecting to SMTP host: ${smtpHost}:${smtpPort} as ${username}...`);

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    requireTLS: true,
    auth: {
      user: username,
      pass: password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"Atsas MUN" <${username}>`,
    to: targetEmail,
    subject: `ATSAS MUN Istanbul: Early Bird Discount Offer (Deadline: 5th October)`,
    headers: {
      'X-Entity-Ref-ID': `${Date.now()}-${Math.random()}`,
    },
    html: htmlContent,
  };

  console.log(`Sending Early Bird email to ${targetEmail}...`);
  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent successfully! Message ID:', info.messageId);

  process.exit(0);
}

const target = process.argv[2] || 'butt60902@gmail.com';
sendToUser(target).catch((err) => {
  console.error('Failed to send email:', err);
  process.exit(1);
});
