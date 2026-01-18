import express from 'express';
import connectionTodb from '../utils/db.js';
import { UserAnswer } from '../utils/schema.js';

const router = express.Router();

// POST - Save user answer
router.post('/', async (req, res) => {
  try {
    await connectionTodb();
    const data = req.body;
    const newAnswer = await UserAnswer.create(data);
    return res.json(newAnswer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
