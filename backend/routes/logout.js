const express = require('express')
const { Users } = require('../utils/schema');
const router = express.Router()

router.post("/logout", async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({
            success: false,
            message: "no refresh token plz login",
        });
    }

    const user = await Users.findOne({ refreshToken });
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "no user found",
        });
    }

    user.refreshToken = null;
    await user.save();

    res.clearCookie("refreshToken");
    return res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
});



module.exports = router;
