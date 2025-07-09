// backend/controllers/adminDashboard.js

const Contact = require('../models/Contact');
const Appointment = require('../models/Appointment');

// Get all contact form messages
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch contacts', error: err.message });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch appointments', error: err.message });
  }
};

module.exports = {
  getAllContacts,
  getAllAppointments,
};
