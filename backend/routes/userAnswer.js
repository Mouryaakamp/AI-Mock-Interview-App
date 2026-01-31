const express = require('express');
const { UserAnswer } = require("../utils/schema");

const router = express.Router();

// POST - Save user answer
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const { mockId, question } = data;

    if (!mockId || !question) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: mockId, question",
      });
    }

    const newAnswer = await UserAnswer.create(data);
    return res.status(201).json(newAnswer);
  } catch (error) {
    console.error("UserAnswer save error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});


module.exports=router
