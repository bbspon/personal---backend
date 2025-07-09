// backend/controllers/businessInterestController.js
const BusinessInterest = require("../models/BusinessInterest");

exports.submitInterest = async (req, res) => {
  try {
    const { name, mobile, email, description, role } = req.body;

    if (!name || !mobile || !email || !role) {
      return res
        .status(400)
        .json({
          success: false,
          message: "All required fields must be filled.",
        });
    }

    const newInterest = new BusinessInterest({
      name,
      mobile,
      email,
      description,
      role,
    });
    await newInterest.save();

    res
      .status(201)
      .json({ success: true, message: "Interest submitted successfully." });
  } catch (error) {
    console.error("Error in submitInterest:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error. Please try again later.",
      });
  }
};
