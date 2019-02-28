const sgMail = require('@sendgrid/mail');
const config = require('../config/keys');

sgMail.setApiKey(config.sendGrid);

const msg = {
  to: null,
  from: 'hello@acnapi.com',
  subject: 'Welcome to ACNAPI',
  text: null,
  html: null,
};


module.exports = sendgrid = (email, password)=> {
  console.log("Sendgrid!")
  msg.to = email;
  msg.text = `You have submitted a ticket to ACNAPI. To manage your ticket or add new information, you can login at https://beta.acnapi.io/ to give more information.\
  Your login details are as follows:\
  Username: ${email}\
  Password: ${password}`;
  // msg.html= `<p><h3>You have submitted a ticket to ACNAPI.</h3></p>
  // <p><h3>To manage your ticket or add new information, you can login at https://beta.acnapi.io/ to give more information.</h3></p>\
  // <h3>Login Details:</h3>\
  // <p>Username: ${email}</p>\
  // <p>Password: ${password}</p>`,

  msg.html = 
  `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
      <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
        body {width: 600px;margin: 0 auto;}
        table {border-collapse: collapse;}
        table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
        img {-ms-interpolation-mode: bicubic;}
      </style>
      <![endif]-->
  
      <style type="text/css">
        body, p, div {
          font-family: arial;
          font-size: 14px;
        }
        body {
          color: #000000;
        }
        body a {
          color: #1188E6;
          text-decoration: none;
        }
        p { margin: 0; padding: 0; }
        table.wrapper {
          width:100% !important;
          table-layout: fixed;
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: 100%;
          -moz-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        img.max-width {
          max-width: 100% !important;
        }
        .column.of-2 {
          width: 50%;
        }
        .column.of-3 {
          width: 33.333%;
        }
        .column.of-4 {
          width: 25%;
        }
        @media screen and (max-width:480px) {
          .preheader .rightColumnContent,
          .footer .rightColumnContent {
              text-align: left !important;
          }
          .preheader .rightColumnContent div,
          .preheader .rightColumnContent span,
          .footer .rightColumnContent div,
          .footer .rightColumnContent span {
            text-align: left !important;
          }
          .preheader .rightColumnContent,
          .preheader .leftColumnContent {
            font-size: 80% !important;
            padding: 5px 0;
          }
          table.wrapper-mobile {
            width: 100% !important;
            table-layout: fixed;
          }
          img.max-width {
            height: auto !important;
            max-width: 480px !important;
          }
          a.bulletproof-button {
            display: block !important;
            width: auto !important;
            font-size: 80%;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .columns {
            width: 100% !important;
          }
          .column {
            display: block !important;
            width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
      </style>
      <!--user entered Head Start-->
      
       <!--End Head user entered-->
    </head>
    <body>
      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size: 14px; font-family: arial; color: #000000; background-color: #ebebeb;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ebebeb">
            <tr>
              <td valign="top" bgcolor="#ebebeb" width="100%">
                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="100%">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <!--[if mso]>
                            <center>
                            <table><tr><td width="600">
                            <![endif]-->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                              <tr>
                                <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #000000; text-align: left;" bgcolor="#ffffff" width="100%" align="left">
                                  
      <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
             style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
        <tr>
          <td role="module-content">
            <p></p>
          </td>
        </tr>
      </table>
    
      <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;background-color:#1b0707;" valign="top" align="center">
            <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:100% !important;width:100%;height:auto !important;" src="https://marketing-image-production.s3.amazonaws.com/uploads/b09553df6918fe296ecfc240db655a184ff3a1317ee2d54e13d532e60177715894449dc25615184d98cf1c480c7935c7953cf6eeef5742bfdb6a66aecb5eabee.png" alt="" width="600">
          </td>
        </tr>
      </table>
    
      <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td style="padding:45px 45px 45px 45px;line-height:22px;text-align:inherit;"
              height="100%"
              valign="top"
              bgcolor="">
              <pre style="text-align: center;">
  <span style="font-size:24px;"><strong><span style="color:#3E3E3E;">TICKETING SYSTEM</span></strong></span></pre>
  
          </td>
        </tr>
      </table>
    
      <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
            <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:100% !important;width:100%;height:auto !important;" src="https://marketing-image-production.s3.amazonaws.com/uploads/30842cfd8971560dec86b53fb1365ba89930cb368322850157b24990197b8b3f13a68dcc1c68ce566107571d8129f1ab55a4192a2badeeb825aae741c2354820.jpg" alt="" width="600">
          </td>
        </tr>
      </table>
    
      <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td style="padding:18px 010px 18px 0px;line-height:22px;text-align:inherit;"
              height="100%"
              valign="top"
              bgcolor="">
              <div style="text-align: center;"><span style="font-family:arial black,helvetica,sans-serif;">You have successfully submitted a ticket to </span><span style="font-family:arial black,helvetica,sans-serif;">ACNAPI!</span></div>
  
  <div style="text-align: center;"><span style="color: rgb(34, 34, 34); font-family: arial, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;">😃</span></div>
  
          </td>
        </tr>
      </table>
    <table class="module" role="module" data-type="code" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td height="100%" valign="top">
            <div style="text-align: center;"><span style="color:#333333;">To manage your ticket or add new information, you can login <a href="https://beta.acnapi.io/"><strong>here</strong></a> for more information.</span></div>
  <br>
  
  <div style="text-align: left;"><span style="color:#333333;">Login details:</span></div>
  <div style="text-align: left;"><span style="color:#333333;"> Username: ${email}</span></div>
  <div style="text-align: left;"><span style="color:#333333;">Password: ${password}</span></div>
          </td>
        </tr>
      </table><table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" class="outer-td" style="padding:0px 0px 45px 0px"><table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#ffffff" class="inner-td" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit"><a style="background-color:#ffffff;border:1px solid #333333;border-color:#39b88d;border-radius:3px;border-width:2px;color:#39b88d;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:16px;padding:12px 70px 12px 70px;text-align:center;text-decoration:none" href="https://www.accenture.com/us-en" target="_blank">Go to Accenture</a></td></tr></tbody></table></td></tr></tbody></table>
      <table class="module"
             role="module"
             data-type="divider"
             border="0"
             cellpadding="0"
             cellspacing="0"
             width="100%"
             style="table-layout: fixed;">
        <tr>
          <td style="padding:0px 0px 0px 0px;"
              role="module-content"
              height="100%"
              valign="top"
              bgcolor="">
            <table border="0"
                   cellpadding="0"
                   cellspacing="0"
                   align="center"
                   width="100%"
                   height="5px"
                   style="line-height:5px; font-size:5px;">
              <tr>
                <td
                  style="padding: 0px 0px 5px 0px;"
                  bgcolor="#ebebeb"></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    
      <table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tbody>
          <tr>
            <td valign="top" style="padding:010px 0px 10px 0px;font-size:6px;line-height:10px;background-color:#ececec;">
              <table align="center">
                <tbody>
                  <tr>
                    <td style="padding: 0px 5px;">
          <a role="social-icon-link"  href="facebook.com" target="_blank" alt="Facebook"
            data-nolink="false"
            title="Facebook "
            style="-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;display:inline-block;background-color:#3B579D;">
            <img role="social-icon" alt="Facebook" title="Facebook "
              height="30"
              width="30"
              style="height: 30px, width: 30px"
              src="https://marketing-image-production.s3.amazonaws.com/social/white/facebook.png" />
          </a>
        </td>
                    <td style="padding: 0px 5px;">
          <a role="social-icon-link"  href="twitter.com" target="_blank" alt="Twitter"
            data-nolink="false"
            title="Twitter "
            style="-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;display:inline-block;background-color:#7AC4F7;">
            <img role="social-icon" alt="Twitter" title="Twitter "
              height="30"
              width="30"
              style="height: 30px, width: 30px"
              src="https://marketing-image-production.s3.amazonaws.com/social/white/twitter.png" />
          </a>
        </td>
                    <td style="padding: 0px 5px;">
          <a role="social-icon-link"  href="instagram.com" target="_blank" alt="Instagram"
            data-nolink="false"
            title="Instagram "
            style="-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;display:inline-block;background-color:#7F4B30;">
            <img role="social-icon" alt="Instagram" title="Instagram "
              height="30"
              width="30"
              style="height: 30px, width: 30px"
              src="https://marketing-image-production.s3.amazonaws.com/social/white/instagram.png" />
          </a>
        </td>
                    <td style="padding: 0px 5px;">
          <a role="social-icon-link"  href="google.com" target="_blank" alt="Google"
            data-nolink="false"
            title="Google "
            style="-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;display:inline-block;background-color:#D44132;">
            <img role="social-icon" alt="Google" title="Google "
              height="30"
              width="30"
              style="height: 30px, width: 30px"
              src="https://marketing-image-production.s3.amazonaws.com/social/white/google-plus.png" />
          </a>
        </td>
                    <td style="padding: 0px 5px;">
          <a role="social-icon-link"  href="pinterest.com" target="_blank" alt="Pinterest"
            data-nolink="false"
            title="Pinterest "
            style="-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;display:inline-block;background-color:#CB2027;">
            <img role="social-icon" alt="Pinterest" title="Pinterest "
              height="30"
              width="30"
              style="height: 30px, width: 30px"
              src="https://marketing-image-production.s3.amazonaws.com/social/white/pinterest.png" />
          </a>
        </td>
                    
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    <div data-role="module-unsubscribe" class="module unsubscribe-css__unsubscribe___2CDlR" role="module" data-type="unsubscribe" style="background-color:#ebebeb;color:#7a7a7a;font-size:11px;line-height:20px;padding:30px 0px 30px 0px;text-align:center"><div class="Unsubscribe--addressLine"><p class="Unsubscribe--senderName" style="font-family:;font-size:11px;line-height:20px">[Sender_Name]</p><p style="font-family:;font-size:11px;line-height:20px"><span class="Unsubscribe--senderAddress">[Sender_Address]</span>, <span class="Unsubscribe--senderCity">[Sender_City]</span>, <span class="Unsubscribe--senderState">[Sender_State]</span> <span class="Unsubscribe--senderZip">[Sender_Zip]</span> </p></div><p style="font-family:;font-size:11px;line-height:20px"><a class="Unsubscribe--unsubscribeLink" href="<%asm_global_unsubscribe_raw_url%>" style="color:#39b88d">Unsubscribe</a> - <a class="Unsubscribe--unsubscribePreferences" href="[Unsubscribe_Preferences]" style="color:#39b88d">Unsubscribe Preferences</a></p></div>
                                </td>
                              </tr>
                            </table>
                            <!--[if mso]>
                            </td></tr></table>
                            </center>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>
  `

  console.log(msg);
  sgMail.send(msg);
}
