const express = require("express");
const router = express.Router();
const multer = require("multer");
const { submitContact } = require("../controllers/contactController");

const storage = multer.memoryStorage(); // You can change this to diskStorage
const upload = multer({ storage });



router.post("/", upload.single("file"), (req, res, next) => {
  console.log("📨 Route hit! Passing to controller...");
  console.log("✅ Form Data Received:", req.body);
  console.log("📎 File Info:", req.file || "No file uploaded");
  next();
}, submitContact);

module.exports = router;


