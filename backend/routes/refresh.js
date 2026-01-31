const express = require('express');
const { Users } = require('../utils/schema');
const router = express.Router()

router.post("/refresh", async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "no refresh token plz login",
        });
    }

    const user = await Users.findOne({ refreshToken });
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "invalid refresh token plz login",
        });
    }
    const { accessToken } = user.generateToken();
    return res.status(200).json({
        success: true,
        message: "accessToken generated successfully",
        accessToken
    });
})

module.exports = router;