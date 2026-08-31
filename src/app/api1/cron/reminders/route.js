import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { collections } from '@/app/lib/db';

export async function GET(request) {
    // Basic security check (optional: add a secret token as a query param)
    // To prevent random people from triggering it
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const username = process.env.NEXT_PUBLIC_SMTP_USERNAME || process.env.SMTP_EMAIL;
    const password = process.env.NEXT_PUBLIC_SMTP_PASSWORD || process.env.SMTP_PASS;
    const smtpHost = process.env.NEXT_PUBLIC_SMPT_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || process.env.SMTP_PORT || '465');

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
        // 1. Get all pending notifications
        const allNotifications = await collections.notifications.getAll();
        const now = new Date();
        const eightHoursInMs = 8 * 60 * 60 * 1000;

        const pending = allNotifications.filter(notif => {
            const created = new Date(notif.createdAt);
            const diff = now - created;
            // Send if older than 8 hours AND second email hasn't been sent yet
            return diff >= eightHoursInMs && !notif.secondEmailSent;
        });

        console.log(`Cron execution: Found ${pending.length} pending emails to send.`);

        let sentCount = 0;

        for (const notif of pending) {
            try {
                // Destination-specific configuration
                let payment = '';
                let Hotel = '';
                let basicprice = '';
                let fullprice = '';
                let CityTour = '';
                let serves1 = '';
                let serves2 = '';
                let country = '';
                let para = '';
                const desname = notif.Destinations;
                const userName = notif.FirstName;
                const userId = notif.Idname;
                const startdate = notif.startdate;
                const enddate = notif.enddate;
                const month = notif.month;
                const year = notif.year;

                if (desname === 'Istanbul, Turkey') {
                    payment = 'Istanbulpayment';
                    Hotel = 'G Rotana Hotel';
                    basicprice = '418';
                    fullprice = '549';
                    CityTour = 'Visa invitation letter';
                    serves1 = 'Airport Assistance (Arrival)';
                    serves2 = 'Istanbul City Tour';
                    country = 'Turkiye';
                    para = '';
                } else if (desname === 'Dubai, UAE') {
                    payment = 'UAEpayment';
                    Hotel = 'Meydan Hotel, Meydan,';
                    basicprice = '459';
                    fullprice = '679';
                    CityTour = 'Desert safari';
                    serves1 = 'Visa invitation letter';
                    serves2 = 'Airport Assistance (Arrival)';
                    country = 'UAE';
                    para = '';
                } else if (desname === 'Baku, Azerbaijan') {
                    payment = 'Azerbaijanpayment';
                    Hotel = '';
                    basicprice = '389';
                    fullprice = '639';
                    CityTour = 'Baku City Tour';
                    serves1 = '';
                    serves2 = '';
                    country = 'Azerbaijan';
                    para = '';
                } else if (desname === 'New York, USA') {
                    payment = 'USApayment';
                    Hotel = '';
                    basicprice = '459';
                    fullprice = '679';
                    CityTour = 'New York City Tour';
                    serves1 = '';
                    serves2 = '';
                    country = 'USA';
                    para = '';
                } else if (desname === 'Riyadh, Saudi Arabia') {
                    payment = 'Saudipayment';
                    Hotel = 'Hilton Riyadh Hotel';
                    basicprice = '649';
                    fullprice = '799';
                    CityTour = 'Riyadh City Tour';
                    serves1 = '';
                    serves2 = '';
                    country = 'Saudi Arabia';
                    para = '';
                } else if (desname === 'London, UK') {
                    payment = 'UKpayment';
                    Hotel = 'Sunway Putra Hotel';
                    basicprice = '959';
                    fullprice = '1659';
                    CityTour = 'London City Tour';
                    serves1 = '';
                    serves2 = '';
                    country = 'UK';
                    para = '';
                }

                const mailOptions = {
                    from: 'Atsas MUN',
                    to: notif.Email,
                    subject: 'YOUR LETTER OF ACCEPTANCE',
                    html: `<!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>

        <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#ffffff; color:#333;">
            <table
                style="width: 100%; max-width: 800px; margin: 20px auto; text-align: center; background: #ffffff; border-collapse: collapse;">
                <!-- Logo Row -->
                <tr>
                    <td align="center" style=" background-color:#fff;">
                        <img src="https://e75ca47a0b.imgdist.com/pub/bfra/ve0zzru6/dnd/vya/qic/Without-01-removebg-preview.png"
                            alt="ATSAS MUN Logo" width="170">
                    </td>
                </tr>
                <!-- Background Image Section -->
                <tr>
                       <td align="center" style=" text-align: center;
                                background-image: url('https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/2p9/g6d/6qx/bg.png');
                                background-size: cover;
                            background-repeat: no-repeat;
                            min-height: 30vh;
                            max-width: 100%;
                            background-position: center; 
                            color:#fff; 
                            padding:70px;">
                                    <h1 style="margin:0; font-size:50px; color: white;">CONGRATULATIONS!</h1>
                        <!-- Name -->
                        <p
                            style="font-size: 1.4rem; font-weight: bold; margin: 10px 0; color: white; text-decoration: underline;">
                          ${notif.type === 'group' ? 'Head of Delegate: ' : ''}${userName}</p>
                        <!-- Subtext -->
                        <p style="font-size: 0.9rem; margin: 30px 30px 10px 20px; color: white;">
                            You have been selected as one of the delegates at AtsasMUN ${desname}
                            Please find attached the official acceptance letter in this email.
                        </p>
                        <p style="font-size: 0.9rem; margin: 5px 40px 10px 20px; color: white;">
                         ${para ? para : ""}
                        </p>
                    </td>
                </tr>

            </table>

            <table style="width: 100%; max-width: 800px; margin: 20px auto; border-collapse: collapse; background: #ffffff;">

                <!-- Image Section -->
                <td style="margin-bottom: 30px;">
                    <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/gpl/90q/wob/Capture.PNG" alt="Eligibility Image"
                        style="width: 100%; max-height: 450px; object-fit: cover; ">
                </td>

            </table>


            <table style="width: 100%; max-width: 800px; margin: 40px auto; border-collapse: collapse; background: #ffffff;">

                <!-- Image Section -->
                <td>
                    <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/jwv/ano/u8g/Capture2.PNG" alt="Eligibility Image"
                        style="width: 100%; max-height: 450px; object-fit: cover; ">
                </td>

            </table>

            <table style="width: 100%; margin: 0px auto; margin-top: -50px; background-color: #fff; padding: 25px 2px 2px 2px;">
                <tr>
                    <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Committee
                        Allocation Policy</td>
                </tr>
                <tr>
                    <td style="padding: 10px;">
                        <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
                            <li>AtsasMUN does not guarantee the availability of preferred countries and encourages participants
                                to select alternatives if necessary.</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Payments</td>
                </tr>
                <tr>
                    <td style="padding: 10px;">
                        <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
                            <li>Payments must be made through the official AtsasMUN website.</li>
                            <li>AtsasMUN will not acknowledge payments made to unauthorized individuals claiming to represent
                                the organization.</li>
                            <li>Accepted payment methods include credit/debit cards and international wire transfers.</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Refund Policy</td>
                </tr>
                <tr>
                    <td style="padding: 10px;">
                        <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
                            <li>Subject to the following restrictions, delegates who have made their full payment may ask for a
                                credit voucher or transfer their participation to another AtsasMUN location.</li>
                            <li>Requests have to be submitted sixty days prior to the start of the event. Credit coupons or
                                transfers are only good for AtsasMUN activities.</li>
                            <li>Delegates who only paid an installment will not be eligible for credit vouchers or transfers;
                                the installment will be kept as a cancellation charge.</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Code of Conduct
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px;">
                        <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
                            <li>Participants must ensure all information provided during registration is accurate. False
                                information will result in disqualification and potential legal action.</li>
                            <li>All submitted materials must be original; plagiarism will result in disqualification.</li>
                            <li>Participants must obey the host country's laws and are personally responsible for any damages or
                                violations.</li>
                            <li>AtsasMUN is not liable for participant misconduct; individuals will bear sole responsibility for
                                their actions.</li>
                            <li>Participants must adhere to the Code of Conduct outlined in the Conference Handbook.</li>
                        </ul>
                    </td>
                </tr>
            </table>


            <table
                style="width: 100%; max-width: 800px; margin: 10px auto; margin-bottom: 0px; margin-top: 0px; border-collapse: collapse; background: #ffffff;">

                <!-- Image Section -->
                <td>
                    <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/gdl/53b/vsi/Capture3.PNG" alt="Eligibility Image"
                        style="width: 100%; max-height: 350px; object-fit: cover; ">
                </td>

            </table>

            <table role="presentation" width="100%"  cellspacing="0" cellpadding="0" border="0"
                style="background-color:#ffffff;  margin-top: -5px;">
                <tr>
                    <td align="center">
                        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
                            style="background-color:#fff;  box-shadow:0 4px 8px rgba(0,0,0,0.1);">

                            <!-- payment//////////////////////// -->
                            <table role="presentation" width="100%" cellpadding="10" cellspacing="0" border="0"
                                style="max-width: 600px; margin: auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                                <!-- Title Section -->
                                <tr>
                                    <td colspan="2" align="center"
                                        style="padding: 40px 20px 20px 10px ; font-size: 20px; font-weight: bold; color: #000; ">
                                        Conference Fee Packages
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="center" style="padding-bottom: 20px; font-size: 16px; color: #555;">
                                        New Year Early Bird Packages
                                    </td>
                                </tr>
                                <!-- Packages Section -->
                                <tr>
                                    <!-- Non-Accommodation Column -->
                                    <td style="            background: linear-gradient(to right, #00509E, #003A70, #002855);
          color: white; padding: 10px; font-size: 16px; font-weight: bold; border-radius: 8px 0 0 0; text-align: center;">
                                        Non-Accommodation $${basicprice}
                                    </td>
                                    <!-- Accommodation Column -->
                                    <td style="            background: linear-gradient(to right, #00509E, #003A70, #002855);
        ; color: white; padding: 10px; font-size: 16px; font-weight: bold; border-radius: 0 8px 0 0; text-align: center;">
                                        Accommodation $${fullprice}
                                    </td>
                                </tr>
                                <tr>
                                    <!-- Non-Accommodation Details -->
                                    <td
                                        style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align:left;">
                                        ATSASMUN Merch and Kit
                                    </td>
                                    <td
                                        style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        Everything in Non-Accommodation Package
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        United Nations Simulation Committee Sessions
                                    </td>
                                    <td
                                        style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        5 Star Accommodation-Twin Shared/3 Nights
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        ATSASMUN UNHCR Endorsed Certificates
                                    </td>
                                    <td
                                        style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        3 Buffet Breakfasts
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        Cultural Global Village and Performances
                                    </td>
                                    <td
                                        style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        2 Lunch and 3 Dinners
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        Ice-breaking Session
                                    </td>
                                    <td
                                        style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        ${CityTour}                         </td>
                                </tr>
                                <tr>
                                    <td
                                        style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        Diplomatic Dinner Gala
                                    </td>
                                    <td style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                       ${serves1 ? serves1 : ""}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                        1 Lunch and 2 Dinners
                                    </td>
                                    <td style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
                                    ${serves2 ? serves2 : ""}
                                    </td>
                                </tr>
                            </table>

                            ${notif.type === 'group' ? '' : `<table
                                style="width: 100%; max-width: 800px; margin: 20px auto; font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
                                <tr>
                                    <td style="font-weight: bold; font-size: 18px; color: #000; padding-bottom: 10px;">Payment
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-size: 15px; color: #333; padding-bottom: 20px;">You can pay at the link
                                        below</td>
                                </tr>
                                <tr>
                                    <td>

                                           <a href="https://www.atsasmun.com/${payment}/1?userid=${userId}"
                                            style="display: inline-block; padding: 10px 100px; font-size: 16px; font-weight: bold; color: #fff; text-decoration: none;  background: linear-gradient(to right, #00509E, #003A70, #002855);">Pay
                                            Now</a>
                                    </td>
                                </tr>
                            </table>`}


                            <table
                                style="width: 100%; max-width: 800px; margin: 40px auto; text-align: center; padding: 20px; background: #f9f9f9; border-radius: 10px; border-collapse: collapse;">
                                <!-- First Line -->


                                <tr>
                                    <td style="padding: 20px; font-size:19px; color:#333; line-height: 1.5;">
                                        A formal Visa Invitation Letter can be obtained from us upon request after the payment
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; font-size: 17px; color: #333;">
                                        Should you have any questions, feel free to reach us at
                                        <a href="mailto:info@atsasmun.com" target="_blank"
                                            style="text-decoration: underline;  font-weight: bold; color: #000000;">info@atsasmun.com</a>
                                        We will be happy to assist you.
                                    </td>
                                </tr>
                                <!-- Assistance Line -->
                                <tr>
                                    <td style="padding: 10px; font-size: 1rem; color: #333;">
                                        <hr>
                                    </td>
                                </tr>
                                <!-- Highlighted Line -->
                                <tr>
                                    <td style="padding: 20px; font-size: 1rem; color: black; font-weight: bold;">
                                        We look forward to meeting you in ${desname}!
                                    </td>
                                </tr>
                                <!-- Final Thank You Line -->
                                <tr>
                                    <td style="padding: 0px 10px 10px 0px; font-size: 0.9rem; color: #333; line-height: 1.5; ">
                                        Once again, thank you for registering yourself as a part of this powerful Diplomatic
                                        Conference!
                                    </td>
                                </tr>
                            </table>

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">

                                <tr>
                                    <td align="center"
                                        style="background-color:#003366; color:#fff; padding:20px; margin:0; font-size:14px;">
                                        <p style="margin:0; font-size:14px;">Atsas MUN ${country}© 2024 Atsas Creation
                                            International Ltd</p>
                                        <p style="margin:5px 0 0; font-size:12px; color: #fff;"><em>"Forging a Diplomatic World
                                                of Unity and Peace"</em></p>
                                    </td>
                                </tr>
                            </table>

                    </td>
                </tr>
            </table>

        </body>

        </html>`
                };

                await transporter.sendMail(mailOptions);

                // 2. Mark as sent in the database
                await collections.notifications.update(notif.id, { secondEmailSent: true });
                sentCount++;

            } catch (err) {
                console.error(`Failed to send second email to ${notif.Email}:`, err);
            }
        }

        return NextResponse.json({
            message: 'Cron job executed successfully',
            found: pending.length,
            sent: sentCount
        });

    } catch (error) {
        console.error('Cron Error:', error);
        return NextResponse.json({ message: 'Cron job failed', error: error.message }, { status: 500 });
    }
}
