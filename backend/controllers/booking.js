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
            errorResponse.message = "Movie Not available at this theater"
            return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponse)
        }
        const booking = await Booking.create({
            userId,
            movieId,
            theaterId,
            timing,
            noOfSeats, 
            totalCost, 
            status
        })

        successResponse.message = "Booking Created"
        successResponse.data = booking
        return res.status(STATUS_CODES.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
}

const upateBooking = async (req,res) => {
    const {timing, noOfSeats, status} = req.data
    try {
        let booking = req.booking
        if(timing)
            booking.timing = timing
        if(noOfSeats){
            booking.noOfSeats = noOfSeats
            // Also: booking.totalCost = noOfSeats * booking.pricePerSeat ->  Later
        }
        if(status)
            booking.status = status

        const updatedBooking = await booking.save()
        console.log(updatedBooking)

        successResponse.message = "Booking Updated Successfully"
        successResponse.data = updatedBooking
        return res.status(STATUS_CODES.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
}

const getBooking = async (req,res) => {
    const {user} = req
    const userId = user.id
    try {
        const booking = await Booking.find({userId: userId}).sort({ createdAt: -1 })
        if(!booking){  // Keeping it a success Response as user may not have any bookings available
            successResponse.message = "Currently No booking"
            successResponse.data = null
            return res.status(STATUS_CODES.OK).json(successResponse)
        }

        successResponse.message = "Bookings Found Successfully"
        successResponse.data = booking
        return res.status(STATUS_CODES.OK).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
}

const showBooking = async (req,res) => {
    
    const booking = req.booking
    const bookingDetails = {
        timing: booking.timing,
        noOfSeats: booking.noOfSeats,
        totalCost: booking.totalCost,
        status: booking.status
    }
    console.log(bookingDetails)

    successResponse.message = "Bookings Found Successfully"
    successResponse.data = bookingDetails
    return res.status(STATUS_CODES.OK).json(successResponse)
}

module.exports = {
    createBooking,
    upateBooking,
    getBooking,
    showBooking
}