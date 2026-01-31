const express = require('express');
const { MockInterview } = require('../utils/schema.js');

const router = express.Router();

// POST - Create new interview
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const { jobPosition, jobDesc, jobExperience, createdBy, jsonMockResp, mockId } = body;

    if (!jobPosition || !jobDesc || !jobExperience || !createdBy || !jsonMockResp || !mockId) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: jobPosition, jobDesc, jobExperience, createdBy, jsonMockResp, mockId",
      });
    }

    const saved = await MockInterview.create(body);
    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error("MongoDB save error:", err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// GET - Get interview by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, error: "ID not provided" });
    }

    const interview = await MockInterview.findById(id).lean();
    if (!interview) {
      return res.status(404).json({ success: false, error: "Interview not found" });
    }

    return res.json({ success: true, data: interview });
  } catch (error) {
    console.error("Interview get error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router