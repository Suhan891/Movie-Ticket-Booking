const sendEmail = require("../lib/email");
const {hashPassword,verifyPassword} = require("../lib/hashPassword");
const {createToken,verifyAccessToken, createRefresherToken, verifyRefreshToken,createAccessToken, createEmailVerifyToken, verifyEmailVerifyToken} = require("../lib/token");
const User = require("../models/user");
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const {OAuth2Client} = require('google-auth-library');

const getAppUrl = ()=>{
    return process.env.APP_URL
}

const getGoogleClient = async()=>{
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const redirectUri = `${getAppUrl()}/auth/google/callback`
    
    if(!clientId || !clientSecret)
        throw new Error("Google Authorisations not received")

    const oAuth2Client = new OAuth2Client({
        clientId,
        clientSecret,
        redirectUri
    })
    return oAuth2Client
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
    
        // const token = jwt.sign(
        //     {_id:user._id, type:"email_verify"},
        //     process.env.EMAIL_VERIFY_SECRET,
        //     {expiresIn: "1d"}
        // )

        const token =createEmailVerifyToken(user._id)
        // Changed auth to user
        const verifyUrl = `${getAppUrl()}/auth/email-verify?token=${token}`
    
        await sendEmail({
            to: user.email,
            subject: "Verify Your Email",
            html: `<p>Please Verify your email by clicking this link: </p>
            <p><a href="${verifyUrl}">${verifyUrl}</a></p>`
        })
    
        return res.status(200).json({
            success: true,
            message: "Registration successfull",
            user:{
                email: user.email,
                name: user.name,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
                twoFactorEnabled: user.twoFactorEnabled
            }
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
        // const payload = jwt.verify(token,process.env.EMAIL_VERIFY_SECRET)
        const payload = verifyEmailVerifyToken(token)
        if(!payload) return res.status(404).json({success: false, message:"Token Verification Unsuccessfull"})
        
        if (payload.type !== "email_verify") {
        return res.status(401).json({
            success: false,
            message: "Invalid verification token"
        });
        }
        const user = await User.findById(payload._id)
        if(!user) return res.status(404).json({success: false, message:"User not found with token"})

        if(user.isEmailVerified)
            return res.status(400).json({success: false, message:"Email is already verified"})

        user.isEmailVerified = true
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Email Verification successfull",
            user: {
                email: user.email,
                name: user.name,
                isEmailVerified: user.isEmailVerified}
            })

    } catch (error) {
        return res.status(500).json({
            success: false,
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
            return res.status(400).json({success: false, message:"User not found"})

        const isPassword = await verifyPassword({pass:password, existPass:user.password})
        if(!isPassword)
            return res.status(400).json({success: false, message:"Invalid Password"})

        if (!user.isEmailVerified) {
            return res.status(403).json({success: false, message: "Please verify your email before logging in..." });
        }
        // console.log("Login of a verified user");
        

        const accessToken = createAccessToken({
            _id: user._id,
            role: user.role,
            tokenVersion: user.tokenVersion
        })
        const refreshToken = createRefresherToken(user.id, user.tokenVersion);
        if(!refreshToken || !accessToken) return res.status(501).json({success: false, message: "Token creation Unsuccessfull"})

        res.cookie("refreshToken",refreshToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "lax",
            maxAge: 7*24*60*60*1000
        })


        console.log("Login Successfull: ",user)

        return res.status(200).json({
        message: "Successfulll Login",
        accessToken,
        user: {
            id: user.id,
            name: user.name,
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

module.exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshTokan;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found"
      });
    }

    const payload = verifyRefreshToken(token);

    const user = await User.findById(payload._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.status(401).json({
        success: false,
        message: "Token revoked — please login again"
      });
    }

    // rotate refresh token
    const newRefreshToken = createRefresherToken(
      user.id,
      user.tokenVersion
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // create new access token
    const accessToken = createAccessToken({_id:user.id,role:user.role,tokenVersion: user.tokenVersion});

    return res.status(200).json({
      success: true,
      message: "Refresh token reissued",
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token"
    });
  }
};


module.exports.logout = async(req,res)=>{
  res.clearCookie("refreshToken", { path: "/" });

  return res.status(200).json({
    message: "Successfully Logged out",
  });

}

module.exports.forgotPassword = async(req,res)=>{
    try {
        const {email} = req.body
        if(!email)
            return res.status(400).json({
                success: false,
                message: "Email is required"
            })

        const modifiedEmail = email.trim().toLowerCase()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(modifiedEmail))
            return res.status(401).json({
                success: false,
                message: "Invalid Email"
            })

        const user = User.findOne({email: modifiedEmail})
        if(!user)
            return res.status(400).json({
                success: false,
                message: "Not a registered Email"
            })
        
        const rawToken = crypto.randomBytes(32).toString('hex')
        const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')

        user.resetPasswordToken = tokenHash
        user.resetPasswordExpires = new Date(Date.now() + 15*60*1000)

        await user.save()

        const resetUrl = `${getAppUrl()}/user/forgot-password?token=${tokenHash}`
        await sendEmail({
            to: user.email,
            subject: "Reset Your Password",
            html: `<p>Please Change your Password by clicking this link: </p>
            <p><a href="${resetUrl}">${resetUrl}</a></p>
            <p><i>Link valid for only 15 min</i></p>`
        })

        res.status(201).json({
            success: false,
            message: "Please check your Inbox to change Password"
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: "Forgot Password Handling Error",
            error
        })
    }
}

