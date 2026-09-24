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

export function getDestinationConfig(desname) {
    if (!desname || desname.includes('Istanbul') || desname.includes('Turkey')) {
        return {
            payment: 'Istanbulpayment',
            Hotel: 'G Rotana Hotel (4-5 Star)',
            basicprice: '418',
            accomodationprice: '549',
            fullprice: '689',
            basicSave: '120',
            accomodationSave: '140',
            fullSave: '150',
            basicAfter: '538',
            accomodationAfter: '689',
            fullAfter: '839',
            CityTour: 'Bosphorus Dinner Cruise Trip',
            desname: 'Istanbul, Turkey'
        };
    } else if (desname.includes('Dubai') || desname.includes('UAE')) {
        return {
            payment: 'UAEpayment',
            Hotel: 'Meydan Hotel',
            basicprice: '459',
            accomodationprice: '679',
            fullprice: '799',
            basicSave: '120',
            accomodationSave: '120',
            fullSave: '150',
            basicAfter: '579',
            accomodationAfter: '799',
            fullAfter: '949',
            CityTour: 'Desert Safari',
            desname
        };
    } else if (desname.includes('Baku') || desname.includes('Azerbaijan')) {
        return {
            payment: 'Azerbaijanpayment',
            Hotel: 'Baku Hotel',
            basicprice: '389',
            accomodationprice: '639',
            fullprice: '749',
            basicSave: '110',
            accomodationSave: '110',
            fullSave: '140',
            basicAfter: '499',
            accomodationAfter: '749',
            fullAfter: '889',
            CityTour: 'Baku City Tour',
            desname
        };
    } else if (desname.includes('New York') || desname.includes('USA')) {
        return {
            payment: 'USApayment',
            Hotel: 'New York Hotel',
            basicprice: '459',
            accomodationprice: '679',
            fullprice: '799',
            basicSave: '120',
            accomodationSave: '120',
            fullSave: '150',
            basicAfter: '579',
            accomodationAfter: '799',
            fullAfter: '949',
            CityTour: 'New York City Tour',
            desname
        };
    } else if (desname.includes('Riyadh') || desname.includes('Saudi')) {
        return {
            payment: 'Saudipayment',
            Hotel: 'Hilton Riyadh Hotel',
            basicprice: '649',
            accomodationprice: '799',
            fullprice: '999',
            basicSave: '120',
            accomodationSave: '120',
            fullSave: '150',
            basicAfter: '769',
            accomodationAfter: '919',
            fullAfter: '1149',
            CityTour: 'Riyadh City Tour',
            desname
        };
    } else if (desname.includes('London') || desname.includes('UK')) {
        return {
            payment: 'UKpayment',
            Hotel: 'London Hotel',
            basicprice: '959',
            accomodationprice: '1299',
            fullprice: '1659',
            basicSave: '160',
            accomodationSave: '160',
            fullSave: '200',
            basicAfter: '1119',
            accomodationAfter: '1459',
            fullAfter: '1859',
            CityTour: 'London City Tour',
            desname
        };
    }
    return {
        payment: 'Istanbulpayment',
        Hotel: 'G Rotana Hotel (4-5 Star)',
        basicprice: '418',
        accomodationprice: '549',
        fullprice: '689',
        basicSave: '120',
        accomodationSave: '140',
        fullSave: '150',
        basicAfter: '538',
        accomodationAfter: '689',
        fullAfter: '839',
        CityTour: 'Bosphorus Dinner Cruise Trip',
        desname: desname || 'Istanbul, Turkey'
    };
}

