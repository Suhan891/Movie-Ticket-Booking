const Theater = require("../models/theater")

const getTheaters = async (data) => {
    try {
        let query = {}
        if(data && data.name)
            query.name = data.name
        if(data && data.city)
            query.city = data.city
        if(data && data.pincode)
            query.pincode = data.pincode
        const theaters = await Theater.find(query)
        return ({theater: theaters,error: null})
    } catch (err) {
        return ({theater: null,error: err})
    }
} 

const getTheaterId = async (id) => {
    try {
        const theater = await Theater.findById(id).lean()
        return {theater , error: null}
    } catch (error) {
        return {theater:null, error}
    }
}

module.exports = {
    getTheaters,
    getTheaterId
}