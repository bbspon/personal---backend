const Collaborator = require("../models/Collaborator");

exports.applyNow = async (req, res) => {
  try {
    const { fullName, email, roles, linkedin, contribution } = req.body;

    if (!fullName || !email) {
      return res
        .status(400)
        .json({ message: "Full name and email are required." });
    }

    const newCollaborator = new Collaborator({
      fullName,
      email,
      roles,
      linkedin,
      contribution,
    });

    await newCollaborator.save();

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting collaborator:", error);
    res.status(500).json({ message: "Server error." });
  }
};
