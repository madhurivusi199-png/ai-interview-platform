const Interview = require("../models/Interview");

// ===============================
// CREATE INTERVIEW
// ===============================
const createInterview = async (req, res) => {
  try {
    const { type, difficulty, technologies } = req.body;

    if (!technologies || technologies.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one technology",
      });
    }

    const interview = await Interview.create({
      user: req.user.userId,
      type: type || "technical",
      difficulty: difficulty || "medium",
      technologies,
      status: "created",
    });

    res.status(201).json({
      success: true,
      message: "Interview created successfully",
      interview,
    });
  } catch (error) {
    console.error("Create interview error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// GET MY INTERVIEWS
// ===============================
const getMyInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: interviews.length,
      interviews,
    });
  } catch (error) {
    console.error("Get interviews error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createInterview,
  getMyInterviews,
};