export function getFullAcceptanceTemplate(reg) {
    const cfg = getDestinationConfig(reg.Destinations || '');
    const userName = `${reg.FirstName || ''} ${reg.LastName || ''}`.trim() || reg.FirstName || 'Delegate';
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
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f8f9fa; color:#333;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f8f9fa;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#fff; box-shadow:0 4px 8px rgba(0,0,0,0.1); width: 600px; min-width: 600px;">

                    <!-- Logo Row -->
                    <tr>
                        <td align="center" style="background-color:#fff; padding: 24px 20px 16px 20px;">
                            <img src="https://res.cloudinary.com/dmux089ac/image/upload/v1789575075/oyxcq00z7eykhobketvr.png" alt="ATSAS MUN Logo" width="170" style="display:block; border:0;">
                        </td>
                    </tr>

                    <!-- Background Image Section -->
                    <tr>
                        <td align="center" style="text-align: center;
                            background-color: #010c47 !important;
                            background-image: url('https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/2p9/g6d/6qx/bg.png');
                            background-size: cover;
                            background-repeat: no-repeat;
                            min-height: 30vh;
                            max-width: 100%;
                            background-position: center;
                            color:#ffffff !important;
                            padding:50px 20px;">
                            <h1 style="margin:0; font-size:40px; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; font-weight: 800; text-transform: uppercase;">CONGRATULATIONS!</h1>
                            <p style="margin:16px 0 0; font-size:18px; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;">
                                ${isGroup ? 'Head of Delegate: ' : 'Dear Delegate, '}<strong>${userName}</strong>
                            </p>
                            <p style="margin:10px 0 0; font-size:14px; color: #e2e8f0 !important; -webkit-text-fill-color: #e2e8f0 !important; line-height: 1.5; max-width: 520px; margin-left: auto; margin-right: auto;">
                                You have been selected as one of the delegates at AtsasMUN <strong>${cfg.desname}</strong>.
                                Please find attached the official acceptance letter in this email.
                            </p>
                        </td>
                    </tr>

                </table>

                <!-- Image Section 1 -->
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width: 600px; min-width: 600px; background: #ffffff;">
                    <tr>
                        <td>
                            <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/gpl/90q/wob/Capture.PNG" alt="Letter of Acceptance Page 1" style="width: 100%; display: block; border: 0;">
                        </td>
                    </tr>
                </table>

                <!-- Image Section 2 -->
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width: 600px; min-width: 600px; background: #ffffff;">
                    <tr>
                        <td>
                            <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/jwv/ano/u8g/Capture2.PNG" alt="Letter of Acceptance Page 2" style="width: 100%; display: block; border: 0;">
                        </td>
                    </tr>
                </table>

                <!-- Policies Section -->
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width: 600px; min-width: 600px; background-color: #fff;">
                    <tr>
                        <td style="font-weight: bold; font-size: 16px; padding: 12px 15px 6px; color: #000;">Committee Allocation Policy</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 15px 12px;">
                            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #333;">
                                <li>AtsasMUN does not guarantee the availability of preferred countries and encourages participants to select alternatives if necessary.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px; padding: 12px 15px 6px; color: #000;">Payments</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 15px 12px;">
                            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #333;">
                                <li>Payments must be made through the official AtsasMUN website.</li>
                                <li>AtsasMUN will not acknowledge payments made to unauthorized individuals claiming to represent the organization.</li>
                                <li>Accepted payment methods include credit/debit cards and international wire transfers.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px; padding: 12px 15px 6px; color: #000;">Refund Policy</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 15px 12px;">
                            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #333;">
                                <li>Delegates who have made their full payment may ask for a credit voucher or transfer to another AtsasMUN location.</li>
                                <li>Requests must be submitted sixty days prior to the event.</li>
                                <li>Delegates who only paid an installment will not be eligible for credit vouchers or transfers.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; font-size: 16px; padding: 12px 15px 6px; color: #000;">Code of Conduct</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 15px 12px;">
                            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #333;">
                                <li>Participants must ensure all information provided during registration is accurate.</li>
                                <li>All submitted materials must be original; plagiarism will result in disqualification.</li>
                                <li>Participants must obey the host country's laws.</li>
                                <li>Participants must adhere to the Code of Conduct outlined in the Conference Handbook.</li>
                            </ul>
                        </td>
                    </tr>
                </table>

                <!-- Image Section 3 -->
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width: 600px; min-width: 600px; background: #ffffff;">
                    <tr>
                        <td>
                            <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/gdl/53b/vsi/Capture3.PNG" alt="Letter of Acceptance Page 3" style="width: 100%; display: block; border: 0;">
                        </td>
                    </tr>
                </table>

                <!-- Conference Fee Packages -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 600px; min-width: 600px; max-width: 600px; margin: 20px auto; border-collapse: separate; border-spacing: 8px 0; font-family: Arial, sans-serif; background-color: #fff;">
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
                                <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #F2B705;">$${cfg.basicprice} <span style="font-size: 11px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                                <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Bird <span style="color: #2EC4B6; font-weight: bold;">(Save $${cfg.basicSave})</span></div>
                                <div style="font-size: 10px; color: #e2e8f0; margin-top: 1px; text-decoration: line-through;">After: $${cfg.basicAfter} + 5% TAX</div>
                            </div>
                            <div style="text-align: center; padding: 8px 4px 4px; font-size: 10px; font-weight: bold; color: #2EC4B6; text-transform: uppercase;">
                                NON-ACCOMMODATION
                            </div>
                            <div style="padding: 10px 8px 16px; font-size: 11px; line-height: 1.7; color: #333333; text-align: left;">
                                <div style="margin-bottom: 7px;">${checkHtml} ATSASMUN Merch Kit</div>
                                <div style="margin-bottom: 7px;">${checkHtml} Official ATSASMUN Certificate</div>
                                <div style="margin-bottom: 7px;">${checkHtml} Visa Invitation Letter</div>
                                <div style="margin-bottom: 7px;">${checkHtml} UN Simulation Sessions</div>
                                <div style="margin-bottom: 7px;">${checkHtml} Professional event photos</div>
                                <div style="margin-bottom: 7px;">${checkHtml} First come First Serve Allocation</div>
                                <div style="margin-bottom: 7px;">${checkHtml} Breakfast Every Morning</div>
                                <div style="margin-bottom: 7px;">${checkHtml} 1 Dinner</div>
                            </div>
                        </td>

                        <!-- COLUMN 2: Delegation + Accommodation -->
                        <td width="33.33%" valign="top" style="background: #ffffff; border: 2px solid #FF5A5F; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                            <div style="background: linear-gradient(to right, #FF5A5F, #E0484D); color: #ffffff; padding: 10px 8px 14px; text-align: center;">
                                <div style="display: inline-block; background: #ffffff; color: #FF5A5F; font-size: 9px; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 10px; margin-bottom: 4px;">MOST POPULAR</div>
                                <div style="font-size: 14px; font-weight: bold;">Delegation + Accommodation</div>
                                <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #F2B705;">$${cfg.accomodationprice} <span style="font-size: 11px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                                <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Bird <span style="color: #ffffff; font-weight: bold;">(Save $${cfg.accomodationSave})</span></div>
                                <div style="font-size: 10px; color: #e2e8f0; margin-top: 1px; text-decoration: line-through;">After: $${cfg.accomodationAfter} + 5% TAX</div>
                            </div>
                            <div style="text-align: center; padding: 8px 4px 4px; font-size: 10px; font-weight: bold; color: #FF5A5F; text-transform: uppercase;">
                                ACCOMMODATION INCLUDED
                            </div>
                            <div style="padding: 10px 8px 16px; font-size: 11px; line-height: 1.7; color: #333333; text-align: left;">
                                <div style="margin-bottom: 7px;">${checkHtml} Everything in Delegation Package</div>
                                <div style="margin-bottom: 7px;">${checkHtml} ${cfg.Hotel}</div>
                                <div style="margin-bottom: 7px;">${checkHtml} Twin Shared Room</div>
                                <div style="margin-bottom: 7px;">${checkHtml} Airport Arrival Assistance</div>
                                <div style="margin-bottom: 7px;">${checkHtml} Guided City Tour</div>
                                <div style="margin-bottom: 7px;">${checkHtml} 1 Lunch &amp; 2 Dinner</div>
                            </div>
                        </td>

                        <!-- COLUMN 3: Full Experience Package -->
                        <td width="33.33%" valign="top" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                            <div style="background: linear-gradient(to right, #2EC4B6, #21A99D); color: #ffffff; padding: 14px 8px; text-align: center;">
                                <div style="font-size: 14px; font-weight: bold;">Full Experience Package</div>
                                <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #F2B705;">$${cfg.fullprice} <span style="font-size: 11px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                                <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Bird <span style="color: #ffffff; font-weight: bold;">(Save $${cfg.fullSave})</span></div>
                                <div style="font-size: 10px; color: #e2e8f0; margin-top: 1px; text-decoration: line-through;">After: $${cfg.fullAfter} + 5% TAX</div>
                            </div>
                            <div style="text-align: center; padding: 8px 4px 4px; font-size: 10px; font-weight: bold; color: #2EC4B6; text-transform: uppercase;">
                                VIP FULL EXPERIENCE
                            </div>
                            <div style="padding: 10px 8px 16px; font-size: 11px; line-height: 1.7; color: #333333; text-align: left;">
                                <div style="margin-bottom: 7px;">${checkHtml} Everything in Delegation + Accommodation</div>
                                <div style="margin-bottom: 7px;">${checkHtml} ${cfg.CityTour}</div>
                                <div style="margin-bottom: 7px;">${checkHtml} Airport Arrival &amp; Dropoff Assistance</div>
                                <div style="margin-bottom: 7px;">${checkHtml} Lucky Draw</div>
                                <div style="margin-bottom: 7px;">${checkHtml} Priority Registration</div>
                                <div style="margin-bottom: 7px;">${checkHtml} 2 Lunch &amp; 3 Dinner</div>
                            </div>
                        </td>
                    </tr>
                </table>

                <!-- Payment / WhatsApp Button -->
                ${isGroup ? `
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 600px; min-width: 600px; max-width: 600px; margin: 0 auto; background-color: #fff; font-family: Arial, sans-serif;">
                    <tr>
                        <td align="center" style="padding: 10px 20px 25px 20px;">
                            <a href="https://wa.me/447498072531?text=${encodeURIComponent(`Hello ATSAS MUN Team, I am the Head of Delegate for our group delegation (${userName}) registered for ${cfg.desname}. We would like to finalize our group packages and payment.`)}" target="_blank"
                               style="display: inline-block; padding: 14px 40px; font-size: 16px; font-weight: bold; color: #fff; text-decoration: none; background: linear-gradient(to right, #25D366, #128C7E); border-radius: 6px; box-shadow: 0 4px 8px rgba(37,211,102,0.3);">
                               💬 Contact Us on WhatsApp for Group Payment
                            </a>
                            <p style="margin: 12px 0 0; font-size: 12px; color: #666;">Get custom group delegation invoice, group discount &amp; assistance on WhatsApp (+44 7498 072531)</p>
                        </td>
                    </tr>
                </table>` : `
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 600px; min-width: 600px; max-width: 600px; margin: 0 auto; background-color: #fff; font-family: Arial, sans-serif;">
                    <tr>
                        <td align="center" style="padding: 10px 20px 25px 20px;">
                            <a href="https://www.atsasmun.com/${cfg.payment}/1?customerId=${customerId}&id=${userId}" target="_blank"
                               style="display: inline-block; padding: 14px 40px; font-size: 16px; font-weight: bold; color: #fff; text-decoration: none; background: linear-gradient(to right, #00509E, #003A70, #002855); border-radius: 6px; box-shadow: 0 4px 8px rgba(0,0,0,0.15);">
                               Secure Your Spot — Pay Now
                            </a>
                            <p style="margin: 12px 0 0; font-size: 12px; color: #888;">Payments are 100% secure and encrypted</p>
                        </td>
                    </tr>
                </table>`}

                <!-- Contact & Assistance -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 600px; min-width: 600px; max-width: 600px; margin: 0 auto; background-color: #fff; font-family: Arial, sans-serif;">
                    <tr>
                        <td align="center" style="padding: 20px; background: #f9f9f9; border-top: 1px solid #eee; text-align: center;">
                            <p style="margin: 0 0 6px 0; font-size: 14px; color: #333; line-height: 1.5;">${checkHtml} Visa Invitation Letter can be obtained from us upon request after the payment</p>
                            <p style="margin: 0 0 6px 0; font-size: 14px; font-weight: bold; color: #000;">Should you have any questions, feel free to reach us at:</p>
                            <p style="margin: 0 0 12px 0; font-size: 14px;">
                                <a href="mailto:info@atsasmun.com" target="_blank" style="color: #00509E; font-weight: bold; text-decoration: underline;">info@atsasmun.com</a>
                                &nbsp;|&nbsp;
                                <a href="https://wa.me/447498072531" target="_blank" style="color: #25D366; font-weight: bold; text-decoration: none;">WhatsApp: +44 7498 072531</a>
                            </p>
                            <p style="margin: 0; font-size: 13px; color: #333; font-weight: bold;">We look forward to meeting you in ${cfg.desname}!</p>
                            <p style="margin: 6px 0 0; font-size: 12px; color: #777;">Once again, thank you for registering yourself as a part of this powerful Diplomatic Conference!</p>
                        </td>
                    </tr>
                </table>

                <!-- Footer -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 600px; min-width: 600px; max-width: 600px; margin: 0 auto;">
                    <tr>
                        <td align="center" style="background-color:#003366; color:#fff; padding:20px; text-align: center;">
                            <p style="margin:0; font-size:13px; color: #fff;">Atsas MUN &copy; 2024 Atsas Creation International Ltd</p>
                            <p style="margin:5px 0 0; font-size:11px; color: #e2e8f0;"><em>"Forging a Diplomatic World of Unity and Peace"</em></p>
                        </td>
                    </tr>
                </table>

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
        const eightHoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000);
        const eightHoursAgoIso = eightHoursAgo.toISOString();

        const registrationCollections = [
            'registrations_istanbul',
            'registrations_dubai',
            'registrations_azerbaijan',
            'registrations_usa',
            'registrations_saudi',
            'registrations_uk'
        ];

        const pendingDelegatesMap = new Map();
        const BATCH_LIMIT = 5; // Max 5 emails per run to ensure fast finish under Vercel limits

        // 1. Check all destination collections with direct MongoDB date filter
        for (const colName of registrationCollections) {
            if (pendingDelegatesMap.size >= BATCH_LIMIT) break;

            try {
                const list = await db.collection(colName).find({
                    acceptanceLetterSent: { $ne: true },
                    createdAt: { $lte: eightHoursAgoIso }
                }).limit(BATCH_LIMIT).toArray();

                for (const item of list) {
                    const email = (item.Email || '').trim().toLowerCase();
                    if (!email || email === 'test@example.com' || !email.includes('@')) continue;

                    if (!pendingDelegatesMap.has(email)) {
                        pendingDelegatesMap.set(email, { ...item, sourceCollection: colName });
                        if (pendingDelegatesMap.size >= BATCH_LIMIT) break;
                    }
                }
            } catch (err) {
                console.error(`[CronService] Error reading collection ${colName}:`, err.message);
            }
        }

        // 2. Check notifications collection only if batch limit not yet reached
        if (pendingDelegatesMap.size < BATCH_LIMIT) {
            try {
                const notificationsList = await db.collection('notifications').find({
                    secondEmailSent: { $ne: true },
                    createdAt: { $lte: eightHoursAgoIso }
                }).limit(BATCH_LIMIT).toArray();

                for (const notif of notificationsList) {
                    const email = (notif.Email || '').trim().toLowerCase();
                    if (!email || email === 'test@example.com' || !email.includes('@')) continue;

                    if (!pendingDelegatesMap.has(email)) {
                        pendingDelegatesMap.set(email, {
                            Email: notif.Email,
                            FirstName: notif.FirstName,
                            LastName: '',
                            Destinations: notif.Destinations,
                            id: notif.Idname || notif.id,
                            customerId: notif.customerId || '',
                            RegistrationType: notif.type,
                            sourceCollection: 'notifications'
                        });

                        if (pendingDelegatesMap.size >= BATCH_LIMIT) break;
                    }
                }
            } catch (err) {
                console.error('[CronService] Error reading notifications collection:', err.message);
            }
        }

        const pendingList = Array.from(pendingDelegatesMap.values());
        console.log(`[CronService] Found ${pendingList.length} delegates eligible for 8-hour Acceptance Letter (Batch max: ${BATCH_LIMIT}).`);

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
                const html = getFullAcceptanceTemplate(reg);
                const info = await transporter.sendMail({
                    from: '"Atsas MUN" <info@atsasmun.com>',
                    to: email,
                    subject: 'YOUR LETTER OF ACCEPTANCE',
                    html
                });

                console.log(`[CronService] SENT 8-hour Acceptance Letter to: ${fullName} <${email}> (MsgId: ${info.messageId})`);
                sentCount++;

                const emailRegex = new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');

                // Update the source collection
                if (reg.sourceCollection && reg.sourceCollection !== 'notifications') {
                    await db.collection(reg.sourceCollection).updateMany(
                        { Email: { $regex: emailRegex } },
                        { $set: { acceptanceLetterSent: true, acceptanceLetterSentAt: new Date().toISOString() } }
                    );
                } else {
                    // Update all collections if source collection wasn't specific
                    for (const colName of registrationCollections) {
                        await db.collection(colName).updateMany(
                            { Email: { $regex: emailRegex } },
                            { $set: { acceptanceLetterSent: true, acceptanceLetterSentAt: new Date().toISOString() } }
                        );
                    }
                }

                // Always update notifications collection
                await db.collection('notifications').updateMany(
                    { Email: { $regex: emailRegex } },
                    { $set: { secondEmailSent: true, secondEmailSentAt: new Date().toISOString() } }
                );

                await sleep(1000);
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
