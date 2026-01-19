const Booking = require("../models/booking")
const { STATUS_CODES } = require("../util/constants")
const errorResponse = require("../util/errorResponse")
const successResponse = require("../util/successResponse")

const createBooking = async (req,res) => {
    try {
        const {theaterId, movieId, user, isAvail, data} = req

        console.log(user)
        const userId = user.id
        console.log("From Booking userId: ",userId)
        const {timing, noOfSeats, totalCost, status} = data
    
        if(!isAvail){
            errorResponse.message = "movie Not available at this theater"
            return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponse)
        }
        const movie = await Booking.create({
            userId,
            movieId,
            theaterId,
            timing,
            noOfSeats, 
            totalCost, 
            status
        })

        successResponse.message = "Booking Created"
        successResponse.data = movie
        return res.status(STATUS_CODES.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
}

module.exports = {
    createBooking
}