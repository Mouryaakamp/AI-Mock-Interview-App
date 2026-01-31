const express = require("express");
const { UserAnswer } = require("../utils/schema");

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const { userEmail } = req.query;
        
        if (!userEmail) {
            return res.status(400).json({
                success: false,
                error: "User email is required",
            });
        }

        const feedback = await UserAnswer.find({ userEmail }).lean();

        return res.status(200).json(feedback);
    } catch (error) {
        console.error("Feedback by user error:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to fetch feedback",
        });
    }
});

module.exports = router;
