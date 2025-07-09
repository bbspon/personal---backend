const Video = require("../models/Video");

exports.uploadVideo = async (req, res) => {
  try {
    const video = new Video({
      title: req.body.title,
      description: req.body.description,
      filePath: req.file ? req.file.path : null,
      embedLink: req.body.embedLink || null,
    });

    await video.save();
    res.status(201).json({ success: true, video });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Video upload failed",
        error: err.message,
      });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
