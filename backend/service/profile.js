const Profile = require("../models/profile")
const User = require("../models/user")

const getUser = async (userId) => {
    try {
        const user = await User.findById(userId)
        return {user,error: null}
    } catch (error) {
        return {user: null,error}
    }
}

const accessProfile = async (profileId) => {
    try {
        const profile = await Profile.findById(profileId)
        return {profile, error: null}
    } catch (error) {
        return {profile: null, error}
    }
}

module.exports = {
    getUser,
    accessProfile
}