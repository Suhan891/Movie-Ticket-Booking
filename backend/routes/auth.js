const express = require("express")
const { registerUser, loginUser, verifyEmail, refreshToken, logout, forgotPassword, resetPasswordHandler,  googleAuthStartHandler, googleAuthCallbackHandler } = require("../controlllers/user")
const requireAuth = require("../middlewares/requireAuth")
const limiter = require("../middlewares/rateLimiter")

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/email-verify",verifyEmail)
router.post("/refreshToken",refreshToken)
router.post("/logout",logout)
router.post("/forgot-password",limiter,forgotPassword)
router.post("/reset-password",resetPasswordHandler)
router.get("/google",googleAuthStartHandler)
router.get("/google/callback",googleAuthCallbackHandler)

module.exports = router