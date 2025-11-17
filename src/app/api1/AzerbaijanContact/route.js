import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer'; // Install puppeteer using npm

export async function POST(request) {
    const username = process.env.NEXT_PUBLIC_SMTP_USERNAME;
    const password = process.env.NEXT_PUBLIC_SMTP_PASSWORD;

    try {
        const { name, email, destination, id ,startdate, enddate, month, year } = await request.json();
        console.log("nodemailer id", id );

        if (!name || !email || !destination) {
            return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
        }

        let link2o;
        if (destination == "Dubai, UAE") {
            link2o = "http://localhost:3000/UAEpayment/1";
        } else if (destination == "Baku, Azerbaijan") {
            link2o = "http://localhost:3000/Azerbaijanpayment/1";
        } else if (destination == "New York, USA") {
            link2o = "http://localhost:3000/USApayment/1";
        } else if (destination == "Riyadh, Saudi Arabia") {
            link2o = "http://localhost:3000/ Saudi Arabiapayment/1";
        } else if (destination == "Paris, France") {
            link2o = "http://localhost:3000/Francepayment/1";
        } else if (destination == "Istanbul, Turkey") {
            link2o = "http://localhost:3000/Istanbulpayment/1";
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: username,
                pass: password,
            },
        });
        const pdfPath = 'https://res.cloudinary.com/dhqbmpldd/image/upload/v1735156197/Rundown_br2xjm.pdf'; // Corrected Google Drive link for direct download
        //  first email template 
        const mailOptions = {
            from: 'Atsas MUN',
            to: email,
            subject: 'Your Registration has been Received',
            html: `<!DOCTYPE html>
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
                        <td align="center" style=" background-color:#fff;">
                            <img src="https://e75ca47a0b.imgdist.com/pub/bfra/ve0zzru6/dnd/vya/qic/Without-01-removebg-preview.png" 
                                 alt="ATSAS MUN Logo" width="170">
                        </td>
                    </tr>

                    <!-- HEADER -->
                    <tr>
                        <td align="center" style="text-align: center;
                            background-image: url('https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/6tz/dj7/j5a/%23010c47.png');
                            background-size: cover;
                            background-repeat: no-repeat;
                            min-height: 30vh;
                            max-width: 100%;
                            background-position: center; 
                            color:#fff; 
                            padding:70px;">
                            <h1 style="margin:0; font-size:50px; color: white;">Thank You</h1>
                            <p style="margin:20px 0 0; font-size:18px; color: white;">Your Registration is Now Complete</p>
                            <p style="margin:6px 0 0; font-size:18px; color: white;">for Baku, Azerbaijan</p>
                            <p style="margin:20px 0 0; font-size:22px; color: white;">(${name})</p>
                        </td>
                    </tr>

                    <!-- DATE -->
                    <tr>
                        <td align="center" style="padding:20px;">
                            <h2 style="margin:0; font-size:20px; color:#000;">Date: ${startdate}–${enddate} ${month}, ${year}</h2>
                            <hr style="width:80%; border-top:1px solid #ddd; margin-top: 20px;">
                            <p style="font-size:16px; color: #000;">We are pleased to inform you that your registration at Atsas International Model United Nations has been received. The shortlisted applicants will be contacted shortly through email within 24 hours.</p>
                        </td>
                    </tr>

                 <!-- SOCIAL MEDIA & REFERRAL SECTION -->
<tr>
    <td align="center" style="padding: 30px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
                <!-- Social Media Section -->
                <td align="center" style="width: 48%; padding: 1px; vertical-align: middle; ;">
                    <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/4wi/59y/4ps/images-removebg-preview.png" 
                         alt="Follow Us" width="120" style="display: block; margin-bottom: 15px; margin-top: 50px">
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
                         alt="Referral" width="100" style="display: block; margin-bottom: 15px; margin-top: -30px">
                    <p style="font-size: 16px; color: #333; margin: 0; margin-top: -10px;">
                        Tag 5 of your friends to receive a special referral code for a discount in your conferenc
                        fee if the tagged delegate attends the MUN as well.
                    </p>
                </td>
            </tr>
        </table>
    </td>
</tr>


                    <!-- CTA BUTTON -->
                    <tr>
                        <td align="center" style="padding:20px;">
                            <a href="https://www.atsasmun.com/Azerbaijanpayment/1?userid=${id}" style=" background: linear-gradient(to right, #00509E, #003A70, #002855); color:#fff; text-decoration:none; padding:10px 30px; border-radius:5px; font-size:16px; display:inline-block;">
                                Click here for Conference Fee
                            </a>
                        </td>
                    </tr>


<!-- facbook-----section--------------------- -->


<table style="width: 100%; font-family: Arial, sans-serif; line-height: 1.6; margin-top: 20px; padding: 0;  background: #f2f4f7bb; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); color: #333; text-align: center;">
   
    <tr>
        <td colspan="3" style="max-width: 800px; margin: 40px auto; text-align: center; padding:0px 10px;">
            <h3 style="font-size: 18px; margin-bottom: 10px; color: #2c3e50;">Please take a look at the information about the event below:</h3>
            <p style="font-size:16px; color: #555; margin-bottom: 20px;">
                AtsasMUN has integrated 2 committees into its conferences. The esteemed members of our secretariat are highly talented and dedicated to ensuring a seamless experience for all participants.
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
    </tr>
</table> 

        <table role="presentation" width="100%" cellpadding="10" cellspacing="0" border="0" style="max-width: 600px; margin: auto; border-collapse: collapse; font-family: Arial, sans-serif;">
    <!-- Title Section -->
    <tr>
        <td colspan="2" align="center" style="padding: 40px 20px 20px 10px ; font-size: 20px; font-weight: bold; color: #000; ">
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
            Non-Accommodation $349
 
        </td>
        <!-- Accommodation Column -->
        <td style="            background: linear-gradient(to right, #00509E, #003A70, #002855);
; color: white; padding: 10px; font-size: 16px; font-weight: bold; border-radius: 0 8px 0 0; text-align: center;">
            Accommodation $499
        </td>
    </tr>
    <tr>
        <!-- Non-Accommodation Details -->
        <td style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align:left;">
            ATSASMUN Merch and Kit
        </td>
        <td style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
            Everything in Non-Accommodation Package
        </td>
    </tr>
    <tr>
        <td style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
            United Nations Simulation Committee Sessions
        </td>
        <td style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
            5 Star Accommodation-Twin Shared/3 Nights
        </td>
    </tr>
    <tr>
        <td style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
            ATSASMUN UNHCR Endorsed Certificates
        </td>
        <td style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
            3 Buffet Breakfasts
        </td>
    </tr>
    <tr>
        <td style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
            Cultural Global Village and Performances
        </td>
        <td style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
            2 Lunch and 3 Dinners
        </td>
    </tr>
    <tr>
        <td style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
            Ice-breaking Session
        </td>
        <td style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
       Baku City Tour
        </td>
    </tr>
    <tr>
        <td style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
            Diplomatic Dinner Gala
        </td>
        <td style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
  
        </td>
    </tr>
    <tr>
        <td style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
            1 Lunch and 2 Dinners
        </td>
        <td style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
      
        </td>
    </tr>
</table>

 <table
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
                                    
                                      <a href="https://www.atsasmun.com/Azerbaijanpayment/1?userid=${id}"
                                     style="display: inline-block; padding: 10px 100px; font-size: 16px; font-weight: bold; color: #fff; text-decoration: none;  background: linear-gradient(to right, #00509E, #003A70, #002855);">Pay
                                     Now</a>
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
                                        <a href="https://www.facebook.com/share/189wEJeHZ5/?mibextid=wwXIfr" target="_blank" style="text-decoration: none; color: #333; display: flex; align-items: center; gap: 10px;">
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
                            We look forward to meeting you in Baku, Azerbaijan!
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
                            <p style="margin:0; font-size:14px;">Atsas MUN Azerbaijan © 2024 Atsas Creation International Ltd</p>
                            <p style="margin:5px 0 0; font-size:12px; color:#fff;"><em>Forging a Diplomatic World of Unity and Peace</em></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>

</html>`,
            // attachments: [
            // 	{
            // 		filename: 'Rundown_br2xjm.pdf',
            // 		path: pdfPath, // Path to the file
            // 	},
            // ],
        };

        // Send the first email immediately
        await transporter.sendMail({ ...mailOptions, });

        // Schedule the second email to be sent after 24 hours
