const Movies = require("../models/movies")
const Theater = require("../models/theater")

const getTheaters = async (data) => {
    try {
        let query = {}
        let pagination = {}
        if(data && data.name)
            query.name = data.name
        if(data && data.city)
            query.city = data.city
        if(data && data.pincode)
            query.pincode = data.pincode
        if(data && data.limit) // Limit -> How many records per page
            pagination.limit = data.limit
        if(data && data.skip){  // Skip -> How many records to ignore before fetching  or skip -> similar to page number
            let perPage = (data.limit) ? data.limit : 3
            pagination.skip = data.skip * perPage
        }

        if(data && data.movieName){
            const movie = await Movies.findOne({name: data.movieName})
            console.log("Movie",movie)
            query.movies = {$all: movie._id}
        }
        console.log(query)

        const theaters = await Theater.find(query).limit(pagination.limit || 3).skip(pagination.skip || 0)
        console.log(theaters)
        return ({theater: theaters,error: null})
    } catch (err) {
        return ({theater: null,error: err})
    }
} 

const getTheaterId = async (id) => {
    try {
        const theater = await Theater.findById(id,{name:1, movies:1, address: 1}).populate("movies").lean()
        return {theater , error: null}
    } catch (error) {
        console.log(error)
        return {theater:null, error}
    }
}

module.exports = {
    getTheaters,
    getTheaterId
}