const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// --------------------
// Middleware
// --------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// Health Check
// --------------------

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Interview Platform API is running 🚀",
    environment: process.env.NODE_ENV,
  });
});

// --------------------
// 404 Handler
// --------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// --------------------
// Start Server
// --------------------

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});