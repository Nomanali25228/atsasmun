import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer'; // Install puppeteer using npm

export async function POST(request) {
    const username = process.env.NEXT_PUBLIC_SMTP_USERNAME;
    const password = process.env.NEXT_PUBLIC_SMTP_PASSWORD;

    try {
        const { name, email, destination, id } = await request.json();
        console.log("nodemailer id", id);

        if (!name || !email || !destination) {
            return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
        }

        let link2o;
        if (destination == "Dubai, UAE") {
            link2o = "http://localhost:3000/UAEpayment/1";
        } else if (destination == "Goa, India") {
            link2o = "http://localhost:3000/Indiapayment/1";
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
            from: username,
            to: email,
            subject: 'Your Registration has been Received',
            html: `<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]-->
    <!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i" rel="stylesheet">
    <!--<![endif]-->
    <!--[if mso]><xml>
    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
      <w:DontUseAdvancedTypographyReadingMail/>
    </w:WordDocument>
    </xml><![endif]-->
  </head>
  <body class="body">
    <div dir="ltr" class="es-wrapper-color">
      <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f4f2f2"></v:fill>
			</v:background>
		<![endif]-->
      <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper">
        <tbody>
          <tr>
            <td valign="top" class="esd-email-paddings">
              <table cellpadding="0" cellspacing="0" align="center" class="esd-header-popover es-header">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#FBFBFB" align="center" cellpadding="0" cellspacing="0" width="600" class="es-header-body" style="background-color:#fbfbfb">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p20t es-p10b es-p20r es-p20l">
                              <!--[if mso]><table width="560" cellpadding="0"
                            cellspacing="0"><tr><td width="180" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                                <tbody>
                                  <tr>
                                    <td width="180" valign="top" align="center" class="es-m-p0r es-m-p20b esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="left" class="esd-block-image es-m-txt-c" style="font-size:0px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://ftueyhj.stripocdn.email/content/guids/CABINET_ad416bd43d1c60dbb19de0fe5183e33b/images/vector.png" alt="Logo" height="40" title="Logo" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td><td width="20"></td><td width="360" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="right">
                                <tbody>
                                  <tr>
                                    <td width="360" align="left" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td esd-tmp-menu-font-weight="bold" esd-tmp-menu-font-style="italic" esd-tmp-menu-padding="15|10" class="esd-block-menu">
                                              <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top" width="33.33%" id="esd-menu-id-0" class="es-p10t es-p10b es-p5r es-p5l esd-block-menu-item" style="padding-top:15px">
                                                      <div>
                                                        <a target="_blank" href="https://viewstripo.email" style="font-weight:bold;font-style:italic">
                                                          Home &gt;
                                                        </a>
                                                      </div>
                                                    </td>
                                                    <td align="center" valign="top" width="33.33%" id="esd-menu-id-1" class="es-p10t es-p10b es-p5r es-p5l esd-block-menu-item" style="padding-top:15px">
                                                      <div>
                                                        <a target="_blank" href="https://viewstripo.email" style="font-weight:bold;font-style:italic">
                                                          Products &gt;
                                                        </a>
                                                      </div>
                                                    </td>
                                                    <td align="center" valign="top" width="33.33%" id="esd-menu-id-2" class="es-p10t es-p10b es-p5r es-p5l esd-block-menu-item" style="padding-top:15px">
                                                      <div>
                                                        <a target="_blank" href="https://viewstripo.email" style="font-weight:bold;font-style:italic">
                                                          Contact &gt;
                                                        </a>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-content">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-content-body">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="600" align="center" valign="top" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-banner" style="position:relative">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://ftueyhj.stripocdn.email/content/guids/bannerImgGuid/images/image1633510995616824.png" title="" alt="" class="adapt-img" width="600" height="400">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-content">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#fbfbfb" align="center" cellpadding="0" cellspacing="0" width="600" class="es-content-body" style="background-color:#fbfbfb">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p30t es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="560" align="center" valign="top" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-text">
                                              <p>
                                                <em><strong>Why we're the best</strong></em>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" class="esd-structure es-p20t es-p30b es-p20r es-p20l">
                              <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="145" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                                <tbody>
                                  <tr>
                                    <td width="125" align="center" class="es-m-p0r es-m-p20b esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image" style="font-size:0px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://ftueyhj.stripocdn.email/content/guids/CABINET_ad416bd43d1c60dbb19de0fe5183e33b/images/shield_1.png" alt="" height="65" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p10t es-p5b es-p5r es-p5l">
                                              <h3>
                                                Safety by design
                                              </h3>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                    <td width="20" class="es-hidden"></td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td><td width="145" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                                <tbody>
                                  <tr>
                                    <td width="125" align="center" class="es-m-p20b esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image" style="font-size:0px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://ftueyhj.stripocdn.email/content/guids/CABINET_ad416bd43d1c60dbb19de0fe5183e33b/images/headphones_1.png" alt="" height="65" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p10t es-p5b es-p5r es-p5l">
                                              <h3>
                                                Support 24/7
                                              </h3>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                    <td width="20" class="es-hidden"></td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td><td width="125" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                                <tbody>
                                  <tr>
                                    <td width="125" align="center" class="es-m-p20b esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image" style="font-size:0px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://ftueyhj.stripocdn.email/content/guids/CABINET_ad416bd43d1c60dbb19de0fe5183e33b/images/bicycle_1.png" alt="" height="65" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p10t es-p5b es-p5r es-p5l">
                                              <h3>
                                                Expert service
                                              </h3>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td><td width="20"></td><td width="125" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="right" class="es-right">
                                <tbody>
                                  <tr>
                                    <td width="125" align="center" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image" style="font-size:0px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://ftueyhj.stripocdn.email/content/guids/CABINET_ad416bd43d1c60dbb19de0fe5183e33b/images/toolsandutensils_1.png" alt="" height="65" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p10t es-p5b es-p5r es-p5l">
                                              <h3>
                                                Repair
                                              </h3>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-content">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-content-body">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p30t es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="560" align="center" valign="top" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-text">
                                              <p>
                                                <em><strong>Models</strong></em>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" class="esd-structure es-p30t es-p30b es-p20r es-p20l">
                              <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="345" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                                <tbody>
                                  <tr>
                                    <td width="345" align="left" class="es-m-p20b esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image" style="font-size:0px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://ftueyhj.stripocdn.email/content/guids/CABINET_ad416bd43d1c60dbb19de0fe5183e33b/images/group_13.png" alt="" width="345" class="adapt-img" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td><td width="20"></td><td width="195" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="right" class="es-right">
                                <tbody>
                                  <tr>
                                    <td width="195" align="left" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="left" class="esd-block-text">
                                              <h2>
                                                Facilisis gravida
                                              </h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="left" class="esd-block-text es-p15t es-p15b">
                                              <p>
                                                Gravida dictum fusce ut placerat. A cras semper auctor neque vitae tempus quam. Dolor sit amet consectetur.
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="left" class="esd-block-button es-p10t">
                                              <span class="es-button-border">
                                                <a href="https://viewstripo.email" target="_blank" class="es-button" style="font-weight:bold">
                                                  LEARN MORE &gt;
                                                </a>
                                              </span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                          <tr>
                            <td align="left" class="esd-structure es-p30t es-p30b es-p20r es-p20l">
                              <!--[if mso]><table dir="ltr" cellpadding="0" cellspacing="0"><tr><td><table dir="rtl" width="560" cellpadding="0" cellspacing="0"><tr><td dir="ltr" width="345" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="right" class="es-right">
                                <tbody>
                                  <tr>
                                    <td width="345" align="left" class="esd-container-frame es-m-p20b">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image" style="font-size:0px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://ftueyhj.stripocdn.email/content/guids/CABINET_ad416bd43d1c60dbb19de0fe5183e33b/images/group_12_x9O.png" alt="" width="345" class="adapt-img" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td><td dir="ltr" width="20"></td><td dir="ltr" width="195" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                                <tbody>
                                  <tr>
                                    <td width="195" align="left" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="left" class="esd-block-text">
                                              <h2>
                                                Elementum sagittis
                                              </h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="left" class="esd-block-text es-p15t es-p15b">
                                              <p>
                                                Rutrum quisque non tellus orci ac auctor augue mauris augue. Scelerisque eleifend donec pretium vulputate. In ferment.
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="left" class="esd-block-button es-p10t">
                                              <span class="es-button-border">
                                                <a href="https://viewstripo.email" target="_blank" class="es-button" style="font-weight:bold">
                                                  LEARN MORE &gt;
                                                </a>
                                              </span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td></tr></table></td></tr></table><![endif]-->
                            </td>
                          </tr>
                          <tr>
                            <td align="left" class="esd-structure es-p30t es-p30b es-p20r es-p20l">
                              <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="345" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                                <tbody>
                                  <tr>
                                    <td width="345" align="left" class="es-m-p20b esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image" style="font-size:0px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://ftueyhj.stripocdn.email/content/guids/CABINET_ad416bd43d1c60dbb19de0fe5183e33b/images/group_14.png" alt="" width="345" class="adapt-img" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td><td width="20"></td><td width="195" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="right" class="es-right">
                                <tbody>
                                  <tr>
                                    <td width="195" align="left" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="left" class="esd-block-text">
                                              <h2>
                                                Malesuada proin
                                              </h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="left" class="esd-block-text es-p15t es-p15b">
                                              <p>
                                                Gravida dictum fusce ut placerat. A cras semper auctor neque vitae tempus quam. Dolor sit amet consectetur.
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="left" class="esd-block-button es-p10t">
                                              <span class="es-button-border">
                                                <a href="https://viewstripo.email" target="_blank" class="es-button" style="font-weight:bold">
                                                  LEARN MORE &gt;
                                                </a>
                                              </span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellspacing="0" cellpadding="0" align="center" class="es-content">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-content-body" style="background-color:#ffffff">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p30t es-p15b es-p20r es-p20l">
                              <table width="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td width="560" valign="top" align="center" class="es-m-p0r es-m-p20b esd-container-frame">
                                      <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-text">
                                              <p>
                                                <strong><em>Reviews</em></strong>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-content">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-content-body">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="600" align="center" valign="top" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image" style="font-size:0px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://ftueyhj.stripocdn.email/content/guids/CABINET_ad416bd43d1c60dbb19de0fe5183e33b/images/group_69.png" alt="" width="600" class="adapt-img" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" bgcolor="#FDC500" class="esd-structure es-p30b es-p20r es-p20l" style="background-color:#fdc500">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="560" align="center" valign="top" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-text">
                                              <h2 style="color:#ffffff;line-height:130%">
                                                Sophia Bailey&nbsp;<br><em><span style="font-size:14px;line-height:130%">Professional cyclist</span></em>
                                              </h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-image es-p10t" style="font-size:0px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://ftueyhj.stripocdn.email/content/guids/CABINET_ad416bd43d1c60dbb19de0fe5183e33b/images/group_15.png" alt="" height="18" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p20t es-p20b es-p40r es-p40l">
                                              <p style="color:#ffffff;font-size:18px">
                                                «&nbsp; Elit ut aliquam purus sit amet luctus venenatis lectus magna. Amet risus nullam eget felis eget. Tincidunt vitae semper quis lectus nulla at volutpat diam ut.&nbsp;&nbsp;»
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-button es-p10t">
                                              <span class="es-button-border" style="background:#ffffff">
                                                <a href="https://viewstripo.email" target="_blank" class="es-button" style="font-weight:bold;background:#ffffff;border-color:#ffffff;color:#f8961e">
                                                  LEARN MORE &gt;
                                                </a>
                                              </span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-footer esd-footer-popover">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table align="center" cellpadding="0" cellspacing="0" width="600" bgcolor="#021d3e" class="es-footer-body" style="background-color:#021d3e">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p30t es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="560" align="center" valign="top" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image es-p10t es-p20b" style="font-size:0px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://ftueyhj.stripocdn.email/content/guids/CABINET_ad416bd43d1c60dbb19de0fe5183e33b/images/vector_1l8.png" alt="Logo" height="40" title="Logo" style="display:block">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="560" align="center" valign="top" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td esd-tmp-menu-font-weight="bold" esd-tmp-menu-font-family="lato,&#39;helvetica neue&#39;,helvetica,arial,sans-serif" esd-tmp-divider="0|solid|#ffffff" esd-tmp-menu-padding="5|5" esd-tmp-menu-color="#ffffff" esd-tmp-menu-font-style="italic" class="esd-block-menu">
                                              <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top" width="33.33%" id="esd-menu-id-1" class="es-p10t es-p10b es-p5r es-p5l esd-block-menu-item" style="padding-top:5px;padding-bottom:5px">
                                                      <div>
                                                        <a target="_blank" href="https://viewstripo.email" style="font-weight:bold;font-family:lato, &quot;helvetica neue&quot;, helvetica, arial, sans-serif;color:#ffffff;font-style:italic">
                                                          Account &gt;
                                                        </a>
                                                      </div>
                                                    </td>
                                                    <td align="center" valign="top" width="33.33%" id="esd-menu-id-2" class="es-p10t es-p10b es-p5r es-p5l esd-block-menu-item" style="padding-top:5px;padding-bottom:5px">
                                                      <div>
                                                        <a target="_blank" href="https://viewstripo.email" style="font-weight:bold;font-family:lato, &quot;helvetica neue&quot;, helvetica, arial, sans-serif;color:#ffffff;font-style:italic">
                                                          Terms of use &gt;
                                                        </a>
                                                      </div>
                                                    </td>
                                                    <td align="center" valign="top" width="33.33%" id="esd-menu-id-2" class="es-p10t es-p10b es-p5r es-p5l esd-block-menu-item" style="padding-top:5px;padding-bottom:5px">
                                                      <div>
                                                        <a target="_blank" href="https://viewstripo.email" style="font-weight:bold;font-family:lato, &quot;helvetica neue&quot;, helvetica, arial, sans-serif;color:#ffffff;font-style:italic">
                                                          Privacy police &gt;
                                                        </a>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" class="esd-structure es-p30t es-p20b es-p20r es-p20l">
                              <!--[if mso]><table width="560" cellpadding="0" 
                        cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                                <tbody>
                                  <tr>
                                    <td width="270" align="left" class="es-m-p20b esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="left" esd-links-color="#ffffff" esd-links-underline="none" class="esd-block-text">
                                              <p class="es-m-txt-c" style="color:#ffffff">
                                                No longer want to review this email?&nbsp;<br><a target="_blank" href="https://viewstripo.email/" style="color:#ffffff;text-decoration:none">Unsubscribe</a>
                                              </p>
                                              <p class="es-m-txt-c" style="color:#ffffff">
                                                <a target="_blank" href="https://viewstripo.email/" style="color:#ffffff;text-decoration:none">View in your browser</a>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="right" class="es-right">
                                <tbody>
                                  <tr>
                                    <td width="270" align="left" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="right" class="esd-block-social es-p20t es-m-txt-c" style="font-size:0">
                                              <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top" class="es-p20r">
                                                      <a target="_blank" href="https://viewstripo.email">
                                                        <img title="Facebook" src="https://ftueyhj.stripocdn.email/content/assets/img/social-icons/rounded-white/facebook-rounded-white.png" alt="Fb" width="32" height="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top" class="es-p20r">
                                                      <a target="_blank" href="https://viewstripo.email">
                                                        <img title="X" src="https://ftueyhj.stripocdn.email/content/assets/img/social-icons/rounded-white/x-rounded-white.png" alt="X" width="32" height="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top" class="es-p20r">
                                                      <a target="_blank" href="https://viewstripo.email">
                                                        <img title="Instagram" src="https://ftueyhj.stripocdn.email/content/assets/img/social-icons/rounded-white/instagram-rounded-white.png" alt="Inst" width="32" height="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top">
                                                      <a target="_blank" href="https://viewstripo.email">
                                                        <img title="Youtube" src="https://ftueyhj.stripocdn.email/content/assets/img/social-icons/rounded-white/youtube-rounded-white.png" alt="Yt" width="32" height="32">
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`,

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
        // 		setTimeout(async () => {
        //             try {
        //                 // Generate PDF using Puppeteer
        //                 const browser = await puppeteer.launch();
        //                 const page = await browser.newPage();
        //  //  pdf genrate template 
        //                 const htmlContent = `
        //                     <html>
        //                     <body>
        //                         <h1>Registration Confirmation</h1>
        //                         <p>Hi ${name},</p>
        //                         <p>Your registration for ${destination} has been received. Check this link:</p>
        //                         <a href="${link2o}">noman</a>
        //                     </body>
        //                     </html>
        //                 `;

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

        //  //  sec email template 
        //                 const mailOptions = {
        //                     from: username,
        //                     to: email,
        //                     subject: 'Your Registration has been Received',
        //                     html: `<!DOCTYPE html>
        // <html lang="en">

        // <head>
        //     <meta charset="UTF-8">
        //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //     <title>Document</title>
        // </head>

        // <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#ffffff; color:#333;">
        //     <table
        //         style="width: 100%; max-width: 800px; margin: 20px auto; text-align: center; background: #ffffff; border-collapse: collapse;">
        //         <!-- Logo Row -->
        //         <tr>
        //             <td align="center" style=" background-color:#fff;">
        //                 <img src="https://e75ca47a0b.imgdist.com/pub/bfra/ve0zzru6/dnd/vya/qic/Without-01-removebg-preview.png"
        //                     alt="ATSAS MUN Logo" width="170">
        //             </td>
        //         </tr>
        //         <!-- Background Image Section -->
        //         <tr>
        //             <td
        //      <td align="center" style=" text-align: center;
        //                         background-image: url('https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/2p9/g6d/6qx/bg.png');
        //                         background-size: cover;
        //                         background-repeat: no-repeat;
        //                         height:30vh;
        //                         background-position: center; color:#fff; padding:70px;">
        //                             <h1 style="margin:0; font-size:50px; color: white;">CONGRATULATIONS!</h1>

        //                 <!-- Name -->
        //                 <p
        //                     style="font-size: 1.4rem; font-weight: bold; margin: 10px 0; color: white; text-decoration: underline;">
        //                     ${name}</p>
        //                 <!-- Subtext -->
        //                 <p style="font-size: 0.9rem; margin: 30px 30px 10px 20px; color: white;">
        //                     You have been selected as one of the delegates at AtsasMUN Dubai, UAE
        //                     Please find attached the official acceptance letter in this email.
        //                 </p>
        //                 <p style="font-size: 0.9rem; margin: 5px 40px 10px 20px; color: white;">
        //                     You have been recognized as an Early Bird Applicant and are eligible for free airport Assistance in the host country on your arrival for AtsasMUN Dubai.
        //                 </p>
        //             </td>
        //         </tr>

        //     </table>

        //     <table style="width: 100%; max-width: 800px; margin: 20px auto; border-collapse: collapse; background: #ffffff;">

        //         <!-- Image Section -->
        //         <td style="margin-bottom: 30px;">
        //             <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/gpl/90q/wob/Capture.PNG" alt="Eligibility Image"
        //                 style="width: 100%; max-height: 450px; object-fit: cover; ">
        //         </td>

        //     </table>


        //     <table style="width: 100%; max-width: 800px; margin: 40px auto; border-collapse: collapse; background: #ffffff;">

        //         <!-- Image Section -->
        //         <td>
        //             <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/jwv/ano/u8g/Capture2.PNG" alt="Eligibility Image"
        //                 style="width: 100%; max-height: 450px; object-fit: cover; ">
        //         </td>

        //     </table>

        //     <table style="width: 100%; margin: 0px auto; margin-top: -50px; background-color: #fff; padding: 25px 2px 2px 2px;">
        //         <tr>
        //             <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Committee
        //                 Allocation Policy</td>
        //         </tr>
        //         <tr>
        //             <td style="padding: 10px;">
        //                 <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
        //                     <li>AtsasMUN does not guarantee the availability of preferred countries and encourages participants
        //                         to select alternatives if necessary.</li>
        //                 </ul>
        //             </td>
        //         </tr>
        //         <tr>
        //             <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Payments</td>
        //         </tr>
        //         <tr>
        //             <td style="padding: 10px;">
        //                 <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
        //                     <li>Payments must be made through the official AtsasMUN website.</li>
        //                     <li>AtsasMUN will not acknowledge payments made to unauthorized individuals claiming to represent
        //                         the organization.</li>
        //                     <li>Accepted payment methods include credit/debit cards and international wire transfers.</li>
        //                 </ul>
        //             </td>
        //         </tr>
        //         <tr>
        //             <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Refund Policy</td>
        //         </tr>
        //         <tr>
        //             <td style="padding: 10px;">
        //                 <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
        //                     <li>Subject to the following restrictions, delegates who have made their full payment may ask for a
        //                         credit voucher or transfer their participation to another AtsasMUN location.</li>
        //                     <li>Requests have to be submitted sixty days prior to the start of the event. Credit coupons or
        //                         transfers are only good for AtsasMUN activities.</li>
        //                     <li>Delegates who only paid an installment will not be eligible for credit vouchers or transfers;
        //                         the installment will be kept as a cancellation charge.</li>
        //                 </ul>
        //             </td>
        //         </tr>
        //         <tr>
        //             <td style="font-weight: bold; font-size: calc(1.5vw + 1px); padding: 10px; color: #000;">Code of Conduct
        //             </td>
        //         </tr>
        //         <tr>
        //             <td style="padding: 10px;">
        //                 <ul style="margin: 0; padding-left: 20px; font-size: calc(1.2vw + 1px); color: #333;">
        //                     <li>Participants must ensure all information provided during registration is accurate. False
        //                         information will result in disqualification and potential legal action.</li>
        //                     <li>All submitted materials must be original; plagiarism will result in disqualification.</li>
        //                     <li>Participants must obey the host country’s laws and are personally responsible for any damages or
        //                         violations.</li>
        //                     <li>AtsasMUN is not liable for participant misconduct; individuals will bear sole responsibility for
        //                         their actions.</li>
        //                     <li>Participants must adhere to the Code of Conduct outlined in the Conference Handbook.</li>
        //                 </ul>
        //             </td>
        //         </tr>
        //     </table>


        //     <table
        //         style="width: 100%; max-width: 800px; margin: 10px auto; margin-bottom: 0px; margin-top: 0px; border-collapse: collapse; background: #ffffff;">

        //         <!-- Image Section -->
        //         <td>
        //             <img src="https://6e77be9065.imgdist.com/pub/bfra/izj5d9lu/gdl/53b/vsi/Capture3.PNG" alt="Eligibility Image"
        //                 style="width: 100%; max-height: 350px; object-fit: cover; ">
        //         </td>

        //     </table>

        //     <table role="presentation" width="100%"  cellspacing="0" cellpadding="0" border="0"
        //         style="background-color:#ffffff;  margin-top: -5px;">
        //         <tr>
        //             <td align="center">
        //                 <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
        //                     style="background-color:#fff;  box-shadow:0 4px 8px rgba(0,0,0,0.1);">

        //                     <!-- payment//////////////////////// -->
        //                     <table role="presentation" width="100%" cellpadding="10" cellspacing="0" border="0"
        //                         style="max-width: 600px; margin: auto; border-collapse: collapse; font-family: Arial, sans-serif;">
        //                         <!-- Title Section -->
        //                         <tr>
        //                             <td colspan="2" align="center"
        //                                 style="padding: 40px 20px 20px 10px ; font-size: 20px; font-weight: bold; color: #000; ">
        //                                 Conference Fee Packages
        //                             </td>
        //                         </tr>
        //                         <tr>
        //                             <td colspan="2" align="center" style="padding-bottom: 20px; font-size: 16px; color: #555;">
        //                                 New Year Early Bird Packages
        //                             </td>
        //                         </tr>
        //                         <!-- Packages Section -->
        //                         <tr>
        //                             <!-- Non-Accommodation Column -->
        //                             <td style="            background: linear-gradient(to right, #00509E, #003A70, #002855);
        //   color: white; padding: 10px; font-size: 16px; font-weight: bold; border-radius: 8px 0 0 0; text-align: center;">
        //                                 Non-Accommodation $399
        //                             </td>
        //                             <!-- Accommodation Column -->
        //                             <td style="            background: linear-gradient(to right, #00509E, #003A70, #002855);
        // ; color: white; padding: 10px; font-size: 16px; font-weight: bold; border-radius: 0 8px 0 0; text-align: center;">
        //                                 Accommodation $679
        //                             </td>
        //                         </tr>
        //                         <tr>
        //                             <!-- Non-Accommodation Details -->
        //                             <td
        //                                 style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align:left;">
        //                                 ATSASMUN Merch and Kit
        //                             </td>
        //                             <td
        //                                 style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
        //                                 Everything in Non-Accommodation Package
        //                             </td>
        //                         </tr>
        //                         <tr>
        //                             <td
        //                                 style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
        //                                 United Nations Simulation Committee Sessions
        //                             </td>
        //                             <td
        //                                 style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
        //                                 5 Star Accommodation-Twin Shared/3 Nights
        //                             </td>
        //                         </tr>
        //                         <tr>
        //                             <td
        //                                 style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
        //                                 ATSASMUN UNHCR Endorsed Certificates
        //                             </td>
        //                             <td
        //                                 style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
        //                                 3 Buffet Breakfasts
        //                             </td>
        //                         </tr>
        //                         <tr>
        //                             <td
        //                                 style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
        //                                 Cultural Global Village and Performances
        //                             </td>
        //                             <td
        //                                 style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
        //                                 2 Lunch and 3 Dinners
        //                             </td>
        //                         </tr>
        //                         <tr>
        //                             <td
        //                                 style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
        //                                 Ice-breaking Session
        //                             </td>
        //                             <td
        //                                 style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
        //                                 Desert Safari                           </td>
        //                         </tr>
        //                         <tr>
        //                             <td
        //                                 style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
        //                                 Diplomatic Dinner Gala
        //                             </td>
        //                             <td
        //                                 style="background: #fff; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
        //                             </td>
        //                         </tr>
        //                         <tr>
        //                             <td
        //                                 style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
        //                                 1 Lunch and 2 Dinners
        //                             </td>
        //                             <td
        //                                 style="background: #f8f9fa; color: #333; font-size: 14px; padding: 10px; border: 1px solid #ddd; text-align: left;">
        //                             </td>
        //                         </tr>
        //                     </table>

        //                     <table
        //                         style="width: 100%; max-width: 800px; margin: 20px auto; font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
        //                         <tr>
        //                             <td style="font-weight: bold; font-size: 18px; color: #000; padding-bottom: 10px;">Payment
        //                             </td>
        //                         </tr>
        //                         <tr>
        //                             <td style="font-size: 15px; color: #333; padding-bottom: 20px;">You can pay at the link
        //                                 below</td>
        //                         </tr>
        //                         <tr>
        //                             <td>

        //                                      <a href="http://localhost:3000/UAEpayment/1?userid=${id}"
        //                                     style="display: inline-block; padding: 10px 100px; font-size: 16px; font-weight: bold; color: #fff; text-decoration: none;  background: linear-gradient(to right, #00509E, #003A70, #002855);">Pay
        //                                     Now</a>
        //                             </td>
        //                         </tr>
        //                     </table>


        //                     <table
        //                         style="width: 100%; max-width: 800px; margin: 40px auto; text-align: center; padding: 20px; background: #f9f9f9; border-radius: 10px; border-collapse: collapse;">
        //                         <!-- First Line -->


        //                         <tr>
        //                             <td style="padding: 20px; font-size:19px; color:#333; line-height: 1.5;">
        //                                 A formal Visa Invitation Letter can be obtained from us upon request after the payment
        //                             </td>
        //                         </tr>
        //                         <tr>
        //                             <td style="padding: 10px; font-size: 17px; color: #333;">
        //                                 Should you have any questions, feel free to reach us at
        //                                 <a href="mailto:info@atsasmun.com" target="_blank"
        //                                     style="text-decoration: underline;  font-weight: bold; color: #000000;">info@atsasmun.com</a>
        //                                 We will be happy to assist you.
        //                             </td>
        //                         </tr>
        //                         <!-- Assistance Line -->
        //                         <tr>
        //                             <td style="padding: 10px; font-size: 1rem; color: #333;">
        //                                 <hr>
        //                             </td>
        //                         </tr>
        //                         <!-- Highlighted Line -->
        //                         <tr>
        //                             <td style="padding: 20px; font-size: 1rem; color: black; font-weight: bold;">
        //                                 We look forward to meeting you in Dubai, UAE!
        //                             </td>
        //                         </tr>
        //                         <!-- Final Thank You Line -->
        //                         <tr>
        //                             <td style="padding: 0px 10px 10px 0px; font-size: 0.9rem; color: #333; line-height: 1.5; ">
        //                                 Once again, thank you for registering yourself as a part of this powerful Diplomatic
        //                                 Conference!
        //                             </td>
        //                         </tr>
        //                     </table>

        //                     <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">

        //                         <tr>
        //                             <td align="center"
        //                                 style="background-color:#003366; color:#fff; padding:20px; margin:0; font-size:14px;">
        //                                 <p style="margin:0; font-size:14px;">Atsas MUN UAE, France © 2024 Atsas Creation
        //                                     International Ltd</p>
        //                                 <p style="margin:5px 0 0; font-size:12px; color: #fff;"><em>"Forging a Diplomatic World
        //                                         of Unity and Peace"</em></p>
        //                             </td>
        //                         </tr>
        //                     </table>

        //             </td>
        //         </tr>
        //     </table>

        // </body>

        // </html>`,
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
        //         }, 20000); // 20 seconds in milliseconds
        // 24 hours in milliseconds

        return NextResponse.json({ message: 'Success: Emails sent and scheduled' });
    } catch (error) {
        console.error('Error initiating email process:', error);
        return NextResponse.json({ message: 'Failed to process the request' }, { status: 500 });
    }
}
