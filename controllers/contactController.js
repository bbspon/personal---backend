// controllers/contactController.js

const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();


exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const file = req.file;

    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      fileName: file?.originalname || null,
      fileBuffer: file?.buffer || null,
      fileMimeType: file?.mimetype || null,
    });

    await contact.save(); // 💾 Save to DB
// Send Email to Admin
const transporter = nodemailer.createTransport({
host: "smtp.zoho.in", // :check: Zoho Mail SMTP
port: 465, // :check: SSL port (secure)
secure: true,
  auth: {
    user: process.env.EMAIL_USER, // e.g., yourname@gmail.com
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "admin@balabharath.com",
  subject: `📩 New Contact Form: ${subject}`,
  html: `
    <h3>New Contact Form Submission</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong><br/>${message}</p>
  `,
  attachments: file
    ? [
        {
          filename: file.originalname,
          content: file.buffer,
          contentType: file.mimetype,
        },
      ]
    : [],
};

await transporter.sendMail(mailOptions);
console.log("📧 Email sent to admin");
    console.log("✅ Saved to DB");
    res.status(200).json({ success: true, message: "Form submitted & saved successfully" });
  } catch (error) {
    console.error("❌ DB Save Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

