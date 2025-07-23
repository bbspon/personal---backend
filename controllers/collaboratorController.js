const Collaborator = require("../models/Collaborator");
const nodemailer = require("nodemailer");

exports.applyNow = async (req, res) => {
try {
const { fullName, email, roles, linkedin, contribution } = req.body;

if (!fullName || !email) {
  return res.status(400).json({ message: "Full name and email are required." });
}

// 1. Save to DB
const newCollaborator = new Collaborator({
  fullName,
  email,
  roles,
  linkedin,
  contribution,
});

await newCollaborator.save();

// 2. Setup transporter for Zoho
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,  // Your Zoho email
    pass: process.env.EMAIL_PASS,  // Zoho app password
  },
});

// 3. Prepare email
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "admin@balabharath.com", // Receiver email
  subject: `🤝 New Collaborator Application: ${fullName}`,
  html: `
    <h3>New Collaboration Request</h3>
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Roles Interested:</strong> ${roles}</p>
    <p><strong>LinkedIn:</strong> ${linkedin}</p>
    <p><strong>Contribution:</strong><br/>${contribution}</p>
  `,
  replyTo: email, // So admin can reply directly to the applicant
};

await transporter.sendMail(mailOptions);
console.log("📧 Collaborator email sent to admin");

res.status(201).json({ message: "Application submitted successfully!" });
} catch (error) {
console.error("Error submitting collaborator:", error);
res.status(500).json({ message: "Server error." });
}
};