const express = require("express")
const { getAllTheater, createTheater, getTheaterById, deleteTheater, updateTheater, addMovies, removeMovies } = require("../controllers/theater")
const { validateTheater,validateMoviesBulk, validateTheaterId } = require("../middlewares/theater")

const router = express.Router()

router.get("/",getAllTheater)
router.post("/create",validateTheater,createTheater)
router.get("/:theaterId",getTheaterById)

router.put("/update/:movieId",validateTheater,updateTheater)
router.delete("/delete/:movieId",deleteTheater)

// router.patch("/:theaterId/movie/:movieId",validateTheaterId,addMovie)  // Single Add
router.patch("/:theaterId/movie/add-many",validateTheaterId,validateMoviesBulk,addMovies)
// router.delete("/:theaterId/movie/:movieId",validateTheaterId,removeMovie)  // Single Remove
router.post("/:theaterId/movie/remove-many",validateTheaterId,validateMoviesBulk,removeMovies)

module.exports = router