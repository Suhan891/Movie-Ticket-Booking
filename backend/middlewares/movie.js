const { getMovie } = require("../service/checkMovieId")
const errorResponse = require("../util/errorResponse")
const { movieSchema, searchSchema } = require("../validators/movies")

const validateMovie = async (req,res,next) => {
    if(!req.body){
        errorResponse.message = "No request for response"
        return res.status(400).json(errorResponse)
    }
    const { error, value } = movieSchema.validate(req.body, { stripUnknown: true })  // stripUnknown will remove unnecessary data
    if(error){
        errorResponse.message = error.details[0].message
        errorResponse.error = error
        return res.status(400).json(errorResponse)
    }

    console.log("Value: " ,value)
    req.body = value
    next()
}

const validateMovieId = async (req,res,next) => {
    const {movieId} = req.params
    if(!movieId){
        errorResponse.message = "Movie Id required"
        return res.status(400).json(errorResponse)
    }
    const {movie,error} = await getMovie(movieId)
    if(error){
        errorResponse.error = error
        return res.status(500).json(errorResponse)
    }

    if(!movie){
        errorResponse.message = "Movie not Found"
        return res.status(400).json(errorResponse)
    }
    req.movieId = movie._id
    console.log("Validation Movies successfull")
    next()
}

const validateSearch = async (req,res,next) => {
    const { error, value } = searchSchema.validate(req.query, { stripUnknown: true })  // stripUnknown will remove unnecessary data
    if(error){
        errorResponse.message = error.details[0].message
        errorResponse.error = error
        return res.status(400).json(errorResponse)
    }

    console.log("Value: " ,value)
    req.query = value
    next()
}

module.exports = {
    validateMovie,
    validateMovieId,
    validateSearch
}