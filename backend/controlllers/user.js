const sendEmail = require("../lib/email");
const {hashPassword,verifyPassword} = require("../lib/hashPassword");
const createToken = require("../lib/token");
const User = require("../models/user");
const jwt = require("jsonwebtoken")

const getAppUrl = ()=>{
    return process.env.APP_URL
}

module.exports.registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
    
        if(!name || !email || !password){
            return res.status(404).json({
                success: false,
                message: "All the Credentials are not filled"
            })
        }

        const modifiedEmail = email.trim().toLowerCase()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(modifiedEmail)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address",
        })
        }

        const existingUser = await User.findOne({email: modifiedEmail})
    
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            })
        }
        const hashedPassword = await hashPassword({password: password})
    
        const user = await User.create({
            email: modifiedEmail,
            password: hashedPassword,
            name,
            isEmailVerified: false,
            twoFactorEnabled: false
        })

        console.log("USER CREATED:", user);
    
        const createToken = jwt.sign(
            {_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )
    
        const verifyUrl = `${getAppUrl()}/auth/email-verify?token=${createToken}`
    
        await sendEmail({
            to: user.email,
            subject: "Verify Your Email",
            html: `<p>Please Verify your email by clicking this link: </p>
            <p><a href="${verifyUrl}">${verifyUrl}</a></p>`
        })
    
        return res.status(200).json({
            success: true,
            message: "Registration successfull",
            // user
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: "Registration server Error",
            error: error
        })
    }
}

module.exports.verifyEmail = async(req,res)=>{
    const {token} = req.query

    if(!token)
        return res.status(400).json({
            success: false,
            message: "Token Not found on Email Verification"
        })

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        if(!payload) return res.status(404).json({success: false, message:"Token Verification Unsuccessfull"})
        
        const user = await User.findById(payload._id)
        if(!user) return res.status(404).json({success: false, message:"User not found with token"})

        if(user.isEmailVerified)
            return res.status(400).json({success: false, message:"Email is already verified"})

        user.isEmailVerified = true
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Email Verification successfull",
            // user
        })

    } catch (error) {
        return res.status(500).json({
            success: true,
            message: "Email Verification server Error",
            error
        })
    }
}

module.exports.loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
    
        if(!email || !password){
            return res.status(404).json({
                success: false,
                message: "All the Credentials are not filled"
            })
        }

        const modifiedEmail = email.trim().toLowerCase()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(modifiedEmail)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address",
        })
        }

        const user = await User.findOne({email: modifiedEmail})

        if(!user)
            return res.status(404).json({success: false, message:"User not found"})

        const isPassword = await verifyPassword({pass:password, existPass:user.password})
        if(!isPassword)
            return res.status(404).json({success: false, message:"Invalid Password"})

        if (!user.isEmailVerified) {
            return res.status(403).json({success: false, message: "Please verify your email before logging in..." });
        }

        const refreshToken = createToken({
            userId: user._id,
            role: user.role,
            tokenVersion: user.tokenVersion
        })
        if(!refreshToken) return res.status(501).json({success: false, message: "Token creation Unsuccessfull"})

        res.cookie("refresh-token",refreshToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "lax",
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({
        message: "Login successfully done",
        accessToken,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
            twoFactorEnabled: user.twoFactorEnabled,
        },
        });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: "Login server Error",
            error
        })
    }
}

