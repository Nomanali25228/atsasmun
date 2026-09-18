import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';
import { getFullAcceptanceTemplate } from '../src/app/lib/cronService.js';

const targetEmail = process.argv[2] || 'butt60902@gmail.com';
const uri = 'mongodb+srv://salmanlsbu_db_user:atsasmun1947@cluster0.b7sexda.mongodb.net/atsasmun?retryWrites=true&w=majority&appName=Cluster0';

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'info@atsasmun.com',
        pass: 'Abiman0786@'
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('atsasmun');
        
        console.log(`Processing: ${targetEmail}`);

        let reg = await db.collection('registrations_istanbul')
            .find({ Email: { $regex: new RegExp(`^${targetEmail}$`, 'i') } })
            .sort({ createdAt: -1 })
            .limit(1)
            .next();

        if (!reg) {
            reg = await db.collection('notifications')
                .find({ Email: { $regex: new RegExp(`^${targetEmail}$`, 'i') } })
                .sort({ createdAt: -1 })
                .limit(1)
                .next();
        }

        if (!reg) {
            console.error(`Not found for email: ${targetEmail}`);
            return;
        }

        console.log('Registration details:', {
            id: reg.id || reg.Idname,
            customerId: reg.customerId,
            Name: `${reg.FirstName} ${reg.LastName || ''}`.trim(),
            Email: reg.Email
        });

        const html = getFullAcceptanceTemplate(reg);

        const info = await transporter.sendMail({
            from: '"Atsas MUN" <info@atsasmun.com>',
            to: targetEmail,
            subject: 'YOUR LETTER OF ACCEPTANCE',
            html
        });

        console.log(`SUCCESS! Sent full Acceptance Letter to ${targetEmail}`);
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);

    } catch (err) {
        console.error('Error sending email:', err);
    } finally {
        await client.close();
    }
}

run();