//         setTimeout(async () => {
//             try {
//                 // Generate PDF using Puppeteer
//                 const browser = await puppeteer.launch();
//                 const page = await browser.newPage();
//                 //  pdf genrate template 
//                 const htmlContent = `
//                            <!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>Letter of Acceptance</title>
// </head>
// <style>
//   .page-break {
//     page-break-after: always;
//   }
// </style>

// <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f8f9fa; color:#333;">

//   <table class="page-break" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff;">
//     <tr>
//       <td align="center">
//         <table width="800" cellpadding="0" cellspacing="0">
//           <tr>
//             <!-- Left Column with blue background and images -->
//             <td width="120" valign="top"
//               style="background-color:#ffffff; border-right: 4px solid #003c71; position: relative;">
//               <!-- Logo -->
//               <div style="text-align:center; padding: 30px 17px 0px 17px;">
//                 <img
//                   src="https://ftueyhj.stripocdn.email/content/guids/CABINET_76edfd603639686b19c3686766c1f4512d98005c2183ca057d0378867dab713b/images/image_zAB.png"
//                   alt="Logo" style="width:130px; display:block; margin: 0 auto;" />
//               </div>
//               <p style="font-size: 9px; text-align:center; margin: 7px 0; color:#333333;">
//                 <span style="color: #003c71;"> Diplomatic </span> Simulation <span style="color: #003c71;"> of </span>
//                 <br> <span style="color: #003c71;"> the </span> United Nations
//               </p>
//               <!-- Spacer Row to Push Leaf Image to Bottom -->
//               <div style="height: 580px;"></div>
//               <!-- Leaf Image -->
//               <div style="width: 100%;">
//                 <img
//                   src="https://ftueyhj.stripocdn.email/content/guids/CABINET_76edfd603639686b19c3686766c1f4512d98005c2183ca057d0378867dab713b/images/whatsapp_image_20250409_at_111009_97810a2aremovebgpreview.png"
//                   alt="Leaf" style="width:105%; display: block;" />
//               </div>
//             </td>

