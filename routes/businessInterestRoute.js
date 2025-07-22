// backend/routes/businessInterestRoute.js
const express = require("express");
const router = express.Router();
const { submitInterest } = require("../controllers/businessInterestController");

router.post("/", submitInterest);
router.get("/", (req, res) => {
  res.send("Business Interest API is working");
});
  
module.exports = router;
