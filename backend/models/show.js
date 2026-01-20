const mongoose = require("mongoose")
const { Schema } = mongoose

const showSchema = new Schema({
    theaterId: {
        type: Schema.Types.ObjectId,
        ref: "Theater",
        required: true
    },
    movieId: {  // This will be given as unique -> true later
        type: Schema.Types.ObjectId,
        ref: "Movies",
        required: true
    },
    timing: {
       type: String,
       required: true 
    },
    price: {
        type: String,
        required: true
    },
    noOfSeats: {
        type: Number,
        required: true
    },
    format: {
        type: String
    },
    seatType: {
        type: [String],
        // required: true,
    }
},{timestamps: true})

const Show = mongoose.model("Show",showSchema)

module.exports = Show