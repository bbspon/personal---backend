const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const imageController = require("../controllers/imageController");
const videoController = require("../controllers/videoController");

// Image routes
router.post(
  "/upload-image",
  upload.single("file"),
  imageController.uploadImage
);
router.get("/images", imageController.getImages);

// Video routes
router.post(
  "/upload-video",
  upload.single("file"),
  videoController.uploadVideo
);
router.get("/videos", videoController.getVideos);

module.exports = router;
