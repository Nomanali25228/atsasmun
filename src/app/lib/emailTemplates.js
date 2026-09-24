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
    const name = `${reg.FirstName || reg.firstName || ''} ${reg.LastName || reg.lastName || ''}`.trim() || reg.FirstName || reg.name || 'Delegate';
    const type = reg.RegistrationType || reg.type || 'individual';
    const destination = reg.Destinations || reg.destination || 'Istanbul, Turkey';
    const config = getDestinationConfig(destination);

    const startdate = reg.startdate || (destination.includes('Istanbul') ? '5' : 'Coming Soon');
    const enddate = reg.enddate || (destination.includes('Istanbul') ? '8' : '');
    const month = reg.month || (destination.includes('Istanbul') ? 'November' : '');
    const year = reg.year || '2026';

    let destinationHeading = 'Istanbul, T&uuml;rkiye';
    let destinationMeeting = 'Istanbul, Turkiye!';
    let footerTitle = 'Atsas MUN Turkiye';

    if (destination.includes('Dubai') || destination.includes('UAE')) {
        destinationHeading = 'Dubai, UAE';
        destinationMeeting = 'Dubai, UAE!';
        footerTitle = 'Atsas MUN UAE';
    } else if (destination.includes('Saudi') || destination.includes('Riyadh')) {
        destinationHeading = 'Riyadh, Saudi Arabia';
        destinationMeeting = 'Riyadh, Saudi Arabia!';
        footerTitle = 'Atsas MUN Saudi Arabia';
    } else if (destination.includes('USA') || destination.includes('New York')) {
        destinationHeading = 'New York, USA';
        destinationMeeting = 'New York, USA!';
        footerTitle = 'Atsas MUN USA';
    } else if (destination.includes('UK') || destination.includes('London')) {
        destinationHeading = 'London, UK';
        destinationMeeting = 'London, UK!';
        footerTitle = 'Atsas MUN UK';
    } else if (destination.includes('Azerbaijan') || destination.includes('Baku')) {
        destinationHeading = 'Baku, Azerbaijan';
        destinationMeeting = 'Baku, Azerbaijan!';
        footerTitle = 'Atsas MUN Azerbaijan';
    }

    const basicPrice = config.basicprice || '418';
    const basicSave = config.basicSave || '120';
    const accomodationPrice = config.accomodationprice || '549';
    const accomodationSave = config.accomodationSave || '140';
    const fullPrice = config.fullprice || '689';
    const fullSave = config.fullSave || '150';
    const hotelName = config.Hotel || '4-5 Star Accommodation (Twin Shared Room)';
    const cityTourName = config.CityTour || 'Bosphorus Dinner Cruise Trip';

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
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#fff;  box-shadow:0 4px 8px rgba(0,0,0,0.1);">
                    
                    <!-- LOGO -->
                    <tr>
                        <td align="center" style="background-color:#fff; padding: 24px 20px 16px 20px;">
                            <img src="https://res.cloudinary.com/dmux089ac/image/upload/v1789575075/oyxcq00z7eykhobketvr.png" 
                                 alt="ATSAS MUN Logo" width="170">
                        </td>
                    </tr>

                    <!-- HEADER -->
                 
                    <tr>
                        <td align="center" style="text-align: center;
                            background-color: #010c47 !important;
                            background-image: url('https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/6tz/dj7/j5a/%23010c47.png');
                            background-size: cover;
                            background-repeat: no-repeat;
                            min-height: 30vh;
                            max-width: 100%;
                            background-position: center; 
                            color:#ffffff !important; 
                            padding:70px;">
                            <h1 style="margin:0; font-size:50px; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;">Thank You</h1>
                            <p style="margin:20px 0 0; font-size:18px; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;">Your Registration is Now Complete</p>
                            <p style="margin:6px 0 0; font-size:18px; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;">for ${destinationHeading}</p>
                            <p style="margin:20px 0 0; font-size:22px; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;">(${type === 'group' ? 'Head of Delegate: ' : ''}${name})</p>
                        </td>
                    </tr>
                    <!-- DATE -->
                    <tr>
                        <td align="center" style="padding:20px;">
                            <h2 style="margin:0; font-size:20px; color:#000;">Date: ${startdate === 'Coming Soon' ? 'Coming Soon' : `${startdate}–${enddate} ${month}, ${year}`}</h2>
                            <hr style="width:80%; border-top:1px solid #ddd; margin-top: 20px;">
                            <p style="font-size:16px; color: #000;">We are pleased to inform you that your registration at Atsas International Model United Nations has been received. The shortlisted applicants will be contacted shortly through email within 24 hours.</p>
                        </td>
                    </tr>

                 <!-- SOCIAL MEDIA & REFERRAL SECTION -->
