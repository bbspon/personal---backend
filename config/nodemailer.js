// backend/config/nodemailer.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: process.env.MAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export default transporter;

// backend/config/constants.js

export const EMAIL_SUBJECTS = {
  CONTACT_ADMIN: "New Contact Form Submission",
  CONTACT_USER_CONFIRM: "Thanks for Reaching Out",
  APPOINTMENT_ADMIN: "New Appointment Booked",
  APPOINTMENT_USER_CONFIRM: "Appointment Confirmation",
};

export const STATUS = {
  SUCCESS: 'success',
  FAIL: 'fail',
};


