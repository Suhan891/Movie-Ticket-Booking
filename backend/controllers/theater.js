const Theater = require("../models/theater")
const { getMovie } = require("../service/checkMovieId")
const { getTheaters, getTheaterId } = require("../service/theater")
const errorResponse = require("../util/errorResponse")
const successResponse = require("../util/successResponse")

const createTheater = async (req,res) => {
    try {
        const details = req.body
        const theater = await Theater.create(details)

        successResponse.message = "Theater created"
        successResponse.data = theater
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(500).json(errorResponse)
    }
}

const getAllTheater = async (req,res) => {
    const data = req.query
        
    const {theater,error} = await getTheaters(data)
    if(error){
            errorResponse.error = error,
            errorResponse.message = "Searching theaters failed"
            return res.status(500).json(errorResponse)
    }

    if(!theater){
            errorResponse.message = "No such theater available"
            return res.status(400).json(errorResponse)
    }

    successResponse.message = "Theaters Obtained"
    successResponse.data = theater
    return res.status(200).json(successResponse)
}

const getTheaterById = async (req,res) => {
    const {theaterId} = req.params

    const {error,theater} = await getTheaterId(theaterId)

    if(error){
        errorResponse.error = error
        return res.status(500).json(errorResponse)
    }

    if(!theater){
        errorResponse.message = "Theater not Found"
        return res.status(400).json(errorResponse)
    }

    successResponse.message = "Theater Found"
    successResponse.data = theater
    return res.status(200).json(successResponse)
}

const deleteTheater = async (req,res) => {
    try {
        const {theaterId} = req.params
        const {error,theater} = await getTheaterId(theaterId)

        if(error){
        errorResponse.error = error
        return res.status(500).json(errorResponse)
        }
        if(!theater){
        errorResponse.message = "Theater not Found"
        return res.status(400).json(errorResponse)
        }

        const removed = await Theater.findByIdAndDelete(theaterId)
        successResponse.message = "Theater Deleted"
        successResponse.data = removed
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(500).json(errorResponse)
    }
}

const updateTheater = async (req,res) => {
    try {
        const {theaterId} = req
        const data = req.body

        const {error,theater} = await getTheaterId(theaterId)

        if(error){
        errorResponse.error = error
        return res.status(500).json(errorResponse)
        }
        if(!theater){
        errorResponse.message = "Theater not Found"
        return res.status(401).json(errorResponse)
        }
        console.log(theater)

        const updatedTheater = await Theater.findByIdAndUpdate(theaterId,{ $set: data },{new: true, runValidators: true})
        successResponse.message = "Theater Updated"
        successResponse.data = updatedTheater
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        res.status(500).json(errorResponse)
    }
}

const addMovies = async (req,res) => {
    try {
        const {theaterId,movieIds} = req // Also be getting movies but not used
        console.log("TheaterId: ",theaterId)
        console.log("MovieId: ",movieIds)
        const theater = await Theater.findByIdAndUpdate(
            {_id: theaterId},
            {$addToSet: { movies: {$each: movieIds}}},
            {new: true}
        )
        console.log("Theater: ",theater)
        const addedMovies = await theater.populate("movies")
        successResponse.data = addedMovies
        successResponse.message = `${theater.movies.length} Movies added successfully`
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        res.status(500).json(errorResponse)
    }
}

const removeMovies = async (req,res) => {
    try {
        const {theaterId,movieIds} = req
        
        const theater = await Theater.findByIdAndUpdate(
            {_id: theaterId},
            {$pull: {movies: {$in: movieIds}}},
            {new: true}
        )

        successResponse.message = "Deleted Successfully"
        successResponse.data = await theater.populate("movies")
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        res.status(500).json(errorResponse)
    }
}

module.exports = {
    createTheater,
    getAllTheater,
    getTheaterById,
    deleteTheater,
    updateTheater,

    addMovies,
    removeMovies
}