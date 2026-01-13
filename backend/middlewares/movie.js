const errorResponse = require("../util/errorResponse")
const movieSchema = require("../validators/movies")

const validateMovie = async (req,res,next) => {
    const {error,value} = movieSchema(req.body,{stripeUnknown: true})  // stripeUnknown would remove all unnecessary data
    if(error){
        errorResponse.message = error.details[0].message
        errorResponse.error = error
        return res.status(400).json(errorResponse)
        }

    req.body = value
    next()
}

module.exports = {
    validateMovie
}