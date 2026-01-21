const express = require("express")
const { accessToken, validateProfile, findUser } = require("../middlewares/profile")
const { getProfile, createProfile } = require("../controllers/profile")

const router = express.Router()

router.get("/",accessToken,findUser,getProfile)
router.post("/",accessToken,findUser,validateProfile,createProfile)

module.exports = router