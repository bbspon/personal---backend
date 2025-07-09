// backend/models/BusinessInterest.js
const mongoose = require("mongoose");

const businessInterestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String },
  role: {
    type: String,
    enum: ["Franchisee", "Territory Head", "Agent", "Vendor"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BusinessInterest", businessInterestSchema);
