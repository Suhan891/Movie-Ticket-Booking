const Movies = require("../models/movies")
const { getTheaterId } = require("../service/theater")
const errorResponse = require("../util/errorResponse")
const { theaterSchema, movieIdSchema } = require("../validators/theater")


const validateTheater = async (req,res,next) => {
    const {error,value} = theaterSchema.validate(req.body, { stripeUnknown: true })
    if(error){
        errorResponse.message = error.details[0].message
        errorResponse.error = error
        return res.status(400).json(errorResponse)
    }

    console.log("Value: " ,value)
    req.body = value
    next()
}

const validateTheaterId = async (req,res,next) => {
    const { theaterId } = req.params
    if(!theaterId){
        errorResponse.message = "Theater Id required"
        return res.status(400).json(errorResponse)
    }

    const {errorTh,theater} = await getTheaterId(theaterId)
    if(errorTh){
        errorResponse.error = errorTh
        return res.status(500).json(errorResponse)
    }
    if(!theater){
            errorResponse.message = "Theater not Found"
            return res.status(400).json(errorResponse)
        }
    req.theater = theater
    next()
}

const validateMoviesBulk = async (req,res) => {
    const { movieId } = req.body
    const {error,movieIds} = movieIdSchema.validate(movieId,{ stripeUnknown: true })
    if(error){
        errorResponse.message = error.details[0].message
        errorResponse.error = error
        return res.status(400).json(errorResponse)
    }

    const movies = await Movies.find({ _id: { $in: movieIds } })

    if(!movies || movies.length !== movieIds.length){
        errorResponse.message = "One or More Movie not Found"
        return res.status(400).json(errorResponse)
    }

    req.movies = movies
    req.movieIds = movieIds
    next()
}

module.exports = {
    validateTheater,
    validateTheaterId,
    validateMoviesBulk
}