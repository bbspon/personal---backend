// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
   fileName: String, // just saving the filename, not file content
    fileBuffer: Buffer, // optional: store file as binary
    fileMimeType: String,
  tag: { type: String, default: 'General' },
  status: { type: String, enum: ['Pending', 'Handled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);
