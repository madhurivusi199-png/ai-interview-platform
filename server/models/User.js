const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    // User who owns this interview
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Type of interview
    type: {
      type: String,
      enum: [
        "technical",
        "behavioral",
        "hr",
        "mixed",
      ],
      default: "technical",
    },

    // Difficulty level
    difficulty: {
      type: String,
      enum: [
        "easy",
        "medium",
        "hard",
      ],
      default: "medium",
    },

    // Technologies/topics selected for interview
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    // Interview status
    status: {
      type: String,
      enum: [
        "created",
        "in-progress",
        "completed",
      ],
      default: "created",
    },

    // Overall score after completion
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Interview questions and answers
    questions: [
      {
        question: {
          type: String,
          required: true,
        },

        answer: {
          type: String,
          default: "",
        },

        score: {
          type: Number,
          default: 0,
          min: 0,
          max: 10,
        },

        feedback: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Interview",
  interviewSchema
);