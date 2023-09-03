const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const {UKR_NET_EMAIL, UKR_NET_PASSWORD} = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465, // 25, 2525
  secure: true,
  auth: {
      user: UKR_NET_EMAIL,
      pass: UKR_NET_PASSWORD,
  }
};
const transport = nodemailer.createTransport(nodemailerConfig);

// const data = {
//     to: "tariri2404@vreaa.com",
//     subject: "Test email",
//     html: "<strong>Test email</strong>",
// };
const sendEmail = async(data) => {
    console.log(data);
    const email = {...data, from: UKR_NET_EMAIL};
    return transport.sendMail(email);
};

module.exports = sendEmail;