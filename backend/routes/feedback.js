import express from 'express';
import connectionTodb from '../utils/db.js';
import { UserAnswer } from '../utils/schema.js';

const router = express.Router();

// GET - Get feedback by interview ID
router.get('/:id', async (req, res) => {
  try {
    await connectionTodb();

    const mockId = req.params.id;

    if (!mockId) {
      return res.status(400).json({ error: "Missing id param" });
    }

    const answers = await UserAnswer.find({ mockId }).sort({ _id: 1 });

    return res.json(answers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default router;