//             <!-- Right Column with Content -->
//             <td valign="top"
//               style="padding: 40px 20px; font-family: Arial, sans-serif; font-size:14px; line-height: 1.6;">
//               <h2 style="text-align: center; margin: 0; font-size: 20px; color: #26427e;">
//                 LETTER OF ACCEPTANCE
//               </h2>
//               <p style="text-align: center; font-weight: bold; margin: 40px 0; color:#333333;">
//                 CONGRATULATIONS
//               </p>

//               <p style="color:#333333;">
//                 Dear Applicant,<br /><br />
//                 We are grateful to inform you that you have been selected to join the Atsas International MUN Baku, Azerbaijan
//                 2025 United Nations Simulation Conference Crafting Future Leaders in the Post-Pandemic Era, to be held
//                 from 26th to 29th June 2025 in Baku, Azerbaijan.
//               </p>

//               <p style="color:#333333;">
//                 Atsas Creation International is a High Wycombe, UK Based Diplomatic Simulation Organizer which serves as
//                 a platform for Young Leaders and Change makers to exchange ideas and resolve the most challenging global
//                 issues.
//               </p>

//               <p style="color:#333333;">We are pleased to accept and invite you, with detailed information as follows:</p>
         
//               <p style="color:#333333;">
//                 <strong>Name:</strong> ${name}<br />
//                 <strong>Duration of stay:</strong> 26<sup>th</sup> – 29<sup>th</sup> June, 2025<br />
//                 <strong>Venue:</strong> Grand Hyatt Goa India <br />
//                 <strong>Destination:</strong> Baku, Azerbaijan
//               </p>

