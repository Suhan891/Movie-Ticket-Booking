const Movies = require("../models/movies")
const { getMovie } = require("../service/checkMovieId")
const errorResponse = require("../util/errorResponse")
const successResponse = require("../util/successResponse")

const createMovie = async (req,res) => {
    try {
        const details = req.body
        const movie = await Movies.create(details)

        successResponse.message = "Movie created"
        successResponse.data = movie
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(500).json(errorResponse)
    }
}

const getMovies = async (req,res) => {
    try {
        const movies = await Movies.find({})

        successResponse.message = "Movies Obtained"
        successResponse.data = movies
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(500).json(errorResponse)
    }
}

const getMovieById = async (req,res) => {
    const {movieId} = req.params

    const {error,movie} = await getMovie(movieId)

    if(error){
        errorResponse.error = error
        return res.status(500).json(errorResponse)
    }

    if(!movie){
        errorResponse.message = "Movie not Found"
        return res.status(400).json(errorResponse)
    }

    successResponse.message = "Movies Found"
    successResponse.data = movie
    return res.status(200).json(successResponse)
}

const deleteMovie = async (req,res) => {
    try {
        const {movieId} = req.params
        const {error,movie} = await getMovie(movieId)

        if(error){
        errorResponse.error = error
        return res.status(500).json(errorResponse)
        }
        if(!movie){
        errorResponse.message = "Movie not Found"
        return res.status(400).json(errorResponse)
        }

        const removed = await Movies.findByIdAndDelete(movieId)
        successResponse.message = "Movie Deleted"
        successResponse.data = removed
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(500).json(errorResponse)
    }
}

const updateMovie = async (req,res) => {
    try {
        const {movieId} = req.params
        const data = req.body
        console.log("Data: ",data)

        const {error,movie} = await getMovie(movieId)

        if(error){
        errorResponse.error = error
        return res.status(500).json(errorResponse)
        }
        if(!movie){
        errorResponse.message = "Movie not Found"
        return res.status(401).json(errorResponse)
        }

        const updatedMovie = await Movies.findByIdAndUpdate(movieId,{ $set: data },{new: true, runValidators: true})
        successResponse.message = "Movie Updated"
        successResponse.data = updatedMovie
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        res.status(500).json(errorResponse)
    }
}

module.exports = {
    createMovie,
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie
}