module.exports.resetPasswordHandler = async(req,res)=>{
    try {
        // Frontend will aquire token (useParams) and send it in body
        const {password,token} = req.body
    
        if(!token)
            return res.status(400).json({
                success: false,
                message: "Token is required"
            })
        if(!password || password.length < 6)
            return res.status(400).json({
                success: false,
                message: "Password must be atleast 6 char long"
            })
    
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {$gt: new Date()}
        })

        if(!user)
            return res.status(400).json({ message: "Invalid or expired token" });

        const newPasswordHash = await hashPassword({password: password})

        user.password = newPasswordHash

        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined

        user.tokenVersion = user.tokenVersion + 1
        await user.save()

        return res.json({
            success: true,
            message: "Password reset successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Password reset server Error",
        });
    }
}

module.exports.googleAuthStartHandler = async(req,res)=>{

    try {
        const client = await getGoogleClient()
        console.log(client)
        if(!client)
            return res.status(401).json({
                success: false,
                message: "Google Client not received"
            })
    
        const url = client.generateAuthUrl({
            access_type: "offline",
            prompt: "consent",
            scope: ["openid","email","profile"]
        })
            // console.log(url)
        
    
        return res.redirect(url)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports.googleAuthCallbackHandler = async (req,res)=>{

    const {code} = req.query

    if(!code)
        return res.status(400).json({
            success: false,
            message: "Missing code in callback"
        })

    try{

        const client = await getGoogleClient()
        const { tokens } = await client.getToken(code)

        if(!tokens.id_token)
            return res.status(500).json({
                success: false,
                message: "Google Token Id not received"
            })

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload()

        const email = payload?.email
        const isEmailVerified = payload?.email_verified

        if (!email || !isEmailVerified) {
        return res.status(400).json({
            message: "Google email account is not verified",
            });
        }

        console.log(payload?.picture)
        const normalisedEmail = email.trim().toLowerCase()

        const user = await User.findOne({email: normalisedEmail})

        if(!user){
            const randomPassword = crypto.randomBytes(16).toString("hex")
            const passwordHash = await hashPassword({password: randomPassword})
            user = await User.create({
                email: normalisedEmail,
                role: "user",
                name: payload?.name,
                password: passwordHash,
                authProvider: "google",
                isEmailVerified: true,
                twoFactorEnabled: false
            })
            await user.save()
        } else{
            if(!user.isEmailVerified){
                user.isEmailVerified = true
                await user.save()
            }
        }

        const accessToken = await createAccessToken({
            _id: user._id,
            role: user.role,
            tokenVersion: user.tokenVersion
        })

        const refreshToken = await createRefresherToken({
            _id: user._id,
            tokenVersion: user.tokenVersion
        })

        res.cookie("refreshToken",refreshToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        const response = {
            success: true,
            message: "Google Login successfull",
            accessToken,
            user: {
                id: user._id,
                email: user.email,
                isEmailVerified: user.isEmailVerified,
                role: user.role,
                name: user.name,
                authProvider: user.authProvider
            }
        }

        console.log(response)

        const userData = {
                email: user.email,
                isEmailVerified: user.isEmailVerified,
                role: user.role,
                name: user.name,
                authProvider: user.authProvider
            }

        const userStr = encodeURIComponent(JSON.stringify(userData))

        return res.status(200).redirect(`http://localhost:5173/?token=${accessToken}&user=${userStr}`)
        
    } catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}