const mongoose = require("mongooose")

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
        type: [String],
        required: true,
        // name:{   // Will be used by creating cast different schema
        //     type: String,
        //     required: true
        // },
        // imageUrl: {
        //     type: String,
        //     required: true
        // }
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
        type: String,
        required: true
    },
    releasedStatus:{
        type: String,
        default: "Released"
    }
},{timestamps: true})

const Movies = mongoose.model("Movies",movieSchema)
module.exports = Movies