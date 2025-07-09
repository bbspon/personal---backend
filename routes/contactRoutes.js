const express = require("express");
const router = express.Router();
const multer = require("multer");
const { submitContact } = require("../controllers/contactController");

const storage = multer.memoryStorage(); // You can change this to diskStorage
const upload = multer({ storage });

router.post("/", upload.single("file"), submitContact);

module.exports = router;
