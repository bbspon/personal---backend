const express = require("express");
const multer = require("multer");
const path = require("path");
const Video = require("../models/Video");

const router = express.Router();

// Storage for videos:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "videos/"); // ✅ this folder must exist!
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !req.file) {
      return res.status(400).json({ message: "Missing title or file!" });
    }

    const newVideo = new Video({
      title,
      description,
      filePath: `/videos/${req.file.filename}`,
    });

    const savedVideo = await newVideo.save();

    res.json({
      success: true,
      message: "✅ Video uploaded and saved to DB!",
      data: savedVideo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().sort({ uploadedAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
});

module.exports = router;
