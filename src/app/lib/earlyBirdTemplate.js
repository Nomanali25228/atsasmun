/**
 * Early Bird Discount Email Template for ATSASMUN Istanbul
 * Exact styling matching the previous template (IstanbulContact / 2nd image)
 */

export function getEarlyBirdEmailHtml({
  name = "Delegate",
  customerId = "",
  id = "1",
  isGroup = false,
  deadline = "5th October, 2026",
} = {}) {
  const paymentBase = customerId ? customerId : (id || "1");
  const paymentUrl = `https://www.atsasmun.com/Istanbulpayment/${paymentBase}?userid=${id || "1"}&customerId=${customerId || ""}`;

  const installmentSubject = encodeURIComponent(
    `Installment Payment Request - ${name}`
  );
  const installmentBody = encodeURIComponent(
    `Dear ATSAS MUN Team,\n\nI have registered for ATSASMUN Istanbul and would like to request a flexible installment payment plan for my Early Bird fee.\n\nDelegate Name: ${name}\nCustomer ID / Reg ID: ${customerId || id}\n\nPlease share the available installment schedule.\n\nThank you!`
  );
  const installmentMailto = `mailto:info@atsasmun.com?subject=${installmentSubject}&body=${installmentBody}`;

  return `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ATSAS MUN Early Bird Discount - Deadline 5th October</title>
</head>

<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f8f9fa; color:#333;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f8f9fa;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#fff; box-shadow:0 4px 8px rgba(0,0,0,0.1); width: 600px; min-width: 600px;">
                    
                    <!-- LOGO -->
                    <tr>
                        <td align="center" style="background-color:#fff; padding: 24px 20px 16px 20px;">
                            <a href="https://www.atsasmun.com" target="_blank">
                                <img src="https://res.cloudinary.com/dmux089ac/image/upload/v1789575075/oyxcq00z7eykhobketvr.png" 
                                     alt="ATSAS MUN Logo" width="170" style="display:block; border:0;">
                            </a>
                        </td>
                    </tr>

                    <!-- HERO HEADER -->
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
                            padding:50px 20px;">
                            
                            <div style="display: inline-block; background: #FF5A5F; color: #ffffff; font-size: 11px; font-weight: 800; text-transform: uppercase; padding: 4px 14px; border-radius: 12px; margin-bottom: 12px; letter-spacing: 1px;">
                                &#9889; EARLY BIRD OFFER &middot; DEADLINE 5TH OCTOBER
                            </div>

                            <h1 style="margin:0; font-size:40px; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; font-weight: 800; text-transform: uppercase;">
                                EARLY BIRD DISCOUNT
                            </h1>
                            <p style="margin:16px 0 0; font-size:18px; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;">
                                ${isGroup ? 'Head of Delegate: ' : 'Dear Delegate, '}<strong>${name}</strong>
                            </p>
                            <p style="margin:10px 0 0; font-size:14px; color: #e2e8f0 !important; -webkit-text-fill-color: #e2e8f0 !important; line-height: 1.5; max-width: 520px; margin-left: auto; margin-right: auto;">
                                Your application for <strong>ATSASMUN Istanbul, T&uuml;rkiye</strong> is shortlisted. Avail your exclusive <strong>Early Bird Discount</strong> and save up to <strong>$150</strong> before standard pricing applies.
                            </p>
                        </td>
                    </tr>

                    <!-- DEADLINE CALLOUT BOX -->
                    <tr>
                        <td align="center" style="padding: 20px 20px 10px 20px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #FFF9EB; border: 1.5px solid #F2B705; border-radius: 8px; padding: 14px 18px; text-align: center;">
                                <tr>
                                    <td>
                                        <div style="font-size: 15px; font-weight: bold; color: #9A6700; margin-bottom: 4px;">
                                            &#9200; Early Bird Offer Expires: <span style="color: #D90429; text-decoration: underline;">5th October 2026</span>
                                        </div>
                                        <div style="font-size: 12px; color: #555; line-height: 1.5;">
                                            After <strong>5th October</strong>, registration fees will increase automatically by <strong>$120 to $150</strong> per delegate. Complete your payment now to lock in discounted rates.
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>

                <!-- CONFERENCE FEE PACKAGES (1:1 EXACT FROM IstanbulContact/route.js lines 177-252) -->
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; min-width: 600px; max-width: 650px; margin: auto; border-collapse: separate; border-spacing: 8px 0; font-family: Arial, sans-serif; background-color: #fff;">
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
                        <td width="33.33%" valign="top" style="background: #ffffff; border: 2px solid #FF5A5F; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                            <div style="background: linear-gradient(to right, #FF5A5F, #E0484D); color: #ffffff; padding: 14px 8px; text-align: center;">
                                <div style="font-size: 14px; font-weight: bold;">Delegation Package</div>
                                <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #F2B705;">$418 <span style="font-size: 11px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                                <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Bird <span style="color: #ffffff; font-weight: bold;">(Save $120)</span></div>
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
                                <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #F2B705;">$549 <span style="font-size: 11px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                                <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Bird <span style="color: #ffffff; font-weight: bold;">(Save $140)</span></div>
                            </div>
                            <div style="text-align: center; padding: 8px 4px 4px; font-size: 10px; font-weight: bold; color: #2EC4B6; text-transform: uppercase;">
                                ACCOMMODATION INCLUDED
                            </div>
                            <div style="padding: 10px 8px 16px; font-size: 11px; line-height: 1.7; color: #333333; text-align: left;">
                                <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Everything in Delegation Package</div>
                                <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> 4-5 Star Accommodation (Twin Shared Room)</div>
                                <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Airport Arrival Assistance</div>
                                <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Guided City Tour</div>
                                <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> 1 Lunch &amp; 2 Dinner</div>
                            </div>
                        </td>

                        <!-- COLUMN 3: Full Experience Package -->
                        <td width="33.33%" valign="top" style="background: #ffffff; border: 2px solid #FF5A5F; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                            <div style="background: linear-gradient(to right, #FF5A5F, #E0484D); color: #ffffff; padding: 14px 8px; text-align: center;">
                                <div style="font-size: 14px; font-weight: bold;">Full Experience Package</div>
                                <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #F2B705;">$689 <span style="font-size: 11px; font-weight: normal; color: #e2e8f0;">+ 5% TAX</span></div>
                                <div style="font-size: 11px; color: #e2e8f0; margin-top: 2px;">Early Bird <span style="color: #ffffff; font-weight: bold;">(Save $150)</span></div>
                            </div>
                            <div style="text-align: center; padding: 8px 4px 4px; font-size: 10px; font-weight: bold; color: #2EC4B6; text-transform: uppercase;">
                                VIP FULL EXPERIENCE
                            </div>
                            <div style="padding: 10px 8px 16px; font-size: 11px; line-height: 1.7; color: #333333; text-align: left;">
                                <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Everything in Delegation + Accommodation</div>
                                <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Bosphorus Dinner Cruise Trip</div>
                                <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Airport Arrival &amp; Dropoff Assistance</div>
                                <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Lucky Draw</div>
                                <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> Priority Registration</div>
                                <div style="margin-bottom: 7px;"><span style="color: #5A6A80; font-weight: bold; font-size: 13px; margin-right: 5px;">&#10004;</span> 2 Lunch &amp; 3 Dinner</div>
                            </div>
                        </td>
                    </tr>
                </table>

                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#fff; box-shadow:0 4px 8px rgba(0,0,0,0.1); width: 600px; min-width: 600px;">
                    <!-- PAYMENT BUTTON (Same clean style) -->
                    <tr>
                        <td align="center" style="padding: 10px 20px 20px 20px;">
                            <table role="presentation" style="width: 100%; max-width: 560px; margin: 10px auto; font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
                                <tr>
                                    <td style="font-weight: bold; font-size: 18px; color: #000; padding-bottom: 8px;">Payment</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 14px; color: #333; padding-bottom: 16px;">
                                        Lock in your exclusive Early Bird rate by completing your payment below:
                                    </td>
                                </tr>
                                 <tr>
                                     <td>
                                         <a href="${paymentUrl}" target="_blank"
                                            style="display: inline-block; padding: 12px 60px; font-size: 16px; font-weight: bold; color: #fff; text-decoration: none; background: linear-gradient(to right, #00509E, #003A70, #002855); border-radius: 4px; box-shadow: 0 3px 6px rgba(0,0,0,0.15);">
                                            Pay Now
                                         </a>
                                     </td>
                                 </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- INSTALLMENT PAYMENT OPTION -->
                    <tr>
                        <td align="center" style="padding: 0 20px 24px 20px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #F0F7FF; border: 1.5px dashed #00509E; border-radius: 8px; padding: 18px 20px; text-align: left;">
                                <tr>
                                    <td>
                                        <div style="font-size: 15px; font-weight: bold; color: #003A70; margin-bottom: 6px;">
                                            &#128179; Can't Pay All at Once? Flexible Installments Available!
                                        </div>
                                        <div style="font-size: 13px; color: #444; line-height: 1.5; margin-bottom: 12px;">
                                            You don't have to miss out on your Early Bird discount! If you prefer to pay your conference fee in convenient installments, our team can arrange a custom payment schedule for you.
                                        </div>
                                        <div style="font-size: 13px; color: #222; margin-bottom: 12px;">
                                            To set up an installment plan, contact us at: <a href="mailto:info@atsasmun.com" style="color: #00509E; font-weight: bold; text-decoration: underline;">info@atsasmun.com</a>.
                                        </div>
                                        <div>
                                            <a href="${installmentMailto}" style="display: inline-block; background: #00509E; color: #ffffff; text-decoration: none; padding: 9px 18px; border-radius: 5px; font-weight: bold; font-size: 12px;">
                                                &#9993; Request Installment Plan (info@atsasmun.com)
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CONTACT & ASSISTANCE -->
                    <tr>
                        <td align="center" style="padding: 20px; background: #f9f9f9; border-top: 1px solid #eee; text-align: center;">
                            <p style="margin: 0 0 6px 0; font-size: 14px; font-weight: bold; color: #000;">Should you have any questions, feel free to reach us at:</p>
                            <p style="margin: 0 0 12px 0; font-size: 14px;">
                                <a href="mailto:info@atsasmun.com" style="color: #00509E; font-weight: bold; text-decoration: underline;">info@atsasmun.com</a>
                                &nbsp;|&nbsp;
                                <a href="https://wa.me/+447498072531" target="_blank" style="color: #25D366; font-weight: bold; text-decoration: none;">WhatsApp: +44 7498 072531</a>
                            </p>
                            <p style="margin: 0; font-size: 12px; color: #777;">We look forward to welcoming you to Istanbul, T&uuml;rkiye!</p>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td align="center" style="background-color:#003366; color:#fff; padding:20px; text-align: center;">
                            <p style="margin:0; font-size:13px; color: #fff;">Atsas MUN T&uuml;rkiye &copy; 2026 Atsas Creation International Ltd</p>
                            <p style="margin:5px 0 0; font-size:11px; color: #e2e8f0;"><em>"Forging a Diplomatic World of Unity and Peace"</em></p>
                        </td>
                    </tr>
                </table>
            </td>
    </table>

    <!-- Anti-quoted text / Prevent Gmail thread collapse -->
    <div style="display:none !important; font-size:1px; color:#f8f9fa; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; mso-hide:all;">
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
        Ref-${Date.now()}-${Math.floor(Math.random() * 100000)}
    </div>

</body>
</html>`;
}
