const errorResponse = require("../util/errorResponse")
const { showSchema } = require("../validators/show")

const validateShow = async (req,res,next) => {
    if(!req.body){
        errorResponse.message = "No request for response"
        return res.status(400).json(errorResponse)
    }
    const {error,value} = showSchema.validate(req.body, {stripeUnknown: true})
    if(error){
            errorResponse.message = error.details[0].message.replace(/"/g, "")
            errorResponse.error = error
            return res.status(400).json(errorResponse)
        }
    
    console.log("Value from Validate Show: " ,value)
    req.data = value
    next()
}

module.exports = {
    validateShow
}