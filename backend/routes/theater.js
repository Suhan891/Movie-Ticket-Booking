const express = require("express")
const { getAllTheater, createTheater, getTheaterById, deleteTheater, updateTheater, addMovies, removeMovies, getMoviesForTheater } = require("../controllers/theater")
const { validateTheater,validateMoviesBulk, validateTheaterId, validateMovieId } = require("../middlewares/theater")

const router = express.Router()

router.get("/",getAllTheater)
router.post("/create",validateTheater,createTheater)
router.get("/:theaterId",getTheaterById)

router.put("/update/:theaterId",validateTheaterId,validateTheater,updateTheater)
router.delete("/delete/:theaterId",validateTheaterId,deleteTheater)

router.get("/:theaterId/movie/:movieId",validateTheaterId,validateMovieId,getMoviesForTheater)

// router.patch("/:theaterId/movie/:movieId",validateTheaterId,addMovie)  // Single Add
router.patch("/:theaterId/movie/add-many",validateTheaterId,validateMoviesBulk,addMovies)
// router.delete("/:theaterId/movie/:movieId",validateTheaterId,removeMovie)  // Single Remove
router.post("/:theaterId/movie/remove-many",validateTheaterId,validateMoviesBulk,removeMovies)

module.exports = router