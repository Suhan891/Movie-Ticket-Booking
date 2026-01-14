const express = require("express")
const { validateMovie, validateSearch } = require("../middlewares/movie")
const { createMovie, getMovies, getMovieById, deleteMovie, updateMovie, fetchMovie } = require("../controllers/movies")

const router = express.Router()

router.get("/all-movies",getMovies)
router.post("/create-movie",validateMovie,createMovie)
router.get("/:movieId",getMovieById)
router.put("/update/:movieId",validateMovie,updateMovie)
router.delete("/delete/:movieId",deleteMovie)

router.get("/search",validateSearch,fetchMovie)

module.exports = router