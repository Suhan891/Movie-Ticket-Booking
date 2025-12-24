const hashPassword = require("../lib/hashPassword");
const User = require("../models/user");

const registerUser = async(req,res)=>{
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
    return res.status(200).json({
        success: true,
        message: "Registration successfull",
        user
    })


}

module.exports = {registerUser}