<tr>
    <td align="center" style="padding: 24px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
                <!-- Social Media Section -->
                <td align="center" style="width: 48%; padding: 1px; vertical-align: middle; ;">
                    <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/4wi/59y/4ps/images-removebg-preview.png" 
                         alt="Follow Us" width="120" style="display: block; margin-bottom: 12px; margin-top: 0px;">
                    <p style="font-size: 16px; color: #333; margin: 0;">
                        In the meantime, you can let the world know about your travel plans on Instagram or Facebook
                            by following us to stay updated and tag us <strong>@atsasmun</strong>
                    </p>
                </td>

                <!-- Vertical Separator -->
                <td style="width: 4%; text-align: center;">
                    <div style="width: 1px; height: 150px; background-color: #e0e0e0; margin: auto;"></div>
                </td>

                <!-- Referral Section -->
                <td align="center" style="width: 48%; padding: 1px; vertical-align: middle; ">
                    <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/kye/y0d/e3c/images__1_-removebg-preview.png" 
                         alt="Referral" width="100" style="display: block; margin-bottom: 12px; margin-top: 0px;">
                    <p style="font-size: 16px; color: #333; margin: 0;">
                        Tag 5 of your friends to receive a special referral code for a discount in your conferenc
                        fee if the tagged delegate attends the MUN as well.
                    </p>
                </td>
            </tr>
        </table>
    </td>
</tr>





<!-- facbook-----section--------------------- -->


<table style="width: 100%; font-family: Arial, sans-serif; line-height: 1.6; margin-top: 20px; padding: 0;  background: #f2f4f7bb; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); color: #333; text-align: center;">
   
    <tr>
        <td colspan="3" style="max-width: 800px; margin: 40px auto; text-align: center; padding:0px 10px;">
            <h3 style="font-size: 18px; margin-bottom: 10px; color: #2c3e50;">Please take a look at the information about the event below:</h3>
            <p style="font-size:16px; color: #555; margin-bottom: 20px;">
                AtsasMUN has integrated 3 committees into its conferences. The esteemed members of our secretariat are highly talented and dedicated to ensuring a seamless experience for all participants.
            </p>

        </td>
    </tr>
    <tr>
        <td style="text-align: center; padding: 10px;">
            <img src="https://e75ca47a0b.imgdist.com/pub/bfra/ve0zzru6/0w6/l4q/ind/Logo-removebg-preview.png" alt="UNSC" style="width: 100px; height: 100px; border-radius: 50%; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h4 style="font-size: 16px; margin-top: 10px; color: #2c3e50;">UNSC</h4>
        </td>
        <td style="text-align: center; padding: 10px;">
            <img src="https://e75ca47a0b.imgdist.com/pub/bfra/ve0zzru6/fkx/597/d2w/Logo2-removebg-preview.png" alt="UNHRC" style="width: 100px; height: 100px; border-radius: 50%; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h4 style="font-size: 16px; margin-top: 10px; color: #2c3e50;">UNHRC</h4>
        </td>
        <td style="text-align: center; padding: 10px;">
            <img src="https://e75ca47a0b.imgdist.com/pub/bfra/ve0zzru6/s95/e76/st0/Logo3-removebg-preview.png" alt="UNDP" style="width: 100px; height: 100px; border-radius: 50%; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h4 style="font-size: 16px; margin-top: 10px; color: #2c3e50;">UNDP</h4>
        </td>
    </tr>
