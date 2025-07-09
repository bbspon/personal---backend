const express = require("express");
const multer = require("multer");
const path = require("path");
const Image = require("../models/Image"); // ✅ import your model

const router = express.Router();

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title, description } = req.body;

    // 1️⃣ Save file details in MongoDB
    const newImage = new Image({
      title,
      description,
      filePath: `/uploads/${req.file.filename}`,
    });

    await newImage.save();

    // 2️⃣ Return success JSON
    res.json({
      success: true,
      message: "Image uploaded and saved to DB!",
      data: newImage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
