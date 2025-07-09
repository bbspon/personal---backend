// controllers/contactController.js

const Contact = require("../models/Contact");

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

    console.log("✅ Saved to DB");
    res.status(200).json({ success: true, message: "Form submitted & saved successfully" });
  } catch (error) {
    console.error("❌ DB Save Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

