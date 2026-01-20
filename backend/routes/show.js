const express = require("express")
const requireAuth = require("../middlewares/requireAuth")
const { validateMovieId } = require("../middlewares/movie")
const { validateTheaterId } = require("../middlewares/theater")
const { validateMovieOnTheater } = require("../middlewares/booking")
const { validateShow, availableShow, validateUpdateShow, validateRoute, validateExistingShow } = require("../middlewares/show")
const { createShow, updateShow, deleteShow, getShow } = require("../controllers/show")
const { validateAdminOrTheater, validateTheaterOrCustomer } = require("../middlewares/roles")


const router = express.Router()

router.post("/:theaterId/:movieId/create",requireAuth,validateAdminOrTheater,validateTheaterId,validateMovieId,validateMovieOnTheater,validateExistingShow,validateShow,createShow)
router.get("/:theaterId/:movieId/",requireAuth,validateTheaterOrCustomer,validateTheaterId,validateMovieId,validateMovieOnTheater,getShow)   // Given No access to Movie Owner but all access to rest
router.patch("/:theaterId/:movieId/:showId/update",requireAuth,validateAdminOrTheater,validateTheaterId,validateMovieId,validateMovieOnTheater,availableShow,validateRoute,validateUpdateShow,updateShow)
router.delete("/:theaterId/:movieId/:showId/delete",requireAuth,validateAdminOrTheater,validateTheaterId,validateMovieId,validateMovieOnTheater,availableShow,validateRoute,deleteShow)

module.exports = router