const { verifyProfileToken } = require("../lib/token")
const { getUser, accessProfile } = require("../service/profile")
const { USER_ROLE } = require("../util/constants")
const errorResponse = require("../util/errorResponse")
const { profileSchema } = require("../validators/profile")

const accessToken = async (req,res,next) => {
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        errorResponse.message = "Token Not availble at headers"
        return res.status(404).json(errorResponse)
    }
    const token = authHeader.split(" ")[1]
    req.token = token
    next()
}

const findUser = async (req,res,next) => {
    const { token } = req
    const payload = verifyProfileToken(token)
    if(payload.type !== "profile_creation"){
        errorResponse.message = "Invalid Token"
        return res.status(401).json(errorResponse)
    }
    console.log(payload)
    const userId = payload._id
    const {error, user} = await getUser(userId)
    if(error){
        errorResponse.error = error
        return res.status(401).json(errorResponse)
    }
    if(!user){
        errorResponse.message = "Invalid User Id"
        return res.status(401).json(errorResponse)
    }

    // if(!user.isEmailVerified){
    //     errorResponse.message = "Verify Your Email"
    //     return res.status(400).json(errorResponse)
    // }

    req.user = user
    next()
}

const validateProfile = async (req,res,next) => {
    if(!req.body){
            errorResponse.message = "No request for response"
            return res.status(400).json(errorResponse)
        }
    const {error, value} = profileSchema.validate(req.body, { stripeUnknown: true })
    if(error){
        errorResponse.message = error.details[0].message.replace(/"/g, "")
        errorResponse.error = error
        return res.status(400).json(errorResponse)
    }
    console.log("Profile: ",value)
    req.data = value
    next()
}

const isProfile = async (req,res,next) => {
    const { profileId } = req.params
    if(!profileId){
        errorResponse.message = "Profile Id is Required"
        return res.status(401).json(errorResponse)
    }

    const {profile,error} = await accessProfile(profileId)
    if(error){
        errorResponse.error = error
        return res.status(500).json(errorResponse)
    }
    if(!profile){
        errorResponse.message = "Profile Does Not exists"
        return res.status(400).json(errorResponse)
    }

    req.profile = profile
    next()
}

const validateAccessProfile = async (req,res,next) => {
    const {user,profile} = req

    if( user.role !== USER_ROLE.admin && user.id !== profile.userId ){
        errorResponse.message = "You are not the owner of the profile"
        return res.status(400).json(errorResponse)
    }

    next()
}

module.exports = {
    accessToken,
    validateProfile,
    findUser,
    isProfile,
    validateAccessProfile
}