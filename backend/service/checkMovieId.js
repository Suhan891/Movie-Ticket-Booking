const Movies = require("../models/movies")
const errorResponse = require("../util/errorResponse")

const getMovie = async (id) => {
    try {
        const movie = await Movies.findById(id)
        return movie
    } catch (error) {
        return error
    }
}

module.exports = {
    getMovie
}