//               <p style="color:#333333;">
//                 <em>You are requested to pay your delegate fee in order to become a confirmed delegate at Atsasmun India
//                   on the following link:</em><br />
//                 <a href="https://www.atsasmun.com/Azerbaijanpayment/1?userid=${id}" style="color:#003c71;">
//                   https://www.atsasmun.com/Azerbaijanpayment
//                 </a>
//               </p>

//               <p style="font-size: 11px; color: #666; text-align: center; margin-top: 429px;">
//                 Address: 42 Heneretton Way High Wycombe, HP13 7UE, United Kingdom<br />
//                 Website: www.atsasmun.com | Email: info@atsasmun.com<br />
//                 Phone: +44 7487 302522
//               </p>
//             </td>
//           </tr>
//         </table>
//       </td>
//     </tr>
//   </table>




//   <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff; margin-top: 50px;">
//     <tr>
//       <td align="center">
//         <table width="800" cellpadding="0" cellspacing="0">
//           <tr>
//             <!-- Left Column with blue background and images -->
//             <td width="120" valign="top"
//               style="background-color:#ffffff; border-right: 4px solid #003c71; position: relative;">
//               <!-- Logo -->
//               <div style="text-align:center; padding: 50px 17px 0px 17px;">
//                 <img
//                   src="https://ftueyhj.stripocdn.email/content/guids/CABINET_76edfd603639686b19c3686766c1f4512d98005c2183ca057d0378867dab713b/images/image_zAB.png"
//                   alt="Logo" style="width:130px; display:block; margin: 0 auto;" />
//               </div>
//               <p style="font-size: 9px; text-align:center; margin: 7px 0; color:#333333;">
//                 <span style="color: #003c71;"> Diplomatic </span> Simulation <span style="color: #003c71;"> of </span>
//                 <br> <span style="color: #003c71;"> the </span> United Nations
//               </p>
//               <!-- Spacer Row to Push Leaf Image to Bottom -->
//               <div style="height: 150px;"></div>
//               <!-- Leaf Image -->
//               <div style="width: 100%; margin-top: 420px;">
//                 <img
//                   src="https://ftueyhj.stripocdn.email/content/guids/CABINET_76edfd603639686b19c3686766c1f4512d98005c2183ca057d0378867dab713b/images/whatsapp_image_20250409_at_111009_97810a2aremovebgpreview.png"
//                   alt="Leaf" style="width:105%; display: block;" />
//               </div>
//             </td>

//             <!-- Right Column with Content -->
//             <td valign="top"
//               style="padding: 60px 20px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
//               <ul style="padding-left: 20px; margin-top: 0 ; color:#333333; ">
//                 <li>
//                   Each participant will be responsible for his/her visa fee
//                   and flight ticket to and from Baku, Azerbaijan
// .
//                 </li>
//                 <li>
//                   We will accommodate your Visa Invitation Letter.
//                 </li>
//                 <li>
//                   We provide visa services for Baku, Azerbaijan
// .
//                 </li>
//                 <li>
//                   Hotel check-in will be on 26th June 2025 and check-out on
//                   29th June 2025, except for those who will be taking the Full
//                   Experience Package.
//                 </li>
//                 <li>
//                   The committee will provide accommodation (including stay,
//                   meals, local transportation and T-shirts) to the
//                   participants with Accommodation and Full Experience
//                   packages during the event.
//                 </li>
//                 <li>
//                   Before departure, please ensure you are carrying the
//                   following mandatory items on you:

