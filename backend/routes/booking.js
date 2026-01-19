const express = require("express")
const { validateMovieId } = require("../middlewares/movie")
const { validateTheaterId } = require("../middlewares/theater")
const { validateMovieOnTheater, validateBooking } = require("../middlewares/booking")
const { validateCustomer } = require("../middlewares/roles")
const requireAuth = require("../middlewares/requireAuth")
const { createBooking } = require("../controllers/booking")

const router = express.Router()

router.post("/:theaterId/:movieId/create",requireAuth,validateCustomer,validateTheaterId,validateMovieId,validateMovieOnTheater,validateBooking,createBooking)



module.exports = router