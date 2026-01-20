const { findUser } = require("../service/auth")
const errorResponse = require("../util/errorResponse")
const { signUpSchema } = require("../validators/auth")


const validateSignup = async (req,res,next) => {
    if(!req.body){
            errorResponse.message = "No request for response"
            return res.status(400).json(errorResponse)
        }
    const {error,value} = signUpSchema.validate(req.body,{ stripUnknown: true })
    console.log("I received: ",value)
    if(error){
        errorResponse.message = error.details[0].message.replace(/"/g, "")
        errorResponse.error = error
        return res.status(400).json(errorResponse)
    }
    const {err,user} = await findUser(value.email)
    console.log("From Middlewares: ",user,err)
    if(err){
        errorResponse.message = err.message || "Something went wrong"
        errorResponse.error = err.errors || ""
        return res.status(400).json(errorResponse)
    }
    if(user){
        errorResponse.message = "Email already registered"
        errorResponse.error = error.err || ""
        return res.status(400).json(errorResponse)
    }
    req.body = ""
    req.data = value
    next()
}

module.exports = {
    validateSignup
}