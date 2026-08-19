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

// ===============================
// GET SINGLE INTERVIEW
// ===============================
const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error("Get interview error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// UPDATE INTERVIEW
// ===============================
const updateInterview = async (req, res) => {
  try {
    const { status, score, questions } = req.body;

    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    if (status !== undefined) {
      interview.status = status;
    }

    if (score !== undefined) {
      interview.score = score;
    }

    if (questions !== undefined) {
      interview.questions = questions;
    }

    await interview.save();

    res.status(200).json({
      success: true,
      message: "Interview updated successfully",
      interview,
    });
  } catch (error) {
    console.error("Update interview error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// EXPORT CONTROLLERS
// ===============================
module.exports = {
  createInterview,
  getMyInterviews,
  getInterviewById,
  updateInterview,
};
