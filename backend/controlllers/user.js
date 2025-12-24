const sendEmail = require("../lib/email");
const hashPassword = require("../lib/hashPassword");
const User = require("../models/user");
const jwt = require("jsonwebtoken")

const getAppUrl = ()=>{
    return process.env.APP_URL
}

const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
    
        if(!name || !email || !password){
            return res.status(404).json({
                success: false,
                message: "All the Credentials are not filled"
            })
        }
        const modifiedEmail = email.trim().toLowerCase()
        const existingUser = await User.findOne({email: modifiedEmail})
    
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Existing email"
            })
        }
        const hashedPassword = await hashPassword()
    
        const user = await User.create({
            email: modifiedEmail,
            password: hashedPassword,
            name,
            isEmailVerified: false,
            twoFactorEnabled: false
        })
    
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
        return res.status(500).json({
            success: true,
            message: "Registration server Error",
            error
        })
    }
}

const verifyEmail = async(req,res)=>{
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

        if(!user.isEmailVerified)
            return res.status(400).json({success: false, message:"User is already verified"})

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

module.exports = {registerUser, verifyEmail}