const Booking = require("../models/booking")

const getBooking = async (movieId) => {
    try {
        const booking = await Booking.findById(movieId)
        return {booking , error: null}
    } catch (error) {
        return {booking:null , error}
    }
}

module.exports = {
    getBooking
}