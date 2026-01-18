const errorResponse = require("../util/errorResponse")
const { signUpSchema } = require("../validators/auth")


const validateSignup = async (req,res,next) => {
    const {error,value} = signUpSchema.validate(req.body,{ stripUnknown: true })
    console.log("I received: ",value)
    if(error){
        errorResponse.message = error.details[0].message.replace(/"/g, "")
        errorResponse.error = error
        return res.status(400).json(errorResponse)
    }
    req.body = ""
    req.data = value
    next()
}

module.exports = {
    validateSignup
}