const Show = require("../models/show")
const { STATUS_CODES } = require("../util/constants")
const errorResponse = require("../util/errorResponse")
const successResponse = require("../util/successResponse")

const createShow = async (req,res) => {
    const {theaterId, movieId, isAvail} = req
    const {timing, price, noOfSeats, format, seatType} = req.data
    try {
        if(!isAvail){
            errorResponse.message = "Movie Not available at this theater"
            return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponse)
        }

        const show = await Show.create({
            theaterId,
            movieId,
            timing,
            price,
            noOfSeats,
            format,
            seatType
        })

        successResponse.message = "Show Created Successfully"
        successResponse.data = show
        return res.status(STATUS_CODES.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
}

module.exports = {
    createShow
}