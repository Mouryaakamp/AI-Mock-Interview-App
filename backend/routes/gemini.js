import express from "express";
import { AIResponse } from "../utils/GeminiAIModel.js";

const router = express.Router();

/**
 * POST /api/gemini/generate
 * Generate interview questions
 */
router.post("/generate", async (req, res) => {
  try {
    const { jobPosition, jobDesc, jobExperience } = req.body;

    if (!jobPosition || !jobDesc || !jobExperience) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: jobPosition, jobDesc, jobExperience",
      });
    }

    const prompt = `
Job Position: ${jobPosition}
Job Description: ${jobDesc}
Years of Experience: ${jobExperience}

Generate 5 interview questions with answers.
Return ONLY valid JSON array like this:

[
  { "question": "...", "answer": "..." }
]
`;

    const text = await AIResponse(prompt);

    // Clean markdown if any
    let cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Try to extract JSON array
    const match = cleaned.match(/\[[\s\S]*\]/);
    if (match) cleaned = match[0];

    return res.json({ success: true, data: cleaned });
  } catch (error) {
    console.error("Generate error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to generate interview questions",
    });
  }
});

/**
 * POST /api/gemini/feedback
 * Generate answer feedback
 */
router.post("/feedback", async (req, res) => {
  try {
    const { question, userAns } = req.body;

    if (!question || !userAns) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: question, userAns",
      });
    }

    const prompt = `
You are a strict JSON generator.

Question: "${question}"
User Answer: "${userAns}"

Return ONLY valid JSON:
{
  "rating": 1-5,
  "feedback": "3 to 5 lines feedback"
}
`;

    const text = await AIResponse(prompt);

    let cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) cleaned = match[0];

    let feedback;
    try {
      feedback = JSON.parse(cleaned);
    } catch {
      feedback = {
        rating: 3,
        feedback: "Unable to generate detailed feedback. Please try again.",
      };
    }

    return res.json({ success: true, data: feedback });
  } catch (error) {
    console.error("Feedback error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to generate feedback",
    });
  }
});

export default router;
