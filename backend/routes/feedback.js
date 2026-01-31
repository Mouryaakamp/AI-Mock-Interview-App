const express = require('express');
const { UserAnswer } = require("../utils/schema");

const router = express.Router();

// GET - Get all feedback/answers by user email (for dashboard overall score)
router.get('/by-user', async (req, res) => {
  try {
    const { userEmail } = req.query;
    if (!userEmail) {
      return res.status(400).json({ success: false, error: "userEmail is required" });
    }

    const answers = await UserAnswer.find({ userEmail }).sort({ _id: -1 }).lean();
    return res.status(200).json(answers);
  } catch (err) {
    console.error("Feedback by-user error:", err);
    return res.status(500).json({ success: false, error: "Failed to fetch feedback" });
  }
});

// GET - Get feedback by interview ID (id = mockId stored with answers)
router.get('/:id', async (req, res) => {
  try {
    const mockId = req.params.id;
    if (!mockId) {
      return res.status(400).json({ success: false, error: "Missing id param" });
    }

    const answers = await UserAnswer.find({ mockId }).sort({ _id: 1 }).lean();
    return res.status(200).json(answers);
  } catch (err) {
    console.error("Feedback fetch error:", err);
    return res.status(500).json({ success: false, error: "Failed to fetch data" });
  }
});

module.exports=router;
