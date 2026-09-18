import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://salmanlsbu_db_user:atsasmun1947@cluster0.b7sexda.mongodb.net/atsasmun?retryWrites=true&w=majority&appName=Cluster0';

const checkHtml = '<span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span>';

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
        auth: {
            user: username,
            pass: password,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
}

function getAcceptanceTemplate(reg) {
    const desname = reg.Destinations || 'Istanbul, Turkey';
    let payment = 'Istanbulpayment';
    if (desname.includes('Dubai') || desname.includes('UAE')) payment = 'UAEpayment';
    else if (desname.includes('Baku') || desname.includes('Azerbaijan')) payment = 'Azerbaijanpayment';
    else if (desname.includes('New York') || desname.includes('USA')) payment = 'USApayment';
    else if (desname.includes('Riyadh') || desname.includes('Saudi')) payment = 'Saudipayment';
    else if (desname.includes('London') || desname.includes('UK')) payment = 'Francepayment';

    const fullName = `${reg.FirstName || ''} ${reg.LastName || ''}`.trim() || reg.FirstName || 'Delegate';
    const userId = reg.id || reg.Idname || '';
    const customerId = reg.customerId || '';
    const isGroup = reg.RegistrationType === 'group' || reg.type === 'group';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Letter of Acceptance</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#ffffff; color:#333;">
    <table style="width: 100%; max-width: 800px; margin: 20px auto; text-align: center; background: #ffffff; border-collapse: collapse;">
        <!-- Logo Row -->
        <tr>
            <td align="center" style="background-color:#fff; padding: 24px 20px 16px 20px;">
                <img src="https://res.cloudinary.com/dmux089ac/image/upload/v1789575075/oyxcq00z7eykhobketvr.png" alt="ATSAS MUN Logo" width="170">
            </td>
        </tr>
        <!-- Background Image Section -->
        <tr>
            <td align="center" style="text-align: center; background-color: #010c47 !important; background-image: url('https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/2p9/g6d/6qx/bg.png'); background-size: cover; background-repeat: no-repeat; min-height: 30vh; max-width: 100%; background-position: center; color:#ffffff !important; padding:70px;">
                <h1 style="margin:0; font-size:50px; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;">CONGRATULATIONS!</h1>
                <p style="font-size: 1.4rem; font-weight: bold; margin: 10px 0; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; text-decoration: underline;">
                    ${isGroup ? 'Head of Delegate: ' : ''}${fullName}
                </p>
                <p style="font-size: 0.9rem; margin: 30px 30px 10px 20px; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;">
                    You have been selected as one of the delegates at AtsasMUN ${desname}. Please find attached the official acceptance letter in this email.
                </p>
            </td>
        </tr>
    </table>

    <table style="width: 100%; max-width: 800px; margin: 20px auto; border-collapse: collapse; background: #ffffff;">
        <tr>
            <td style="padding: 10px; font-size: 18px; color: #333;">
                Dear Candidate,
            </td>
        </tr>
        <tr>
            <td style="padding: 10px; font-size: 15px; color: #333; line-height: 1.6;">
                It gives us immense pleasure to inform you that your registration for the <strong>AtsasMUN ${desname}</strong> has been officially approved!
            </td>
        </tr>
        <tr>
            <td style="padding: 10px; font-size: 15px; color: #333; line-height: 1.6;">
                You were among thousands of applicants, and through careful consideration of your qualities and potential, you were accepted.
            </td>
        </tr>
        <tr>
            <td style="padding: 10px; font-size: 15px; color: #333; line-height: 1.6;">
                In the meantime, the Organizing Committee of the conference is working hard to ensure that this event is educational, memorable, and thought-provoking.
            </td>
        </tr>
        <tr>
            <td style="padding: 10px; font-size: 15px; color: #333; line-height: 1.6;">
                You can reserve your seat by choosing from the packages below. We look forward to meeting you!
            </td>
        </tr>
    </table>

    <!-- Packages Table -->
    <table style="width: 100%; max-width: 800px; margin: 20px auto; border-collapse: collapse; text-align: left; font-family: Arial, sans-serif;">
        <tr style="background: #003366; color: white;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">CONFERENCE ONLY</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">SILVER</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">GOLD</th>
        </tr>
        <tr>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Access to all committee sessions
            </td>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} 3 Nights in a 4-star hotel (Double/Triple Sharing)
            </td>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} 4 Nights in a 4-star hotel (Single / Double Sharing)
            </td>
        </tr>
        <tr>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Conference materials &amp; delegate kit
            </td>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Access to all committee sessions
            </td>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Access to all committee sessions
            </td>
        </tr>
        <tr>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Participation certificate
            </td>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Conference materials &amp; delegate kit
            </td>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Conference materials &amp; delegate kit
            </td>
        </tr>
        <tr>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Awards &amp; recognitions
            </td>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Participation certificate
            </td>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Participation certificate
            </td>
        </tr>
        <tr>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Networking sessions
            </td>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Awards &amp; recognitions
            </td>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Awards &amp; recognitions
            </td>
        </tr>
        <tr>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Free visa support &amp; guidance
            </td>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Networking sessions
            </td>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Networking sessions
            </td>
        </tr>
        <tr>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Coffee, tea &amp; snacks
            </td>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Free visa support &amp; guidance
            </td>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Free visa support &amp; guidance
            </td>
        </tr>
        <tr>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Early Bird: $289 + 5% TAX
            </td>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Grand Diplomatic Dinner
            </td>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Grand Diplomatic Dinner
            </td>
        </tr>
        <tr>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Professional event photos
            </td>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} 1 Lunch &amp; 2 Dinner
            </td>
            <td style="background: #f8f9fa; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} 2 Lunch &amp; 3 Dinner
            </td>
        </tr>
        <tr>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Breakfast Every Morning &amp; 1 Dinner
            </td>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Early Bird: $549 + 5% TAX
            </td>
            <td style="background: #fff; color: #333; font-size: 12px; padding: 8px; border: 1px solid #ddd; text-align: left;">
                ${checkHtml} Early Bird: $689 + 5% TAX
            </td>
        </tr>
    </table>

    <!-- Payment Section -->
    ${isGroup ? '' : `
    <table style="width: 100%; max-width: 800px; margin: 20px auto; font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
        <tr>
            <td style="font-weight: bold; font-size: 18px; color: #000; padding-bottom: 10px;">Payment</td>
        </tr>
        <tr>
            <td style="font-size: 15px; color: #333; padding-bottom: 20px;">You can pay at the link below</td>
        </tr>
        <tr>
            <td>
                <a href="https://www.atsasmun.com/${payment}/1?userid=${userId}&customerId=${customerId}"
                   style="display: inline-block; padding: 12px 80px; font-size: 16px; font-weight: bold; color: #fff; text-decoration: none; border-radius: 6px; background: linear-gradient(to right, #00509E, #003A70, #002855);">
                   Pay Now
                </a>
            </td>
        </tr>
    </table>`}

    <!-- Contact & Assistance -->
    <table style="width: 100%; max-width: 800px; margin: 40px auto; text-align: center; padding: 20px; background: #f9f9f9; border-radius: 10px; border-collapse: collapse;">
        <tr>
            <td style="padding: 20px; font-size:19px; color:#333; line-height: 1.5;">
                ${checkHtml} Visa Invitation Letter can be obtained from us upon request after the payment
            </td>
        </tr>
        <tr>
            <td style="padding: 10px; font-size: 17px; color: #333;">
                Should you have any questions, feel free to reach us at
                <a href="mailto:info@atsasmun.com" target="_blank" style="text-decoration: underline; font-weight: bold; color: #000000;">info@atsasmun.com</a>. We will be happy to assist you.
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; font-size: 1rem; color: black; font-weight: bold;">
                We look forward to meeting you in ${desname}!
            </td>
        </tr>
        <tr>
            <td style="padding: 0px 10px 10px 0px; font-size: 0.9rem; color: #333; line-height: 1.5;">
                Once again, thank you for registering yourself as a part of this powerful Diplomatic Conference!
            </td>
        </tr>
    </table>

    <!-- Footer -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td align="center" style="background-color:#003366; color:#fff; padding:20px; margin:0; font-size:14px;">
                <p style="margin:0; font-size:14px;">Atsas MUN &copy; 2024 Atsas Creation International Ltd</p>
                <p style="margin:5px 0 0; font-size:12px; color: #fff;"><em>"Forging a Diplomatic World of Unity and Peace"</em></p>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let isRunning = false;