//                 <li>Valid Passport</li>
//                 <li>Valid Visa</li>

//                 </li>
//               </ul>

//               <p style="margin-top: 20px ; color:#333333;">
//                 We would like to thank you in advance for your cooperation and
//                 kind attention. Looking forward to seeing you in Baku, Azerbaijan.
//               </p>

//               <p style="margin-top: 40px">Regards</p>
//               <table cellpadding="0" cellspacing="0" border="0" >
//                 <tr>
//                   <td style=" padding: 0; margin: 0; vertical-align: middle;">
//                     <img
//                       src="https://ftueyhj.stripocdn.email/content/guids/CABINET_2931b97566d3407768315cf288299eaf675e4b98b62ac690766b987c273adeb9/images/image_gkX.png"
//                       alt="Signature"
//                       style=" max-width: 90px; height: auto; display: inline-block; vertical-align: middle;"
//                     />
//                   </td>
//                   <td style="  padding: 0; margin: 0; vertical-align: middle; ">
//                     <img
//                       src="https://ftueyhj.stripocdn.email/content/guids/CABINET_2931b97566d3407768315cf288299eaf675e4b98b62ac690766b987c273adeb9/images/stamp_atsasmun.png"
//                       alt="Stamp"
//                       style=" max-width: 100px; height: auto; display: inline-block; vertical-align: middle;"
//                     />
//                   </td>
//                 </tr>
//               </table>
              

//               <p style="margin-top: 6px; font-weight: bold ; color:#333333;">
//                 Fasih Ur Rehman<br />
//                 <span style="font-weight: normal">info@atsasmun.com<br />
//                   Office of the Secretariat<br />
//                   ATSAS International MUN</span>
//               </p>
//                <p style="font-size: 11px; color: #666; text-align: center; margin-top: 340px;">
//                 Address: 42 Heneretton Way High Wycombe, HP13 7UE, United Kingdom<br />
//                 Website: www.atsasmun.com | Email: info@atsasmun.com<br />
//                 Phone: +44 7487 302522
//               </p>
//             </td>
//           </tr>
//         </table>
//       </td>

//     </tr>
//   </table>
//   </td>
//   </tr>
//   </table>

// </body>

// </html>
//                         `;

//                 await page.setContent(htmlContent);
//                 const pdfBuffer = await page.pdf({ format: 'A4' });
//                 await browser.close();

//                 const transporter = nodemailer.createTransport({
//                     host: 'smtp.gmail.com',
//                     port: 587,
//                     secure: false,
//                     auth: {
//                         user: username,
//                         pass: password,
//                     },
//                 });

//                 //  sec email template 
//                 const mailOptions = {
//                     from: 'Atsas MUN',
//                     to: email,
//                     subject: 'Your Registration has been Received',
//                     html: `<!DOCTYPE html>
//         <html lang="en">

//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Document</title>
//         </head>

//         <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#ffffff; color:#333;">
//              <table
//                 style="width: 100%; max-width: 800px; margin: 20px auto; text-align: center; background: #ffffff; border-collapse: collapse;">
//                 <!-- Logo Row -->
//                 <tr>
//                     <td align="center" style=" background-color:#fff;">
//                         <img src="https://e75ca47a0b.imgdist.com/pub/bfra/ve0zzru6/dnd/vya/qic/Without-01-removebg-preview.png"
//                             alt="ATSAS MUN Logo" width="170">
//                     </td>
//                 </tr>
//                 <!-- Background Image Section -->
//                 <tr>
//                     <td
//              <td align="center" style=" text-align: center;
//                                 background-image: url('https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/2p9/g6d/6qx/bg.png');
//                                 background-size: cover;
//                             background-repeat: no-repeat;
//                             min-height: 30vh;
//                             max-width: 100%;
//                             background-position: center; 
//                             color:#fff; 
//                             padding:70px;">
//                                     <h1 style="margin:0; font-size:50px; color: white;">CONGRATULATIONS!</h1>

