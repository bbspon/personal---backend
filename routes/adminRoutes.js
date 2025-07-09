// backend/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getAllAppointments,
} = require('../controllers/adminDashboard');
const auth = require("../middleware/authMiddleware");

// Optional: Protect with simple token (improve later)
router.get('/contacts', getAllContacts);
router.get('/appointments', getAllAppointments);
router.use(auth);   // protect everything below

module.exports = router;


// routes/adminRoutes.js
const adminController = require('../controllers/adminController');

// Contact routes
router.get('/contacts', adminController.getContacts);
router.put('/contacts/:id', adminController.updateContact);

// Appointment routes
router.get('/appointments', adminController.getAppointments);
router.put('/appointments/:id', adminController.updateAppointment);

module.exports = router;
