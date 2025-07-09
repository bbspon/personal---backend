const Image = require("../models/Image");

exports.uploadImage = async (req, res) => {
  try {
    const image = new Image({
      title: req.body.title,
      description: req.body.description,
      filePath: req.file.path,
    });
    await image.save();
    res.status(201).json({ success: true, image });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Image upload failed",
        error: err.message,
      });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
