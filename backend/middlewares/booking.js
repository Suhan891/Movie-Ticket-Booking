const { getBooking } = require("../service/booking")
const { availMovie } = require("../service/theater")
const { STATUS_CODES, USER_ROLE } = require("../util/constants")
const errorResponse = require("../util/errorResponse")
const {bookingSchema,updateBookingSchema} = require("../validators/booking")


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
    if(!req.body){
        errorResponse.message = "No request for response"
        return res.status(400).json(errorResponse)
    }
    const {error,value} = bookingSchema.validate(req.body, { stripeUnknown: true })
    if(error){
            errorResponse.message = error.details[0].message.replace(/"/g, "")
            errorResponse.error = error
            return res.status(400).json(errorResponse)
        }
    req.data = value
    next()
}

const validateOwner = async (req,res,next) => {
    const user = req.user
    const userId = user.id
    const owner = req.booking.userId
    if(user.role !== USER_ROLE.admin &&  userId.toString() !== owner.toString()){
        errorResponse.message= "You are not Authorised to Update"
        return res.status(STATUS_CODES.FORBIDDEN).json(errorResponse)
    }
    next()
}

const validateBookingId = async (req,res,next) => {
    const {bookId} = req.params
    if(!bookId){
        errorResponse.message = "Booking Id not available"
        return res.status(STATUS_CODES.NOT_FOUND).json(errorResponse)
    }
    const {error,booking} = await getBooking(bookId)
    if(error){
        errorResponse.error = error
        return res.status(STATUS_CODES.NOT_FOUND).json(errorResponse)
    }
    if(!booking){
        errorResponse.message = "Booking not available"
        return res.status(STATUS_CODES.NOT_FOUND).json(errorResponse)
    }
    req.booking = booking
    next()
}

const validateUpdateBooking = async (req,res,next) => {
    if(!req.body){
            errorResponse.message = "No request for response"
            return res.status(400).json(errorResponse)
        }
    const {error,value} = updateBookingSchema.validate(req.body, { stripeUnknown: true })  // Has to be changed because if all the required fields are not provided 
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
    validateBooking,
    validateBookingId,
    validateUpdateBooking,
    validateOwner
}