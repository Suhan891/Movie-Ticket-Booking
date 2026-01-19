const mongoose = require("mongoose")
const { MOVIE_STATUS } = require("../util/constants")
const { Schema } = mongoose

const bookingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    movieId: {
        type: Schema.Types.ObjectId,
        ref: "Movies",
        required: true
    },
    theaterId: {
        type: Schema.Types.ObjectId,
        ref: "Theater",
        required: true
    },
    timing: {
        type: String,
        required: true
    },
    noOfSeats: {
        type: Number,
        required: true
    },
    totalCost: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum:{
            values: [MOVIE_STATUS.cancelled,MOVIE_STATUS.processing,MOVIE_STATUS.successfull],
            message: ""
        },
        default: MOVIE_STATUS.processing
    }

},{timestamps: true})

const Booking = mongoose.model("Booking",bookingSchema)
module.exports = Booking