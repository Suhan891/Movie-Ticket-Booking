const { isShow, existingShow } = require("../service/show")
const { STATUS_CODES, USER_ROLE } = require("../util/constants")
const errorResponse = require("../util/errorResponse")
const { showSchema, updateShowSchema } = require("../validators/show")

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

const validateUpdateShow = async (req,res,next) => {
    if(!req.body){
        errorResponse.message = "No request for response"
        return res.status(400).json(errorResponse)
    }
    const {error,value} = updateShowSchema.validate(req.body, {stripeUnknown: true})
    if(error){
            errorResponse.message = error.details[0].message.replace(/"/g, "")
            errorResponse.error = error
            return res.status(400).json(errorResponse)
        }
    
    console.log("Value from Validate Show: " ,value)
    req.data = value
    next()
}

const availableShow = async (req,res,next) => {  // Or validateShowId
    const {showId} = req.params
    if(!showId){
        errorResponse.message = "Show Id not available"
        return res.status(STATUS_CODES.NOT_FOUND).json(errorResponse)
    }
    const {error,show} = await isShow(showId)
    if(error){
            errorResponse.error = error
            return res.status(STATUS_CODES.NOT_FOUND).json(errorResponse)
    }
    if(!show){
            errorResponse.message = "Show not available"
            return res.status(STATUS_CODES.NOT_FOUND).json(errorResponse)
    }
    req.show = show
    next()
}

const validateExistingShow = async (req,res,next) => {
    const {theaterId, movieId,user} = req
    const {error, show} = await existingShow(theaterId,movieId)
    if(error){
            errorResponse.error = error
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
    if(show){
            errorResponse.message = "Show already available"
            return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponse)
    }
    
    next()
}

const validateRoute = async (req,res,next) => {
    const {show, theaterId, movieId,user} = req
    const showId = show._id
    if(user.role !== USER_ROLE.admin && ( theaterId.toString() !== showId.toString() || movieId.toString() !== showId.toString())){
        errorResponse.message= "Show does not belong to either of Theater or Movie"
        return res.status(STATUS_CODES.FORBIDDEN).json(errorResponse)
    }
    req.isAvail = true
    next()
}

module.exports = {
    validateShow,
    validateUpdateShow,
    availableShow,
    validateRoute,
    validateExistingShow
}