const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["technical", "behavioral", "hr", "mixed"],
      default: "technical",
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    status: {
      type: String,
      enum: ["created", "in-progress", "completed"],
      default: "created",
    },

    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

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

// Prevent Mongoose OverwriteModelError
module.exports =
  mongoose.models.Interview ||
  mongoose.model("Interview", interviewSchema);