const express = require("express")
const { validateMovieId } = require("../middlewares/movie")
const { validateTheaterId } = require("../middlewares/theater")
const { validateMovieOnTheater, validateBooking, validateUpdateBooking, validateBookingId, validateOwner } = require("../middlewares/booking")
const { validateCustomer } = require("../middlewares/roles")
const requireAuth = require("../middlewares/requireAuth")
const { createBooking, upateBooking, getBooking, showBooking } = require("../controllers/booking")

const router = express.Router()

router.post("/:theaterId/:movieId/create",requireAuth,validateCustomer,validateTheaterId,validateMovieId,validateMovieOnTheater,validateBooking,createBooking)
router.patch("/:bookId",requireAuth,validateCustomer,validateBookingId,validateOwner,validateUpdateBooking,upateBooking)
router.get("/",requireAuth,validateCustomer,getBooking)
router.get("/:bookId",requireAuth,validateCustomer,validateBookingId,validateOwner,showBooking)

module.exports = router