export async function processEightHourReminders() {
    if (isRunning) {
        console.log('[CronService] Reminder job already running. Skipping concurrent run.');
        return { message: 'Job already in progress', count: 0 };
    }

    isRunning = true;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('atsasmun');
        const now = new Date();
        const eightHoursInMs = 8 * 60 * 60 * 1000;

        const registrationCollections = [
            'registrations_istanbul',
            'registrations_dubai',
            'registrations_azerbaijan',
            'registrations_usa',
            'registrations_saudi',
            'registrations_uk'
        ];

        // Gather all registrations across collections that need the 2nd email
        const pendingDelegatesMap = new Map();

        for (const colName of registrationCollections) {
            try {
                const list = await db.collection(colName).find({
                    acceptanceLetterSent: { $ne: true }
                }).toArray();

                for (const item of list) {
                    const email = (item.Email || '').trim().toLowerCase();
                    if (!email || email === 'test@example.com' || !email.includes('@')) continue;

                    const createdDate = new Date(item.createdAt || (item._id && item._id.getTimestamp ? item._id.getTimestamp() : 0));
                    const diff = now - createdDate;

                    if (diff >= eightHoursInMs) {
                        if (!pendingDelegatesMap.has(email)) {
                            pendingDelegatesMap.set(email, { ...item, sourceCollection: colName });
                        }
                    }
                }
            } catch (err) {
                console.error(`[CronService] Error reading collection ${colName}:`, err.message);
            }
        }

        // Also check notifications collection for any records not already sent
        try {
            const notificationsList = await db.collection('notifications').find({
                secondEmailSent: { $ne: true }
            }).toArray();

            for (const notif of notificationsList) {
                const email = (notif.Email || '').trim().toLowerCase();
                if (!email || email === 'test@example.com' || !email.includes('@')) continue;

                const createdDate = new Date(notif.createdAt || (notif._id && notif._id.getTimestamp ? notif._id.getTimestamp() : 0));
                const diff = now - createdDate;

                if (diff >= eightHoursInMs && !pendingDelegatesMap.has(email)) {
                    // Try to resolve customerId from registration collections
                    let customerId = notif.customerId || '';
                    if (!customerId) {
                        for (const colName of registrationCollections) {
                            const foundReg = await db.collection(colName).findOne({
                                Email: { $regex: new RegExp(`^${email}$`, 'i') }
                            });
                            if (foundReg && foundReg.customerId) {
                                customerId = foundReg.customerId;
                                break;
                            }
                        }
                    }

                    pendingDelegatesMap.set(email, {
                        Email: notif.Email,
                        FirstName: notif.FirstName,
                        Destinations: notif.Destinations,
                        id: notif.Idname || notif.id,
                        customerId: customerId,
                        RegistrationType: notif.type,
                        sourceCollection: 'notifications'
                    });
                }
            }
        } catch (err) {
            console.error('[CronService] Error reading notifications collection:', err.message);
        }

        const pendingList = Array.from(pendingDelegatesMap.values());
        console.log(`[CronService] Found ${pendingList.length} delegates eligible for 8-hour Acceptance Letter.`);

        if (pendingList.length === 0) {
            return { message: 'No pending 8-hour reminders', count: 0, sent: 0 };
        }

        const transporter = getTransporter();
        let sentCount = 0;
        let failCount = 0;

        for (const reg of pendingList) {
            const email = (reg.Email || '').trim();
            const fullName = `${reg.FirstName || ''} ${reg.LastName || ''}`.trim() || reg.FirstName || 'Delegate';

            try {
                const html = getAcceptanceTemplate(reg);
                const info = await transporter.sendMail({
                    from: '"Atsas MUN" <info@atsasmun.com>',
                    to: email,
                    subject: 'YOUR LETTER OF ACCEPTANCE',
                    html
                });

                console.log(`[CronService] SENT 8-hour Acceptance Letter to: ${fullName} <${email}> (MsgId: ${info.messageId})`);
                sentCount++;

                // Mark as sent in all registration collections
                for (const colName of registrationCollections) {
                    await db.collection(colName).updateMany(
                        { Email: { $regex: new RegExp(`^${email}$`, 'i') } },
                        { $set: { acceptanceLetterSent: true, acceptanceLetterSentAt: new Date().toISOString() } }
                    );
                }

                // Mark as sent in notifications collection
                await db.collection('notifications').updateMany(
                    { Email: { $regex: new RegExp(`^${email}$`, 'i') } },
                    { $set: { secondEmailSent: true, secondEmailSentAt: new Date().toISOString() } }
                );

                await sleep(1200); // Friendly rate limit for Office 365
            } catch (err) {
                console.error(`[CronService] Failed sending to ${email}:`, err.message);
                failCount++;
            }
        }

        return {
            message: 'Reminder job finished',
            eligible: pendingList.length,
            sent: sentCount,
            failed: failCount
        };

    } catch (err) {
        console.error('[CronService] Fatal error in reminder execution:', err);
        return { error: err.message };
    } finally {
        await client.close();
        isRunning = false;
    }
}
