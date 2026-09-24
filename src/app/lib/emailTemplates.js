import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';
import { getFullAcceptanceTemplate, getDestinationConfig } from './cronService.js';
import { getEarlyBirdEmailHtml } from './earlyBirdTemplate.js';

const uri = process.env.MONGODB_URI || 'mongodb+srv://salmanlsbu_db_user:atsasmun1947@cluster0.b7sexda.mongodb.net/atsasmun?retryWrites=true&w=majority&appName=Cluster0';

function getTransporter() {
    const username = process.env.NEXT_PUBLIC_SMTP_USERNAME || process.env.SMTP_EMAIL || 'info@atsasmun.com';
    const password = process.env.NEXT_PUBLIC_SMTP_PASSWORD || process.env.SMTP_PASS || 'Abiman0786@';
    const smtpHost = process.env.NEXT_PUBLIC_SMPT_HOST || process.env.SMTP_HOST || 'smtp.office365.com';
    const smtpPort = parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || process.env.SMTP_PORT || '587');

    return nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: false,
        requireTLS: true,
        auth: { user: username, pass: password },
        tls: { rejectUnauthorized: false }
    });
}

/**
 * 1st Email Template: Registration Confirmation
 */
export function getRegistrationConfirmationHtml(reg) {
    const fullName = `${reg.FirstName || reg.firstName || ''} ${reg.LastName || reg.lastName || ''}`.trim() || reg.FirstName || 'Delegate';
    const destination = reg.Destinations || reg.destination || 'Istanbul, Turkey';
    const isGroup = reg.RegistrationType === 'group' || reg.type === 'group';

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atsas MUN Registration Confirmation</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f8f9fa; color:#333;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f8f9fa;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#fff; box-shadow:0 4px 8px rgba(0,0,0,0.1); width: 600px; min-width: 600px;">
                    <!-- LOGO -->
                    <tr>
                        <td align="center" style="background-color:#fff; padding: 24px 20px 16px 20px;">
                            <img src="https://res.cloudinary.com/dmux089ac/image/upload/v1789575075/oyxcq00z7eykhobketvr.png" 
                                 alt="ATSAS MUN Logo" width="170" style="display:block; border:0;">
                        </td>
                    </tr>
                    <!-- HEADER HERO -->
                    <tr>
                        <td align="center" style="text-align: center;
                            background-color: #010c47 !important;
                            background-image: url('https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/6tz/dj7/j5a/%23010c47.png');
                            background-size: cover;
                            background-repeat: no-repeat;
                            min-height: 25vh;
                            color:#ffffff !important;
                            padding:50px 20px;">
                            <h1 style="margin:0; font-size:38px; color: #ffffff !important; font-weight: 800; text-transform: uppercase;">WELCOME TO ATSAS MUN</h1>
                            <p style="margin:16px 0 0; font-size:18px; color: #ffffff !important;">
                                ${isGroup ? 'Head of Delegate: ' : 'Dear Delegate, '}<strong>${fullName}</strong>
                            </p>
                            <p style="margin:10px 0 0; font-size:14px; color: #e2e8f0 !important; line-height: 1.5; max-width: 500px; margin-left: auto; margin-right: auto;">
                                Thank you for registering for Atsas MUN <strong>${destination}</strong>. Your application has been successfully received!
                            </p>
                        </td>
                    </tr>
                    <!-- BODY NOTICE -->
                    <tr>
                        <td align="center" style="padding:28px 24px;">
                            <h2 style="margin:0; font-size:20px; color:#010c47; font-weight: bold;">Application Under Review</h2>
                            <hr style="width:60%; border:0; border-top:1px solid #eee; margin: 16px auto;">
                            <p style="font-size:15px; color: #444; line-height: 1.6; margin: 0;">
                                We are pleased to inform you that your registration has been entered into our diplomatic admissions pool. Shortlisted delegates will receive their official <strong>Letter of Acceptance</strong> and package details shortly.
                            </p>
                        </td>
                    </tr>
                    <!-- COMMITTEES SECTION -->
                    <tr>
                        <td style="padding: 10px 24px 24px; background-color: #f8fafc;">
                            <h3 style="font-size: 16px; margin: 0 0 16px; color: #1e293b; text-align: center; font-weight: bold;">Integrated UN Simulation Committees:</h3>
                            <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center" width="33.3%">
                                        <img src="https://e75ca47a0b.imgdist.com/pub/bfra/ve0zzru6/0w6/l4q/ind/Logo-removebg-preview.png" alt="UNSC" width="70" style="display:block;">
                                        <p style="margin: 8px 0 0; font-size: 13px; font-weight: bold; color: #003366;">UNSC</p>
                                    </td>
                                    <td align="center" width="33.3%">
                                        <img src="https://e75ca47a0b.imgdist.com/pub/bfra/ve0zzru6/fkx/597/d2w/Logo2-removebg-preview.png" alt="UNHRC" width="70" style="display:block;">
                                        <p style="margin: 8px 0 0; font-size: 13px; font-weight: bold; color: #003366;">UNHRC</p>
                                    </td>
                                    <td align="center" width="33.3%">
                                        <img src="https://e75ca47a0b.imgdist.com/pub/bfra/ve0zzru6/s95/e76/st0/Logo3-removebg-preview.png" alt="UNDP" width="70" style="display:block;">
                                        <p style="margin: 8px 0 0; font-size: 13px; font-weight: bold; color: #003366;">UNDP</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- FOOTER -->
                    <tr>
                        <td align="center" style="background-color:#003366; color:#fff; padding:20px; text-align: center;">
                            <p style="margin:0; font-size:13px; color: #fff;">Atsas MUN &copy; 2026 Atsas Creation International Ltd</p>
                            <p style="margin:5px 0 0; font-size:11px; color: #cbd5e1;"><em>"Forging a Diplomatic World of Unity and Peace"</em></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

/**
 * Generate email content for any template type
 */
export function generateEmailContent(templateType, reg) {
    const fullName = `${reg.FirstName || reg.firstName || ''} ${reg.LastName || reg.lastName || ''}`.trim() || reg.FirstName || 'Delegate';
    const destination = reg.Destinations || reg.destination || 'Istanbul, Turkey';

    switch (templateType) {
        case 'confirmation':
            return {
                subject: `Atsas MUN — Registration Received (${destination})`,
                html: getRegistrationConfirmationHtml(reg),
                title: '1st Email — Registration Confirmation'
            };

        case 'acceptance':
            return {
                subject: 'YOUR LETTER OF ACCEPTANCE — Atsas MUN',
                html: getFullAcceptanceTemplate(reg),
                title: '2nd Email — Official Acceptance Letter'
            };

        case 'early_bird':
            return {
                subject: `Early Bird Discount Extended — Atsas MUN ${destination}`,
                html: getEarlyBirdEmailHtml({
                    name: fullName,
                    customerId: reg.customerId || '',
                    id: reg.id || reg.Idname || '1',
                    isGroup: reg.RegistrationType === 'group' || reg.type === 'group',
                    deadline: 'Limited Time Offer'
                }),
                title: '3rd Email — Early Bird Discount Offer'
            };

        default:
            throw new Error(`Unknown email template: ${templateType}`);
    }
}

/**
 * Send manual email to a delegate and update database
 */
export async function sendManualEmail({ templateType, reg, targetCollection }) {
    const email = (reg.Email || reg.email || '').trim();
    if (!email || !email.includes('@')) {
        throw new Error('Valid delegate email is required.');
    }

    const { subject, html } = generateEmailContent(templateType, reg);
    const transporter = getTransporter();

    const info = await transporter.sendMail({
        from: '"Atsas MUN" <info@atsasmun.com>',
        to: email,
        subject,
        html
    });

    console.log(`[ManualSend] Successfully sent ${templateType} to ${email} (MsgId: ${info.messageId})`);

    // Update database records
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('atsasmun');
        const emailRegex = new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');

        const updateFields = {};
        if (templateType === 'acceptance') {
            updateFields.acceptanceLetterSent = true;
            updateFields.acceptanceLetterSentAt = new Date().toISOString();
        } else if (templateType === 'confirmation') {
            updateFields.firstEmailSent = true;
            updateFields.firstEmailSentAt = new Date().toISOString();
        } else if (templateType === 'early_bird') {
            updateFields.earlyBirdSent = true;
            updateFields.earlyBirdSentAt = new Date().toISOString();
        }

        const registrationCollections = [
            'registrations_istanbul',
            'registrations_dubai',
            'registrations_azerbaijan',
            'registrations_usa',
            'registrations_saudi',
            'registrations_uk'
        ];

        // If target collection is known, update it directly; otherwise update all registration collections
        if (targetCollection && targetCollection.startsWith('registrations_')) {
            await db.collection(targetCollection).updateMany({ Email: { $regex: emailRegex } }, { $set: updateFields });
        } else {
            for (const c of registrationCollections) {
                await db.collection(c).updateMany({ Email: { $regex: emailRegex } }, { $set: updateFields });
            }
        }

        // Also update notifications collection
        if (templateType === 'acceptance') {
            await db.collection('notifications').updateMany(
                { Email: { $regex: emailRegex } },
                { $set: { secondEmailSent: true, secondEmailSentAt: new Date().toISOString() } }
            );
        }

        return {
            success: true,
            message: `Email (${templateType}) successfully sent to ${email}`,
            messageId: info.messageId,
            updatedFields: updateFields
        };
    } finally {
        await client.close();
    }
}
