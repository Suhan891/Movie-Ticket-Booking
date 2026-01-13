const express = require("express")
const { validateMovie } = require("../middlewares/movie")
const { createMovie, getMovies, getMovieById, deleteMovie, updateMovie } = require("../controlllers/movies")

const router = express.Router()

router.get("/all-movies",getMovies)
router.post("/create-movie",validateMovie,createMovie)
router.get("/:movieId",getMovieById)
router.put("/:movieId",validateMovie,updateMovie)
router.delete("/:movieId",deleteMovie)

module.exports = router