</table> 

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 650px; margin: auto; border-collapse: separate; border-spacing: 8px 0; font-family: Arial, sans-serif;">
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
                        <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #F2B705;">$${basicPrice} <span style="font-size: 11px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                        <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Bird <span style="color: #2EC4B6; font-weight: bold;">(Save $${basicSave})</span></div>
                    </div>
                    <div style="text-align: center; padding: 8px 4px 4px; font-size: 10px; font-weight: bold; color: #2EC4B6; text-transform: uppercase;">
                        NON-ACCOMMODATION
                    </div>
                    <div style="padding: 10px 8px 16px; font-size: 11px; line-height: 1.7; color: #333333; text-align: left;">
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> ATSASMUN Merch Kit</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Official ATSASMUN Certificate</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Visa Invitation Letter</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> United Nations Simulation Sessions</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Professional event photos</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> First come First Serve committee Allocation (Limited Spaces)</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Breakfast Every Morning</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> 1 Dinner</div>
                    </div>
                </td>

                <!-- COLUMN 2: Delegation + Accommodation -->
                <td width="33.33%" valign="top" style="background: #ffffff; border: 2px solid #FF5A5F; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <div style="background: linear-gradient(to right, #FF5A5F, #E0484D); color: #ffffff; padding: 10px 8px 14px; text-align: center;">
                        <div style="display: inline-block; background: #ffffff; color: #FF5A5F; font-size: 9px; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 10px; margin-bottom: 4px;">MOST POPULAR</div>
                        <div style="font-size: 14px; font-weight: bold;">Delegation + Accommodation</div>
                        <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #F2B705;">$${accomodationPrice} <span style="font-size: 11px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                        <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Bird <span style="color: #ffffff; font-weight: bold;">(Save $${accomodationSave})</span></div>
                    </div>
                    <div style="text-align: center; padding: 8px 4px 4px; font-size: 10px; font-weight: bold; color: #2EC4B6; text-transform: uppercase;">
                        ACCOMMODATION INCLUDED
                    </div>
                    <div style="padding: 10px 8px 16px; font-size: 11px; line-height: 1.7; color: #333333; text-align: left;">
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Everything in Delegation Package</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> ${hotelName}</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Airport Arrival Assistance</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Guided City Tour</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> 1 Lunch &amp; 2 Dinner</div>
                    </div>
                </td>

                <!-- COLUMN 3: Full Experience Package -->
                <td width="33.33%" valign="top" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="background: linear-gradient(to right, #003A70, #002855); color: #ffffff; padding: 14px 8px; text-align: center;">
                        <div style="font-size: 14px; font-weight: bold;">Full Experience Package</div>
                        <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #F2B705;">$${fullPrice} <span style="font-size: 11px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                        <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Bird <span style="color: #2EC4B6; font-weight: bold;">(Save $${fullSave})</span></div>
                    </div>
                    <div style="text-align: center; padding: 8px 4px 4px; font-size: 10px; font-weight: bold; color: #2EC4B6; text-transform: uppercase;">
                        VIP FULL EXPERIENCE
                    </div>
                    <div style="padding: 10px 8px 16px; font-size: 11px; line-height: 1.7; color: #333333; text-align: left;">
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Everything in Delegation + Accommodation</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> ${cityTourName}</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Airport Arrival &amp; Dropoff Assistance</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Lucky Draw</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Priority Registration</div>
                        <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> 2 Lunch &amp; 3 Dinner</div>
                    </div>
                </td>
            </tr>
        </table>



                   <!-- CONTACT INFO -->
                   <table style="width: 100%; max-width: 800px; margin: 40px auto; text-align: center; padding: 40px; background: #f2f4f7;  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-collapse: collapse;">
                    <tr>
                        <td style="padding: 20px; font-size:16px; color:black; line-height: 1.5;">
                            <strong>Please wait for further information through email or our social media handles of AtsasMUN.</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; font-size: 1rem; color: #000000;">
                            More Details: <a href="http://www.atsasmun.com" target="_blank" style="text-decoration: underline;  font-weight: bold; color: #000000;">http://www.atsasmun.com</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <table style="margin: 0 auto; text-align: center; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 10px;">
                                         <a href="https://www.facebook.com/atsasmun" target="_blank" style="text-decoration: none; color: #333; display: flex; align-items: center; gap: 10px;">
                                            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" style="width: 30px; height: 30px;">
                                            <span style="font-size: 1rem; padding-left: 20px; " >atsasmun</span>
                                        </a>
                                    </td>
                                    <td style="padding: 10px;">
                                        <a href="https://www.instagram.com/atsasmun/" target="_blank" style="text-decoration: none; color: #333; display: flex; align-items: center; gap: 10px;">
                                            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width: 30px; height: 30px;">
                                            <span style="font-size: 1rem;  padding-left: 20px;">@atsasmun</span>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                



                <table style="width: 100%; max-width: 800px; margin: 40px auto; text-align: center; padding: 20px; background: #f9f9f9; border-radius: 10px; border-collapse: collapse;">
                    <!-- First Line -->
                  

                    <tr>
                        <td style="padding: 20px; font-size:19px; color:black; line-height: 1.5;">
                            Should you have any questions, feel free to reach us at
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; font-size: 17px; color: #000000;">
                             <a href="mailto:info@atsasmun.com" target="_blank" style="text-decoration: underline;  font-weight: bold; color: #000000;">info@atsasmun.com</a>
                            We will be happy to assist you. </td>
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
                            We look forward to meeting you in ${destinationMeeting}
                        </td>
                    </tr>
                    <!-- Final Thank You Line -->
                    <tr>
                        <td style="padding: 0px 10px 10px 0px; font-size: 0.9rem; color: #555; line-height: 1.5; ">
                            Once again, thank you for registering yourself as a part of this powerful Diplomatic Conference!
                        </td>
                    </tr>
                </table>
                


                    <!-- FOOTER -->
                    <tr>
                        <td align="center" style="background-color:#003366; color:#fff; padding:20px;">
                            <p style="margin:0; font-size:14px;">${footerTitle} &copy; 2026 Atsas Creation International Ltd</p>
                            <p style="margin:5px 0 0; font-size:12px; color: #fff;"><em>"Forging a Diplomatic World of Unity and Peace"</em></p>
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