//                         <!-- Name -->
//                         <p
//                             style="font-size: 1.4rem; font-weight: bold; margin: 10px 0; color: white; text-decoration: underline;">
//                             ${name}</p>
//                         <!-- Subtext -->
//                         <p style="font-size: 0.9rem; margin: 30px 30px 10px 20px; color: white;">
//                             You have been selected as one of the delegates at AtsasMUN Baku, Azerbaijan
//                             Please find attached the official acceptance letter in this email.
//                         </p>
//                         <p style="font-size: 0.9rem; margin: 5px 40px 10px 20px; color: white;">
//                             You have been recognized as an Early Bird Applicant and are eligible for free airport Assistance in the host country on your arrival for AtsasMUN India.
//                         </p>
//                     </td>
//                 </tr>

//             </table>
//             <table style="width: 100%; max-width: 800px; margin: 20px auto; border-collapse: collapse; background: #ffffff;">
//                 <!-- Image Section -->
//                 <td style="margin-bottom: 30px;">
//                     <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/gpl/90q/wob/Capture.PNG" alt="Eligibility Image"
//                         style="width: 100%; max-height: 450px; object-fit: cover; ">
//                 </td>
//             </table>
//             <table style="width: 100%; max-width: 800px; margin: 40px auto; border-collapse: collapse; background: #ffffff;">

//                 <!-- Image Section -->
//                 <td>
//                     <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/jwv/ano/u8g/Capture2.PNG" alt="Eligibility Image"
//                         style="width: 100%; max-height: 450px; object-fit: cover; ">
//                 </td>

//             </table>

//             <table style="width: 100%; margin: 0px auto; margin-top: -50px; background-color: #fff; padding: 25px 2px 2px 2px;">
//                 <tr>
//                     <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Committee
//                         Allocation Policy</td>
//                 </tr>
//                 <tr>
//                     <td style="padding: 10px;">
//                         <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
//                             <li>AtsasMUN does not guarantee the availability of preferred countries and encourages participants
//                                 to select alternatives if necessary.</li>
//                         </ul>
//                     </td>
//                 </tr>
//                 <tr>
//                     <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Payments</td>
//                 </tr>
//                 <tr>
//                     <td style="padding: 10px;">
//                         <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
//                             <li>Payments must be made through the official AtsasMUN website.</li>
//                             <li>AtsasMUN will not acknowledge payments made to unauthorized individuals claiming to represent
//                                 the organization.</li>
//                             <li>Accepted payment methods include credit/debit cards and international wire transfers.</li>
//                         </ul>
//                     </td>
//                 </tr>
//                 <tr>
//                     <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Refund Policy</td>
//                 </tr>
//                 <tr>
//                     <td style="padding: 10px;">
//                         <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
//                             <li>Subject to the following restrictions, delegates who have made their full payment may ask for a
//                                 credit voucher or transfer their participation to another AtsasMUN location.</li>
//                             <li>Requests have to be submitted sixty days prior to the start of the event. Credit coupons or
//                                 transfers are only good for AtsasMUN activities.</li>
//                             <li>Delegates who only paid an installment will not be eligible for credit vouchers or transfers;
//                                 the installment will be kept as a cancellation charge.</li>
//                         </ul>
//                     </td>
//                 </tr>
//                 <tr>
//                     <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Code of Conduct
//                     </td>
//                 </tr>
//                 <tr>
//                     <td style="padding: 10px;">
//                         <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
//                             <li>Participants must ensure all information provided during registration is accurate. False
//                                 information will result in disqualification and potential legal action.</li>
//                             <li>All submitted materials must be original; plagiarism will result in disqualification.</li>
//                             <li>Participants must obey the host country’s laws and are personally responsible for any damages or
//                                 violations.</li>
//                             <li>AtsasMUN is not liable for participant misconduct; individuals will bear sole responsibility for
//                                 their actions.</li>
//                             <li>Participants must adhere to the Code of Conduct outlined in the Conference Handbook.</li>
//                         </ul>
//                     </td>
//                 </tr>
//             </table>


