const User = require("../models/user")

const getUser = async (userId) => {
    try {
        const user = await User.findById(userId)
        return {user,error: null}
    } catch (error) {
        return {user: null,error}
    }
}

module.exports = {
    getUser
}