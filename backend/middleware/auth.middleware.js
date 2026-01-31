const jwt = require("jsonwebtoken")

async function protected(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token found authorization denied"
        });
    }
    if (!process.env.ACCESS_TOKEN_SECRET) {
        console.error("ACCESS_TOKEN_SECRET is not set");
        return res.status(500).json({
            success: false,
            message: "Server auth configuration error"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        req.user = decoded;
        next();

    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: "Token not valid"
        })
    }


}

module.exports = protected