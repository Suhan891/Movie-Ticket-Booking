const { availMovie } = require("../service/theater")
const { STATUS_CODES } = require("../util/constants")
const errorResponse = require("../util/errorResponse")
const bookingSchema = require("../validators/booking")


const validateMovieOnTheater = async (req,res,next) => {
    const {theaterId,movieId} = req

    const {movie,error} = await availMovie(theaterId,movieId)
    if(error){
        errorResponse.error= error
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
    if(!movie){
        errorResponse.message= "Movie Not Avail on This Theater"
        return res.status(STATUS_CODES.NOT_FOUND).json(errorResponse)
    }
    req.isAvail = true
    next()
}

const validateBooking = async (req,res,next) => {
    const {error,value} = bookingSchema.validate(req.body, { stripeUnknown: true })
    if(error){
            errorResponse.message = error.details[0].message.replace(/"/g, "")
            errorResponse.error = error
            return res.status(400).json(errorResponse)
        }
    req.data = value
    next()
}

module.exports = {
    validateMovieOnTheater,
    validateBooking
}