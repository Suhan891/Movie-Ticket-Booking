const { verifyAccessToken } = require("../lib/token");
const User = require("../models/user");

const requireAuth = async (req,res,next) =>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(402).json({
            success: false,
            message: "You are not auth user! You are not allowed to use"
        })
    
    const token = authHeader.split(" ")[1]
    if(!token)
        return res.status(401).json({
        success: false,
        message: "Token not found"
        });

    try {
        const payload = verifyAccessToken(token);
        const user = await User.findById(payload._id)
        if(!user)
            return res.status(401).json({
            success: false,
            message: "User Not Found! You are not allowed to use"
            });
        
        if(user.tokenVersion !== payload.tokenVersion)
            return res.status(401).json({ message: "Token invalidated" });

        req.user = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
        }

        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token",error });
    }
}

module.exports = requireAuth