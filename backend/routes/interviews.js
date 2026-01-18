import express from 'express';
import connectionTodb from '../utils/db.js';
import { MockInterview } from '../utils/schema.js';

const router = express.Router();

// POST - Get all interviews by user
router.post('/', async (req, res) => {
  try {
    await connectionTodb();

    const { createdBy } = req.body;

    const emailToUse = createdBy || "example@gmail.com";

    const interviews = await MockInterview.find({ createdBy: emailToUse }).sort({ _id: -1 });

    console.log('Interviews found:', interviews.length);

    return res.json(interviews);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch interviews" });
  }
});

export default router;
