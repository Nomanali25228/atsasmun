import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.NEXT_PUBLIC_SMTP_USERNAME || process.env.SMTP_EMAIL;
const password = process.env.NEXT_PUBLIC_SMTP_PASSWORD || process.env.SMTP_PASS;
const smtpHost = process.env.NEXT_PUBLIC_SMPT_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || process.env.SMTP_PORT || '465');

async function testMail() {
    console.log("Checking SMTP config...");
    console.log("User:", username);
    console.log("Host:", smtpHost);
    console.log("Port:", smtpPort);

    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
            user: username,
            pass: password,
        },
    });

    try {
        await transporter.verify();
        console.log("SMTP Login SUCCESS! ✅");
        
        const info = await transporter.sendMail({
            from: username,
            to: username,
            subject: 'ATSAS MUN SMTP Test Email',
            text: 'Mubarak ho! SMTP connection successfully kaam kar raha hai.',
        });
        console.log("Test Email Sent Successfully! 🚀 Message ID:", info.messageId);
    } catch (err) {
        console.error("SMTP Login FAILED! ❌", err.message);
    }
}

testMail();
