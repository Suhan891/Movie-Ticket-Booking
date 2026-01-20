const express = require("express")
const requireAuth = require("../middlewares/requireAuth")
const { validateMovieId } = require("../middlewares/movie")
const { validateTheaterId } = require("../middlewares/theater")
const { validateMovieOnTheater } = require("../middlewares/booking")
const { validateShow } = require("../middlewares/show")
const { createShow } = require("../controllers/show")
const { validateAdminOrTheater } = require("../middlewares/roles")


const router = express.Router()


router.post("/:theaterId/:movieId/create",requireAuth,validateAdminOrTheater,validateTheaterId,validateMovieId,validateMovieOnTheater,validateShow,createShow)

module.exports = router