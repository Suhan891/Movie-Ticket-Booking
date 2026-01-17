const express = require("express")
const { registerUser, loginUser, verifyEmail, refreshToken, logout, forgotPassword, resetPasswordHandler,  googleAuthStartHandler, googleAuthCallbackHandler, twoFASetupHandler, twoFAVerifyHandler } = require("../controllers/user")
const requireAuth = require("../middlewares/requireAuth")
const limiter = require("../middlewares/rateLimiter")
const { validateSignup } = require("../middlewares/auth")

const router = express.Router()

router.post("/register",validateSignup,registerUser)
router.post("/login",loginUser)
router.get("/email-verify",verifyEmail)
router.post("/refreshToken",refreshToken)
router.post("/logout",logout)
router.post("/forgot-password",limiter,forgotPassword)
router.post("/reset-password",resetPasswordHandler)
router.get("/google",googleAuthStartHandler)
router.get("/google/callback",googleAuthCallbackHandler)
router.post("/2fa/setup", requireAuth, twoFASetupHandler)
router.post("/2fa/verify", requireAuth, twoFAVerifyHandler)

module.exports = router