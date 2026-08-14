const express = require("express");

const {
  createInterview,
  getMyInterviews,
} = require("../controllers/interviewController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createInterview);

router.get("/my", protect, getMyInterviews);

module.exports = router;