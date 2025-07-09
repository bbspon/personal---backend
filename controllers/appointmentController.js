// backend/controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');

exports.bookAppointment = async (req, res) => {
  const { name, mobile, email, date, time, type, message } = req.body;

  if (!name || !mobile || !date || !time || !type) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  try {
    const appointment = await Appointment.create({ name, mobile, email, date, time, type, message });

    // Send email to Admin
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youradminemail@gmail.com',
        pass: 'yourapppassword'
      }
    });

    const adminMailOptions = {
      from: 'youradminemail@gmail.com',
      to: 'youradminemail@gmail.com',
      subject: `New Appointment Request: ${name}`,
      html: `
        <h2>New Appointment Booked</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
      `
    };

    await transporter.sendMail(adminMailOptions);

    // Optional: Email confirmation to user
    if (email) {
      const userMailOptions = {
        from: 'youradminemail@gmail.com',
        to: email,
        subject: `Appointment Confirmed - ${date} @ ${time}`,
        html: `
          <h3>Dear ${name},</h3>
          <p>Your appointment has been successfully booked.</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Type:</strong> ${type}</p>
          <p>Thank you for connecting with us!</p>
        `
      };

      await transporter.sendMail(userMailOptions);
    }

    return res.status(201).json({ success: true, message: 'Appointment booked successfully.' });

  } catch (error) {
    console.error('Booking Error:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};