//             <table
//                 style="width: 100%; max-width: 800px; margin: 10px auto; margin-bottom: 0px; margin-top: 0px; border-collapse: collapse; background: #ffffff;">

//                 <!-- Image Section -->
//                 <td>
//                     <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/gdl/53b/vsi/Capture3.PNG" alt="Eligibility Image"
//                         style="width: 100%; max-height: 350px; object-fit: cover; ">
//                 </td>

//             </table>

//             <table role="presentation" width="100%"  cellspacing="0" cellpadding="0" border="0"
//                 style="background-color:#ffffff;  margin-top: -5px;">
//                 <tr>
//                     <td align="center">
//                         <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
//                             style="background-color:#fff;  box-shadow:0 4px 8px rgba(0,0,0,0.1);">

//                             <!-- payment//////////////////////// -->
//                             <table role="presentation" width="100%" cellpadding="10" cellspacing="0" border="0"
//                                 style="max-width: 600px; margin: auto; border-collapse: collapse; font-family: Arial, sans-serif;">
//                                 <!-- Title Section -->
//                                 <tr>
//                                     <td colspan="2" align="center"
//                                         style="padding: 40px 20px 20px 10px ; font-size: 20px; font-weight: bold; color: #000; ">
//                                         Conference Fee Packages
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td colspan="2" align="center" style="padding-bottom: 20px; font-size: 16px; color: #555;">
//                                         New Year Early Bird Packages
//                                     </td>
//                                 </tr>
//                                 <!-- Packages Section -->
//                                 <tr>
//                                     <!-- Non-Accommodation Column -->
//                                     <td style="            background: linear-gradient(to right, #00509E, #003A70, #002855);
//           color: white; padding: 10px; font-size: 16px; font-weight: bold; border-radius: 8px 0 0 0; text-align: center;">
//                                         Non-Accommodation $249
//                                     </td>
//                                     <!-- Accommodation Column -->
//                                     <td style="            background: linear-gradient(to right, #00509E, #003A70, #002855);
//         ; color: white; padding: 10px; font-size: 16px; font-weight: bold; border-radius: 0 8px 0 0; text-align: center;">
//                                         Accommodation $579
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <!-- Non-Accommodation Details -->
//                                     <td
//                                         style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align:left;">
//                                         ATSASMUN Merch and Kit
//                                     </td>
//                                     <td
//                                         style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
//                                         Everything in Non-Accommodation Package
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td
//                                         style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
//                                         United Nations Simulation Committee Sessions
//                                     </td>
//                                     <td
//                                         style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
//                                         5 Star Accommodation-Twin Shared/3 Nights
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td
//                                         style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
//                                         ATSASMUN UNHCR Endorsed Certificates
//                                     </td>
//                                     <td
//                                         style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
//                                         3 Buffet Breakfasts
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td
//                                         style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
//                                         Cultural Global Village and Performances
//                                     </td>
//                                     <td
//                                         style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
//                                         2 Lunch and 3 Dinners
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td
//                                         style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
//                                         Ice-breaking Session
//                                     </td>
//                                     <td
//                                         style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
//                                         Goa City Tour                          </td>
//                                 </tr>
//                                 <tr>
//                                     <td
//                                         style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
//                                         Diplomatic Dinner Gala
//                                     </td>
//                                     <td
//                                         style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td
//                                         style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
//                                         1 Lunch and 2 Dinners
//                                     </td>
//                                     <td
//                                         style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
//                                     </td>
//                                 </tr>
//                             </table>

