// utils/sendMail.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS
  }
});

module.exports = async function sendMail({ to, subject, text }) {
  await transporter.sendMail({
    from: process.env.ADMIN_EMAIL,
    to,
    subject,
    text
  });
};

