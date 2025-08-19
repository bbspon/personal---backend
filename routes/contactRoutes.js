const express = require("express"); 
const router = express.Router();
const multer = require("multer");
const { submitContact } = require("../controllers/contactController");

const storage = multer.memoryStorage(); // You can change this to diskStorage
const upload = multer({ storage });

// ✅ Wrap with try/catch to log real errors
router.post(
  "/",
  upload.single("file"),
  async (req, res, next) => {
    try {
      console.log("📨 Route hit! Passing to controller...");
      console.log("✅ Form Data Received:", req.body);
      console.log("📎 File Info:", req.file || "No file uploaded");

      // Call controller safely
      await submitContact(req, res, next);
    } catch (err) {
      console.error("❌ Error in contact route:", err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message, // this helps you debug in prod
      });
    }
  }
);

module.exports = router;
