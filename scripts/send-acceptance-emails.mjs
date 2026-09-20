import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';

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

const checkHtml = '<span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span>';

function getAcceptanceTemplate(reg) {
    const payment = 'Istanbulpayment';
    const desname = reg.Destinations || 'Istanbul, Turkey';
    const fullName = `${reg.FirstName || ''} ${reg.LastName || ''}`.trim() || reg.FirstName || 'Delegate';
    const userId = reg.id;
    const customerId = reg.customerId || '';
    const isGroup = reg.RegistrationType === 'group';

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
            <td style="margin-bottom: 30px;">
                <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/gpl/90q/wob/Capture.PNG" alt="Eligibility Image" style="width: 100%; max-height: 450px; object-fit: cover;">
            </td>
        </tr>
    </table>

    <table style="width: 100%; max-width: 800px; margin: 40px auto; border-collapse: collapse; background: #ffffff;">
        <tr>
            <td>
                <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/jwv/ano/u8g/Capture2.PNG" alt="Eligibility Image" style="width: 100%; max-height: 450px; object-fit: cover;">
            </td>
        </tr>
    </table>

    <table style="width: 100%; margin: 0px auto; margin-top: -50px; background-color: #fff; padding: 25px 2px 2px 2px;">
        <tr>
            <td style="font-weight: bold; font-size: 16px; padding: 10px; color: #000;">Committee Allocation Policy</td>
        </tr>
        <tr>
            <td style="padding: 10px;">
                <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #333;">
                    <li>AtsasMUN does not guarantee the availability of preferred countries and encourages participants to select alternatives if necessary.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td style="font-weight: bold; font-size: 16px; padding: 10px; color: #000;">Payments</td>
        </tr>
        <tr>
            <td style="padding: 10px;">
                <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #333;">
                    <li>Payments must be made through the official AtsasMUN website.</li>
                    <li>AtsasMUN will not acknowledge payments made to unauthorized individuals claiming to represent the organization.</li>
                    <li>Accepted payment methods include credit/debit cards and international wire transfers.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td style="font-weight: bold; font-size: 16px; padding: 10px; color: #000;">Refund Policy</td>
        </tr>
        <tr>
            <td style="padding: 10px;">
                <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #333;">
                    <li>Subject to the following restrictions, delegates who have made their full payment may ask for a credit voucher or transfer their participation to another AtsasMUN location.</li>
                    <li>Requests have to be submitted sixty days prior to the start of the event. Credit coupons or transfers are only good for AtsasMUN activities.</li>
                    <li>Delegates who only paid an installment will not be eligible for credit vouchers or transfers; the installment will be kept as a cancellation charge.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td style="font-weight: bold; font-size: 16px; padding: 10px; color: #000;">Code of Conduct</td>
        </tr>
        <tr>
            <td style="padding: 10px;">
                <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #333;">
                    <li>Participants must obey the host country's laws and are personally responsible for any damages or misconduct during the conference.</li>
                </ul>
            </td>
        </tr>
    </table>

    <!-- Conference Fee Packages -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 650px; margin: 20px auto; border-collapse: separate; border-spacing: 8px 0; font-family: Arial, sans-serif;">
        <!-- Title Section -->
        <tr>
            <td colspan="3" align="center" style="padding: 30px 10px 15px 10px; font-size: 22px; font-weight: bold; color: #000;">
                Conference Fee Packages
            </td>
        </tr>
        <tr>
            <td colspan="3" align="center" style="padding-bottom: 20px; font-size: 15px; color: #666;">
                Early Bird Packages
            </td>
        </tr>
        <tr>
            <!-- COLUMN 1: Delegation Package -->
            <td width="33.33%" valign="top" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="background: linear-gradient(to right, #00509E, #003A70); color: #ffffff; padding: 14px 8px; text-align: center;">
                    <div style="font-size: 14px; font-weight: bold;">Delegation Package</div>
                    <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #F2B705;">$418 <span style="font-size: 11px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                    <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Bird <span style="color: #2EC4B6; font-weight: bold;">(Save $120)</span></div>
                </div>
                <div style="text-align: center; padding: 8px 4px 4px; font-size: 10px; font-weight: bold; color: #2EC4B6; text-transform: uppercase;">
                    NON-ACCOMMODATION
                </div>
                <div style="padding: 10px 8px 16px; font-size: 11px; line-height: 1.7; color: #333333; text-align: left;">
                    <div style="margin-bottom: 7px;">${checkHtml} ATSASMUN Merch Kit</div>
                    <div style="margin-bottom: 7px;">${checkHtml} Official ATSASMUN Certificate</div>
                    <div style="margin-bottom: 7px;">${checkHtml} Visa Invitation Letter</div>
                    <div style="margin-bottom: 7px;">${checkHtml} United Nations Simulation Sessions</div>
                    <div style="margin-bottom: 7px;">${checkHtml} Professional event photos</div>
                    <div style="margin-bottom: 7px;">${checkHtml} First come First Serve committee Allocation (Limited Spaces)</div>
                    <div style="margin-bottom: 7px;">${checkHtml} Breakfast Every Morning</div>
                    <div style="margin-bottom: 7px;">${checkHtml} 1 Dinner</div>
                </div>
            </td>

            <!-- COLUMN 2: Delegation + Accommodation -->
            <td width="33.33%" valign="top" style="background: #ffffff; border: 2px solid #FF5A5F; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <div style="background: linear-gradient(to right, #FF5A5F, #E0484D); color: #ffffff; padding: 10px 8px 14px; text-align: center;">
                    <div style="display: inline-block; background: #ffffff; color: #FF5A5F; font-size: 9px; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 10px; margin-bottom: 4px;">MOST POPULAR</div>
                    <div style="font-size: 14px; font-weight: bold;">Delegation + Accommodation</div>
                    <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #F2B705;">$549 <span style="font-size: 11px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                    <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Bird <span style="color: #ffffff; font-weight: bold;">(Save $140)</span></div>
                </div>
                <div style="text-align: center; padding: 8px 4px 4px; font-size: 10px; font-weight: bold; color: #2EC4B6; text-transform: uppercase;">
                    ACCOMMODATION INCLUDED
                </div>
                <div style="padding: 10px 8px 16px; font-size: 11px; line-height: 1.7; color: #333333; text-align: left;">
                    <div style="margin-bottom: 7px;">${checkHtml} Everything in Delegation Package</div>
                    <div style="margin-bottom: 7px;">${checkHtml} 4-5 Star Accommodation (Twin Shared Room)</div>
                    <div style="margin-bottom: 7px;">${checkHtml} Airport Arrival Assistance</div>
                    <div style="margin-bottom: 7px;">${checkHtml} Guided City Tour</div>
                    <div style="margin-bottom: 7px;">${checkHtml} 1 Lunch &amp; 2 Dinner</div>
                </div>
            </td>

            <!-- COLUMN 3: Full Experience Package -->
            <td width="33.33%" valign="top" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="background: linear-gradient(to right, #003A70, #002855); color: #ffffff; padding: 14px 8px; text-align: center;">
                    <div style="font-size: 14px; font-weight: bold;">Full Experience Package</div>
                    <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #F2B705;">$689 <span style="font-size: 11px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                    <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Bird <span style="color: #2EC4B6; font-weight: bold;">(Save $150)</span></div>
                </div>
                <div style="text-align: center; padding: 8px 4px 4px; font-size: 10px; font-weight: bold; color: #2EC4B6; text-transform: uppercase;">
                    VIP FULL EXPERIENCE
                </div>
                <div style="padding: 10px 8px 16px; font-size: 11px; line-height: 1.7; color: #333333; text-align: left;">
                    <div style="margin-bottom: 7px;">${checkHtml} Everything in Delegation + Accommodation</div>
                    <div style="margin-bottom: 7px;">${checkHtml} Bosphorus Dinner Cruise Trip</div>
                    <div style="margin-bottom: 7px;">${checkHtml} Airport Arrival &amp; Dropoff Assistance</div>
                    <div style="margin-bottom: 7px;">${checkHtml} Lucky Draw</div>
                    <div style="margin-bottom: 7px;">${checkHtml} Priority Registration</div>
                    <div style="margin-bottom: 7px;">${checkHtml} 2 Lunch &amp; 3 Dinner</div>
                </div>
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

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db('atsasmun');
        const col = db.collection('registrations_istanbul');

        // Fetch all registrations sorted descending by date
        const all = await col.find({}).sort({ createdAt: -1 }).toArray();
        console.log(`Found ${all.length} total registrations in registrations_istanbul`);

        // Deduplicate by email so applicants with multiple submissions get 1 email with their latest details
        const emailMap = new Map();
        for (const reg of all) {
            const em = (reg.Email || '').trim().toLowerCase();
            if (!em || em === 'test@example.com' || !em.includes('@')) {
                console.log(`Skipping invalid/test email: ${em} (ID: ${reg.id})`);
                continue;
            }
            if (!emailMap.has(em)) {
                emailMap.set(em, reg);
            }
        }

        const targets = Array.from(emailMap.values());
        console.log(`Sending Acceptance Letters to ${targets.length} unique registered delegates...\n`);

        let successCount = 0;
        let failCount = 0;

        for (let i = 0; i < targets.length; i++) {
            const reg = targets[i];
            const fullName = `${reg.FirstName || ''} ${reg.LastName || ''}`.trim() || reg.FirstName || 'Delegate';
            const email = reg.Email.trim();
            const customerId = reg.customerId || '';

            console.log(`[${i + 1}/${targets.length}] Sending to: ${fullName} <${email}> (Customer: ${customerId}, ID: ${reg.id})`);

            try {
                const html = getAcceptanceTemplate(reg);
                const info = await transporter.sendMail({
                    from: '"Atsas MUN" <info@atsasmun.com>',
                    to: email,
                    subject: 'YOUR LETTER OF ACCEPTANCE',
                    html
                });

                console.log(`   -> SENT! MessageId: ${info.messageId}`);
                successCount++;

                // Update database to record that the letter was sent
                await col.updateMany(
                    { Email: reg.Email },
                    { $set: { acceptanceLetterSent: true, acceptanceLetterSentAt: new Date().toISOString() } }
                );

                // Small 1.2s delay to comply with Office 365 sending limits
                await sleep(1200);

            } catch (err) {
                console.error(`   -> FAILED to send to ${email}:`, err.message);
                failCount++;
            }
        }

        console.log('\n=========================================');
        console.log(`Finished! Successfully sent: ${successCount}, Failed: ${failCount}`);
        console.log('=========================================');

    } catch (e) {
        console.error('Fatal execution error:', e);
    } finally {
        await client.close();
    }
}

run();
