const express = require("express");

const {
  createInterview,
  getMyInterviews,
  getInterviewById,
  updateInterview,
} = require("../controllers/interviewController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createInterview);

router.get("/my", protect, getMyInterviews);

router.get("/:id", protect, getInterviewById);

router.put("/:id", protect, updateInterview);

module.exports = router;