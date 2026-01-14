
const mongoose = require("mongoose")

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    imsgeUrl: {
        type: String,
    }
})

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    casts: {
        type: [String],  // Later-> type: [castSchema]
        required: true,
    },
    trailerUrl: {
        type: String,
        required: true
    },
    language: {
        type: String,
        default: "English"
    },
    director:{
        type: String,
        required: true
    },
    releaseDate:{
        type: Date,
        required: true
    },
    releasedStatus:{
        type: String,
        default: "Released"
    }
},{timestamps: true})

const Movies = mongoose.model("Movies",movieSchema)
module.exports = Movies