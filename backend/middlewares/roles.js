const { USER_ROLE, STATUS_CODES, CLIENT_ROLE } = require("../util/constants")
const errorResponse = require("../util/errorResponse")

const validateAdminOrClient = (req,res,next) => {
    const user = req.user
    if(user.role != USER_ROLE.admin || (user.role != USER_ROLE.client  )) { // Also checking of CLIENT_ROLE -> Later
        errorResponse.message = "You Are Not Authorized with such a role"
        return res.status(STATUS_CODES.FORBIDDEN).json(errorResponse)
    } 
    next()
}

const validateAdminOrMovie = (req,res,next) => {
    const user = req.user
    if(user.role != USER_ROLE.admin || (user.role != USER_ROLE.client && user.clientType != CLIENT_ROLE.movie  )) { // Also checking of CLIENT_ROLE -> Later
        errorResponse.message = "You Are Not Authorized with such a role"
        return res.status(STATUS_CODES.FORBIDDEN).json(errorResponse)
    } 
    next()
}

const validateAdminOrTheater = (req,res,next) => {
    const user = req.user
    if(user.role != USER_ROLE.admin || (user.role != USER_ROLE.client && user.clientType != CLIENT_ROLE.theater  )) { // Also checking of CLIENT_ROLE -> Later
        errorResponse.message = "You Are Not Authorized with such a role"
        return res.status(STATUS_CODES.FORBIDDEN).json(errorResponse)
    } 
    next()
}

const validateCustomer = (req,res,next) => {
    const user = req.user
    console.log(user)
    const allowedRoles = [USER_ROLE.admin, USER_ROLE.customer]
    if(!allowedRoles.includes(user.role)) {
        errorResponse.message = "You Are Not Authorized with such a role"
        return res.status(STATUS_CODES.FORBIDDEN).json(errorResponse)
    } // Also checking of CLIENT_ROLE
    next()
}

module.exports = {
    validateAdminOrClient,
    validateCustomer,
    validateAdminOrMovie,
    validateAdminOrTheater
}