//                             <table
//                                 style="width: 100%; max-width: 800px; margin: 20px auto; font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
//                                 <tr>
//                                     <td style="font-weight: bold; font-size: 18px; color: #000; padding-bottom: 10px;">Payment
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td style="font-size: 15px; color: #333; padding-bottom: 20px;">You can pay at the link
//                                         below</td>
//                                 </tr>
//                                 <tr>
//                                     <td>

//                                         <a href="http://localhost:3000/Azerbaijanpayment/1?userid=${id}"
//                                             style="display: inline-block; padding: 10px 100px; font-size: 16px; font-weight: bold; color: #fff; text-decoration: none;  background: linear-gradient(to right, #00509E, #003A70, #002855);">Pay
//                                             Now</a>
//                                     </td>
//                                 </tr>
//                             </table>


//                             <table
//                                 style="width: 100%; max-width: 800px; margin: 40px auto; text-align: center; padding: 20px; background: #f9f9f9; border-radius: 10px; border-collapse: collapse;">
//                                 <!-- First Line -->


//                                 <tr>
//                                     <td style="padding: 20px; font-size:19px; color:#333; line-height: 1.5;">
//                                         A formal Visa Invitation Letter can be obtained from us upon request after the payment
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td style="padding: 10px; font-size: 17px; color: #333;">
//                                         Should you have any questions, feel free to reach us at
//                                         <a href="mailto:info@atsasmun.com" target="_blank"
//                                             style="text-decoration: underline;  font-weight: bold; color: #000000;">info@atsasmun.com</a>
//                                         We will be happy to assist you.
//                                     </td>
//                                 </tr>
//                                 <!-- Assistance Line -->
//                                 <tr>
//                                     <td style="padding: 10px; font-size: 1rem; color: #333;">
//                                         <hr>
//                                     </td>
//                                 </tr>
//                                 <!-- Highlighted Line -->
//                                 <tr>
//                                     <td style="padding: 20px; font-size: 1rem; color: black; font-weight: bold;">
//                                         We look forward to meeting you in Baku, Azerbaijan!
//                                     </td>
//                                 </tr>
//                                 <!-- Final Thank You Line -->
//                                 <tr>
//                                     <td style="padding: 0px 10px 10px 0px; font-size: 0.9rem; color: #333; line-height: 1.5; ">
//                                         Once again, thank you for registering yourself as a part of this powerful Diplomatic
//                                         Conference!
//                                     </td>
//                                 </tr>
//                             </table>

//                             <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">

//                                 <tr>
//                                     <td align="center"
//                                         style="background-color:#003366; color:#fff; padding:20px; margin:0; font-size:14px;">
//                                         <p style="margin:0; font-size:14px;">Atsas MUN India © 2024 Atsas Creation
//                                             International Ltd</p>
//                                         <p style="margin:5px 0 0; font-size:12px; color: #fff;"><em>Forging a Diplomatic World
//                                                 of Unity and Peace</em></p>
//                                     </td>
//                                 </tr>
//                             </table>

//                     </td>
//                 </tr>
//             </table>

//         </body>

//         </html>`,
//                     attachments: [
//                         {
//                             filename: 'Registration_Details.pdf',
//                             content: pdfBuffer, // Directly use the PDF buffer
//                             contentType: 'application/pdf',
//                         },
//                     ],
//                 };

//                 // Send the email
//                 await transporter.sendMail(mailOptions);
//                 console.log('Email sent successfully.');
//             } catch (error) {
//                 console.error('Error sending email:', error);
//             }
//         }, 28800000); // 8 hours in milliseconds

        return NextResponse.json({ message: 'Success: Emails sent and scheduled' });
    } catch (error) {
        console.error('Error initiating email process:', error);
        return NextResponse.json({ message: 'Failed to process the request' }, { status: 500 });
    }
}
