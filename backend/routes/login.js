const express = require("express");

const { Users } = require("../utils/schema");
const router = express.Router()

router.post("/login", async (req, res) => {
    const { userEmail, userPass } = req.body;
    try {
        if (!userEmail || !userPass) {
            return res.status(400).json({
                success: false,
                message: "please provide email and password",
            });
        }
        const user = await Users.findOne({ userEmail })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid credentials",

            })
        }
        const ismatch = await user.comparePassword(userPass);
        if (!ismatch) {
            return res.status(400).json({
                success: false,
                message: "invalid credentials",
            });
        }
        const { accessToken, refreshToken } = user.generateToken();
        user.refreshToken = refreshToken;
        await user.save()


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                _id: user._id,
                userEmail: user.userEmail
            },
            accessToken
        });
    }
    catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});




module.exports = router