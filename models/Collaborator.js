const mongoose = require("mongoose");

const collaboratorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: [],
  },
  linkedin: {
    type: String,
  },
  contribution: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Collaborator", collaboratorSchema);
