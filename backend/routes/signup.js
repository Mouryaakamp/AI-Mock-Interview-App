const express = require('express');
const router = express.Router()
const { Users } = require("../utils/schema");

router.post("/signup", async (req, res) => {
    const { userEmail, userPass } = req.body;
    try {
        if (!userEmail || !userPass) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }

        const user = new Users({
            userEmail,
            userPass
        });
        const { accessToken, refreshToken } = user.generateToken();
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
                userEmail: user.userEmail
            },
            accessToken
        });
    }
    catch (err) {
        console.error("Signup error:", err);
        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already registered",
            });
        }
        return res.status(500).json({
            success: false,
            message: err.message || "Server Error",
        });
    }
});



module.exports = router