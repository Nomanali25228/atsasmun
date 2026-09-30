/**
 * Payment Deadline Reminder Email Template for ATSASMUN Istanbul 2026
 * Matches existing professional ATSASMUN email branding and design system.
 */

import { getDestinationConfig } from './cronService.js';

export function getDeadlineEmailHtml({
  name = "Delegate",
  customerId = "",
  id = "1",
  isGroup = false,
  deadline = "09/10/2026",
  destination = "Istanbul, Turkey",
  dates = "5 to 8 November 2026",
} = {}) {
  const isGroupBool = Boolean(isGroup === true || isGroup === 'true' || isGroup === 'group');
  const config = getDestinationConfig(destination);
  const paymentBase = customerId ? customerId : (id || "1");
  const paymentEndpoint = config.payment || "Istanbulpayment";
  const paymentUrl = `https://www.atsasmun.com/${paymentEndpoint}/${paymentBase}?userid=${id || "1"}&customerId=${customerId || ""}`;

  const destHeading = destination.includes('Dubai') || destination.includes('UAE')
    ? 'Dubai, UAE'
    : destination.includes('Saudi') || destination.includes('Riyadh')
    ? 'Riyadh, Saudi Arabia'
    : destination.includes('USA') || destination.includes('New York')
    ? 'New York, USA'
    : destination.includes('UK') || destination.includes('London')
    ? 'London, UK'
    : destination.includes('Azerbaijan') || destination.includes('Baku')
    ? 'Baku, Azerbaijan'
    : 'Istanbul, T&uuml;rkiye';

  const destCity = destination.includes('Dubai') || destination.includes('UAE')
    ? 'Dubai'
    : destination.includes('Saudi') || destination.includes('Riyadh')
    ? 'Riyadh'
    : destination.includes('USA') || destination.includes('New York')
    ? 'New York'
    : destination.includes('UK') || destination.includes('London')
    ? 'London'
    : destination.includes('Azerbaijan') || destination.includes('Baku')
    ? 'Baku'
    : 'Istanbul';

  const conferenceDates = destination.includes('Istanbul') ? '5 to 8 November 2026' : dates;

  const installmentSubject = encodeURIComponent(
    `Two-Instalment Payment Request - ${name} (${customerId || id})`
  );
  const installmentBody = encodeURIComponent(
    `Dear ATSAS MUN Team,\n\nI have registered for ATSASMUN ${destCity} 2026 and would like to request to pay my registration fee in two instalments before the payment deadline (${deadline}).\n\nDelegate Name: ${name}\nCustomer ID / Reg ID: ${customerId || id}\nDestination: ${destHeading}\n\nPlease provide me with the details to pay in two instalments.\n\nThank you!`
  );
  const installmentMailto = `mailto:info@atsasmun.com?subject=${installmentSubject}&body=${installmentBody}`;

  const notAttendingSubject = encodeURIComponent(
    `Attendance Cancellation Notice - ${name} (${customerId || id})`
  );
  const notAttendingBody = encodeURIComponent(
    `Dear ATSAS MUN Team,\n\nI am writing to inform you that I am no longer able to attend ATSASMUN ${destCity} 2026. Please release my reserved place to another delegate on the waiting list.\n\nDelegate Name: ${name}\nCustomer ID / Reg ID: ${customerId || id}\n\nThank you!`
  );
  const notAttendingMailto = `mailto:info@atsasmun.com?subject=${notAttendingSubject}&body=${notAttendingBody}`;

  const whatsappGroupMessage = encodeURIComponent(
    `Hello ATSAS MUN Team, I am the Head of Delegate for our group delegation (${name}) registered for ATSASMUN Istanbul 2026. We are contacting you regarding the payment deadline (${deadline}) to finalize our group payment.`
  );
  const whatsappGroupUrl = `https://wa.me/447498072531?text=${whatsappGroupMessage}`;

  const whatsappGeneralMessage = encodeURIComponent(
    `Hello ATSAS MUN Team, I have a question regarding my payment for ATSASMUN Istanbul 2026 (Delegate: ${name}, ID: ${customerId || id}).`
  );
  const whatsappGeneralUrl = `https://wa.me/447498072531?text=${whatsappGeneralMessage}`;

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
    <title>ATSASMUN Payment Deadline Reminder — ${deadline}</title>
</head>

<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color:#f4f6f9; color:#333333; -webkit-font-smoothing: antialiased;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f6f9; padding: 20px 0;">
        <tr>
            <td align="center">
                <!-- MAIN CONTAINER (600px standard) -->
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff; box-shadow:0 4px 16px rgba(0,0,0,0.08); width: 600px; min-width: 600px; max-width: 600px; border-radius: 10px; overflow: hidden;">
                    
                    <!-- LOGO HEADER -->
                    <tr>
                        <td align="center" style="background-color:#ffffff; padding: 24px 20px 18px 20px; border-bottom: 1px solid #f0f2f5;">
                            <a href="https://www.atsasmun.com" target="_blank" style="text-decoration:none;">
                                <img src="https://res.cloudinary.com/dmux089ac/image/upload/v1789575075/oyxcq00z7eykhobketvr.png" 
                                     alt="ATSAS MUN Logo" width="175" style="display:block; border:0; margin:0 auto;">
                            </a>
                        </td>
                    </tr>

                    <!-- HERO HEADER WITH NAVY BLUE BACKGROUND -->
                    <tr>
                        <td align="center" style="text-align: center;
                            background-color: #010c47 !important;
                            background-image: url('https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/6tz/dj7/j5a/%23010c47.png');
                            background-size: cover;
                            background-repeat: no-repeat;
                            background-position: center; 
                            color:#ffffff !important; 
                            padding: 44px 28px 38px 28px;">
                            
                            <!-- URGENT PILL BADGE -->
                            <div style="display: inline-block; background-color: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #ff8080; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding: 6px 16px; border-radius: 20px; margin-bottom: 16px;">
                                ⚠️ URGENT REMINDER &bull; 10 DAYS REMAINING
                            </div>

                            <h1 style="margin:0; font-size: 32px; line-height: 1.25; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; font-weight: 800; letter-spacing: -0.5px; text-transform: uppercase;">
                                Payment Deadline Reminder
                            </h1>
                            
                            <p style="margin: 12px 0 0; font-size: 16px; color: #f2b705 !important; -webkit-text-fill-color: #f2b705 !important; font-weight: 700;">
                                ATSASMUN ${destCity} 2026 &bull; ${conferenceDates}
                            </p>

                            <p style="margin: 14px 0 0; font-size: 15px; color: #e2e8f0 !important; -webkit-text-fill-color: #e2e8f0 !important;">
                                ${isGroupBool ? 'Head of Delegate: ' : 'Dear Delegate, '}<strong>${name}</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- GREETING & INTRO -->
                    <tr>
                        <td style="padding: 28px 32px 10px 32px; background-color: #ffffff;">
                            <p style="font-size: 15px; line-height: 1.6; color: #2d3748; margin: 0 0 14px 0;">
                                Dear ${isGroupBool ? 'Head of Delegate ' : ''}<strong>${name}</strong>,
                            </p>
                            <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 14px 0;">
                                We hope this email finds you well.
                            </p>
                            <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin: 0 0 14px 0;">
                                Thank you for registering for <strong>ATSASMUN Istanbul 2026</strong>. We are delighted to have you with us, and we are now only a month away from the conference, which takes place from <strong>${conferenceDates}</strong>.
                            </p>
                        </td>
                    </tr>

                    <!-- DEADLINE CALLOUT BOX (HIGHLIGHTED) -->
                    <tr>
                        <td style="padding: 10px 32px 20px 32px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #fff8eb; border: 2px solid #f59e0b; border-radius: 10px; padding: 20px; box-shadow: 0 2px 6px rgba(245, 158, 11, 0.12);">
                                <tr>
                                    <td>
                                        <div style="font-size: 17px; font-weight: 800; color: #b45309; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                                            ⏰ Payment Deadline: <span style="color: #dc2626; text-decoration: underline; margin-left: 6px;">${deadline} (10 Days from Now)</span>
                                        </div>
                                        <p style="font-size: 14px; line-height: 1.65; color: #374151; margin: 0;">
                                            We are writing to remind you that the payment deadline is <strong>${deadline}</strong>, which is <strong>10 days from now</strong>. Completing your payment secures your place and allows us to begin preparing your visa invitation letter, committee allocation and accommodation arrangements.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CONFERENCE FEE PACKAGES -->
                    <tr>
                        <td style="padding: 10px 20px 20px 20px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate; border-spacing: 8px 0;">
                                <!-- Section Title -->
                                <tr>
                                    <td colspan="3" align="center" style="padding: 10px 10px 16px 10px;">
                                        <div style="font-size: 20px; font-weight: 800; color: #010c47; letter-spacing: -0.3px;">
                                            Conference Fee Packages
                                        </div>
                                        <div style="font-size: 13px; color: #64748b; margin-top: 4px;">
                                            Lock in your participation before the payment deadline expires
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <!-- COLUMN 1: Delegation Package -->
                                    <td width="33.33%" valign="top" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.04);">
                                        <div style="background: linear-gradient(to right, #00509E, #003A70); color: #ffffff; padding: 14px 8px; text-align: center;">
                                            <div style="font-size: 13px; font-weight: bold;">Delegation Package</div>
                                            <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #F2B705;">$${basicPrice} <span style="font-size: 10px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                                            <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Rate <span style="color: #2EC4B6; font-weight: bold;">(Save $${basicSave})</span></div>
                                        </div>
                                        <div style="text-align: center; padding: 7px 4px 3px; font-size: 9px; font-weight: 800; color: #00509E; text-transform: uppercase; letter-spacing: 0.5px;">
                                            NON-ACCOMMODATION
                                        </div>
                                        <div style="padding: 8px 8px 14px; font-size: 11px; line-height: 1.65; color: #333333; text-align: left;">
                                            <div style="margin-bottom: 6px;"><span style="color: #00509E; font-weight: bold; margin-right: 4px;">&#10004;</span> ATSASMUN Merch Kit</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #00509E; font-weight: bold; margin-right: 4px;">&#10004;</span> Official ATSASMUN Certificate</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #00509E; font-weight: bold; margin-right: 4px;">&#10004;</span> Visa Invitation Letter</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #00509E; font-weight: bold; margin-right: 4px;">&#10004;</span> UN Simulation Sessions</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #00509E; font-weight: bold; margin-right: 4px;">&#10004;</span> Event Photos</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #00509E; font-weight: bold; margin-right: 4px;">&#10004;</span> Committee Allocation</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #00509E; font-weight: bold; margin-right: 4px;">&#10004;</span> Breakfast Every Morning</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #00509E; font-weight: bold; margin-right: 4px;">&#10004;</span> 1 Dinner</div>
                                        </div>
                                    </td>

                                    <!-- COLUMN 2: Delegation + Accommodation -->
                                    <td width="33.33%" valign="top" style="background: #ffffff; border: 2px solid #FF5A5F; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(255, 90, 95, 0.15);">
                                        <div style="background: linear-gradient(to right, #FF5A5F, #E0484D); color: #ffffff; padding: 10px 8px 12px; text-align: center;">
                                            <div style="display: inline-block; background: #ffffff; color: #FF5A5F; font-size: 8.5px; font-weight: 800; text-transform: uppercase; padding: 2px 7px; border-radius: 8px; margin-bottom: 3px;">MOST POPULAR</div>
                                            <div style="font-size: 13px; font-weight: bold;">Delegation + Accom.</div>
                                            <div style="font-size: 18px; font-weight: 800; margin-top: 3px; color: #F2B705;">$${accomodationPrice} <span style="font-size: 10px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                                            <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Rate <span style="color: #ffffff; font-weight: bold;">(Save $${accomodationSave})</span></div>
                                        </div>
                                        <div style="text-align: center; padding: 7px 4px 3px; font-size: 9px; font-weight: 800; color: #FF5A5F; text-transform: uppercase; letter-spacing: 0.5px;">
                                            ACCOMMODATION INCLUDED
                                        </div>
                                        <div style="padding: 8px 8px 14px; font-size: 11px; line-height: 1.65; color: #333333; text-align: left;">
                                            <div style="margin-bottom: 6px;"><span style="color: #FF5A5F; font-weight: bold; margin-right: 4px;">&#10004;</span> All Delegation Kit &amp; Perks</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #FF5A5F; font-weight: bold; margin-right: 4px;">&#10004;</span> ${hotelName}</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #FF5A5F; font-weight: bold; margin-right: 4px;">&#10004;</span> Airport Arrival Assistance</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #FF5A5F; font-weight: bold; margin-right: 4px;">&#10004;</span> Guided City Tour</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #FF5A5F; font-weight: bold; margin-right: 4px;">&#10004;</span> 1 Lunch &amp; 2 Dinners</div>
                                        </div>
                                    </td>

                                    <!-- COLUMN 3: Full Experience Package -->
                                    <td width="33.33%" valign="top" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.04);">
                                        <div style="background: linear-gradient(to right, #003A70, #002855); color: #ffffff; padding: 14px 8px; text-align: center;">
                                            <div style="font-size: 13px; font-weight: bold;">Full Experience</div>
                                            <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #F2B705;">$${fullPrice} <span style="font-size: 10px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                                            <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Rate <span style="color: #2EC4B6; font-weight: bold;">(Save $${fullSave})</span></div>
                                        </div>
                                        <div style="text-align: center; padding: 7px 4px 3px; font-size: 9px; font-weight: 800; color: #003A70; text-transform: uppercase; letter-spacing: 0.5px;">
                                            VIP FULL EXPERIENCE
                                        </div>
                                        <div style="padding: 8px 8px 14px; font-size: 11px; line-height: 1.65; color: #333333; text-align: left;">
                                            <div style="margin-bottom: 6px;"><span style="color: #003A70; font-weight: bold; margin-right: 4px;">&#10004;</span> Everything in Delegation + Accom.</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #003A70; font-weight: bold; margin-right: 4px;">&#10004;</span> ${cityTourName}</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #003A70; font-weight: bold; margin-right: 4px;">&#10004;</span> Airport Arrival &amp; Dropoff</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #003A70; font-weight: bold; margin-right: 4px;">&#10004;</span> Priority Registration &amp; Lucky Draw</div>
                                            <div style="margin-bottom: 6px;"><span style="color: #003A70; font-weight: bold; margin-right: 4px;">&#10004;</span> 2 Lunch &amp; 3 Dinner</div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- PAYMENT / WHATSAPP ACTION SECTION -->
                    <tr>
                        <td align="center" style="padding: 10px 32px 24px 32px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 22px; text-align: center;">
                                <tr>
                                    <td align="center">
                                        <div style="font-weight: 800; font-size: 17px; color: #0f172a; margin-bottom: 6px;">
                                            ${isGroupBool ? 'Group Delegation Payment' : 'Complete Your Payment'}
                                        </div>
                                        <p style="font-size: 13.5px; color: #64748b; margin: 0 0 16px 0; max-width: 480px; line-height: 1.5;">
                                            ${isGroupBool 
                                                ? 'To lock in the deadline discount and receive your customized group invoice, please contact our team directly on WhatsApp:' 
                                                : 'Secure your place, committee allocation, and visa invitation letter before the 09/10/2026 deadline:'}
                                        </p>

                                        ${isGroupBool ? `
                                        <!-- GROUP WHATSAPP BUTTON -->
                                        <div>
                                            <a href="${whatsappGroupUrl}" target="_blank"
                                               style="display: inline-block; padding: 14px 32px; font-size: 15px; font-weight: 700; color: #ffffff; text-decoration: none; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); border-radius: 8px; box-shadow: 0 4px 12px rgba(37,211,102,0.35); text-align: center;">
                                               💬 Contact Us on WhatsApp for Group Payment
                                            </a>
                                            <p style="margin: 10px 0 0 0; font-size: 12px; color: #64748b;">
                                                WhatsApp Support: <strong style="color: #0f172a;">+44 7498 072531</strong> &bull; Fast invoice &amp; group discount assistance
                                            </p>
                                        </div>
                                        ` : `
                                        <!-- INDIVIDUAL PAY NOW BUTTON -->
                                        <div>
                                            <a href="${paymentUrl}" target="_blank"
                                               style="display: inline-block; padding: 14px 54px; font-size: 16px; font-weight: 800; color: #ffffff; text-decoration: none; background: linear-gradient(135deg, #00509E 0%, #003A70 50%, #002855 100%); border-radius: 8px; box-shadow: 0 4px 14px rgba(0,80,158,0.35); text-align: center; letter-spacing: 0.5px;">
                                               💳 Pay Now
                                            </a>
                                            <p style="margin: 10px 0 0 0; font-size: 12px; color: #64748b;">
                                                Fast &amp; secure payment portal with instant receipt confirmation
                                            </p>
                                        </div>
                                        `}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- TWO INSTALMENTS SECTION -->
                    <tr>
                        <td style="padding: 0 32px 20px 32px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #eff6ff; border: 1.5px dashed #3b82f6; border-radius: 10px; padding: 18px 20px;">
                                <tr>
                                    <td>
                                        <div style="font-size: 15px; font-weight: 800; color: #1e40af; margin-bottom: 6px;">
                                            💳 Need More Time? Pay in Two Instalments!
                                        </div>
                                        <p style="font-size: 13.5px; line-height: 1.6; color: #1e3a8a; margin: 0 0 12px 0;">
                                            If you need more time, <strong>you can pay in two instalments</strong>. Please let us know if you would like to do this, and we will be happy to arrange it.
                                        </p>
                                        <div>
                                            <a href="${installmentMailto}" 
                                               style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; padding: 8px 16px; border-radius: 6px;">
                                                ✉️ Request Two-Instalment Plan (info@atsasmun.com)
                                            </a>
                                            <span style="font-size: 12px; color: #475569; margin-left: 8px;">or reply to this email</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ATTENDANCE CANCELLATION NOTICE -->
                    <tr>
                        <td style="padding: 0 32px 24px 32px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #fafafa; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px 18px;">
                                <tr>
                                    <td>
                                        <div style="font-size: 13px; font-weight: 700; color: #6b7280; margin-bottom: 4px;">
                                            ℹ️ Important Notice Regarding Attendance:
                                        </div>
                                        <p style="font-size: 13px; line-height: 1.55; color: #4b5563; margin: 0 0 8px 0;">
                                            If you are no longer interested in attending, please let us know as soon as possible so that we can offer your place to another delegate.
                                        </p>
                                        <a href="${notAttendingMailto}" style="font-size: 12px; color: #dc2626; text-decoration: underline; font-weight: 600;">
                                            Click here to notify us if you cannot attend
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- HELP & CONTACT SECTION -->
                    <tr>
                        <td style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
                            <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 10px 0;">
                                If you have any questions or need any help with your payment, please reply to this email or message us on WhatsApp.
                            </p>
                            <p style="font-size: 15px; font-weight: 700; color: #010c47; margin: 0 0 12px 0;">
                                We look forward to welcoming you to Istanbul.
                            </p>

                            <!-- QUICK CONTACT PILLS -->
                            <div style="margin: 14px 0 16px 0;">
                                <a href="mailto:info@atsasmun.com" style="display: inline-block; margin: 4px 6px; padding: 7px 14px; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 20px; font-size: 12px; color: #00509E; text-decoration: none; font-weight: 600;">
                                    ✉️ info@atsasmun.com
                                </a>
                                <a href="${whatsappGeneralUrl}" target="_blank" style="display: inline-block; margin: 4px 6px; padding: 7px 14px; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 20px; font-size: 12px; color: #128C7E; text-decoration: none; font-weight: 600;">
                                    💬 WhatsApp: +44 7498 072531
                                </a>
                                <a href="https://www.atsasmun.com" target="_blank" style="display: inline-block; margin: 4px 6px; padding: 7px 14px; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 20px; font-size: 12px; color: #334155; text-decoration: none; font-weight: 600;">
                                    🌐 www.atsasmun.com
                                </a>
                            </div>

                            <p style="font-size: 14px; line-height: 1.5; color: #475569; margin: 0;">
                                Kind regards,<br>
                                <strong style="color: #010c47;">ATSASMUN Team</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td align="center" style="background-color: #003366; color: #ffffff; padding: 22px 20px; text-align: center;">
                            <p style="margin: 0; font-size: 13px; color: #ffffff; font-weight: 600;">
                                ATSASMUN T&uuml;rkiye &copy; 2026 Atsas Creation International Ltd
                            </p>
                            <p style="margin: 5px 0 0 0; font-size: 11px; color: #cbd5e1;">
                                <em>"Forging a Diplomatic World of Unity and Peace"</em>
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

    <!-- Anti-thread collapse spacer for email clients -->
    <div style="display:none !important; font-size:1px; color:#f4f6f9; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; mso-hide:all;">
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
        Ref-Deadline-${Date.now()}-${Math.floor(Math.random() * 100000)}
    </div>

</body>
</html>`;
}
