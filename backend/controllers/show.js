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

const updateShow = async (req,res) => {
    const {show, isAvail} = req

    if(!isAvail){
        errorResponse.message = "Show Not avilable with the provided requests"
        return res.status().json(errorResponse)
    }

    try {
        const {timing, price, noOfSeats, format, seatType} = req.data
        if(timing)
            show.timing = timing
        if(price)
            show.price = price
        if(noOfSeats){
            show.noOfSeats = noOfSeats
        }
        if(format)
            show.format = format
        if(seatType)
            show.seatType = seatType

        const updatedShow = await show.save()
        successResponse.message = "Show Updated Successfully"
        successResponse.data = updatedShow
        return res.status(STATUS_CODES.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
}

const getShow = async (req,res) => {
    const {theaterId, movieId} = req
    try {
        const show = await Show.findOne({theaterId, movieId})
        if(!show){
            errorResponse.message = "No Shows Available"
            return res.status(STATUS_CODES.OK).json(errorResponse)
        }

        successResponse.message = "Show Found Successfully"
        successResponse.data = show
        return res.status(STATUS_CODES.OK).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
}

const deleteShow = async (req,res) => {
    const showId = req.show._id
    try {
        const show = await Show.findOneAndDelete({_id: showId})
        successResponse.message = "Show Deleted Successfully"
        successResponse.data = show
        return res.status(STATUS_CODES.OK).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
}

module.exports = {
    createShow,
    getShow,
    updateShow,
    deleteShow
}