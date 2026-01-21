const express = require("express")
const { accessToken, validateProfile, findUser, isProfile, validateAccessProfile } = require("../middlewares/profile")
const { getProfile, createProfile, showProfile, upateProfile } = require("../controllers/profile")
const requireAuth = require("../middlewares/requireAuth")
const { validateAdminOrClient } = require("../middlewares/roles")

const router = express.Router()

router.get("/",accessToken,findUser,getProfile)
router.post("/",accessToken,findUser,validateProfile,createProfile)
// After login below functionallity will work
router.get("/:profileId",requireAuth,validateAdminOrClient,isProfile,validateAccessProfile,showProfile)  // Show
router.patch("/:profileId/update",requireAuth,validateAdminOrClient,isProfile,validateAccessProfile,validateProfile,upateProfile)

module.exports = router