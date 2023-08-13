const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// 
// const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
// dotenv.config();
// const {UKR_NET_EMAIL, UKR_NET_PASSWORD} = process.env;

// const nodemailerConfig = {
//   host: "smtp.ukr.net",
//   port: 465, // 25, 2525
//   secure: true,
//   auth: {
//       user: UKR_NET_EMAIL,
//       pass: UKR_NET_PASSWORD,
//   }
// };
// const transport = nodemailer.createTransport(nodemailerConfig);

// const data = {
//   from: UKR_NET_EMAIL,
//     to: "tariri2404@vreaa.com",
//     subject: "Test email",
//     html: "<strong>Test email</strong>",
// };
// transport.sendMail(data)
// .then(() => console.log("Надіслано"))
// .catch(error => console.log(error.message))

// 

const authRouter = require("./routes/api/auth-router");

const contactsRouter = require('./routes/api/contacts')

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message, })
});

module.exports = app;
