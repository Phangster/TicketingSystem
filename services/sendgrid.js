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
  msg.html= `<p><h3>You have submitted a ticket to ACNAPI.</h3></p>
  <p><h3>To manage your ticket or add new information, you can login at https://beta.acnapi.io/ to give more information.</h3></p>\
  <h3>Login Details:</h3>\
  <p>Username: ${email}</p>\
  <p>Password: ${password}</p>`,

  console.log(msg);
  sgMail.send(msg);
}
