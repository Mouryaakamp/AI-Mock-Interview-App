const express=require('express');
const { MockInterview } = require('../utils/schema.js');

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const email = req.user.email;

    const interviews = await MockInterview
      .find({ createdBy: email })
      .sort({ _id: -1 })
      .lean();

    return res.status(200).json(interviews);
  } catch (err) {
    console.error("Interviews list error:", err);
    return res.status(500).json({ success: false, error: "Failed to fetch interviews" });
  }
});


module.exports=router
