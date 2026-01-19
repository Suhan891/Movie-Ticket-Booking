const User = require("../models/user")
const errorResponse = require("../util/errorResponse")

const findUser = async (email) => {
    let error = {}
    try {
        const user = await User.findOne({email})
        if(user){
            error.message = "Email already exists"
            if(!user.isEmailVerified){
                error.message = "Verify your email from Inbox"
            }
            return {err: error,user}
        }
        return {err: null,user: null}
    } catch (errors) {
        error.errors = errors
        return {err: error,user: null}
    }
}

module.exports = {
    findUser
}