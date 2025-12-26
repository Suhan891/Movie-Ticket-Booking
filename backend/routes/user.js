const express = require("express")
const { registerUser, loginUser, verifyEmail, refreshToken, logout } = require("../controlllers/user")

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/email-verify",verifyEmail)
router.post("/refreshToken",refreshToken)
router.post("/logout",logout)

module.exports = router