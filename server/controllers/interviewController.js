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
