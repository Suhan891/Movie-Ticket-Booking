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

    const {error,theater} = await getTheaterId(theaterId)
    if(error){
        errorResponse.message = "Theater not Found"
        errorResponse.error = error
        return res.status(400).json(errorResponse)
    }
    if(!theater){
            errorResponse.message = "Theater not Found"
            return res.status(400).json(errorResponse)
        }
    req.theaterId = theater._id
    console.log("Validation Theater successfull")
    next()
}

const validateMoviesBulk = async (req,res,next) => {
    // const { movieId } = req.body
    // console.log(movieId)
    const {error,value} = movieIdSchema.validate(req.body,{ stripeUnknown: true })
    if(error){
        errorResponse.message = error.details[0].message
        errorResponse.error = error
        return res.status(400).json(errorResponse)
    }
    const { movieIds } = value
   
    const movies = await Movies.find({ _id: { $in: movieIds } })
    console.log(movies)

    if(!movies || movies.length !== movieIds.length){
        errorResponse.message = "One or More Movie not Found"
        return res.status(400).json(errorResponse)
    }

    req.movies = movies
    req.movieIds = movieIds
    console.log("Validate Movies Bulk Successfull")
    next()
}

module.exports = {
    validateTheater,
    validateTheaterId,
    validateMoviesBulk
}