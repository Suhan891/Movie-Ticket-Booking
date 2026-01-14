const errorResponse = require("../util/errorResponse")
const { movieSchema } = require("../validators/movies")

const validateMovie = async (req,res,next) => {
    console.log(req.body)
    const { error, value } = movieSchema.validate(req.body, { stripUnknown: true })  // stripUnknown will remove unnecessary data
    if(error){
        errorResponse.message = error.details[0].message
        errorResponse.error = error
        return res.status(400).json(errorResponse)
    }

    console.log("Value: " ,value)
    req.body = value
    next()
}

module.exports = {
    validateMovie
}