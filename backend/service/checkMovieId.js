const Movies = require("../models/movies")
const errorResponse = require("../util/errorResponse")

const getMovie = async (id) => {
    try {
        const movie = await Movies.findById(id).lean()
        console.log("Movie: ",movie)
        return {movie , error: null}
    } catch (error) {
        return {movie:null, error}
    }
}

module.exports = {
    getMovie
}