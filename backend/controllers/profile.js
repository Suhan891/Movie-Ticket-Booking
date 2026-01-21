const Profile = require("../models/profile")
const User = require("../models/user")

const errorResponse = require("../util/errorResponse")
const successResponse = require("../util/successResponse")

const getProfile = async (req, res) => {
    const {user} = req
    try {
        const data = {
            name: user.name,
            email: user.email,
            clientType: user.clientType,
            isProfileVerified: user.isProfileVerified
        }
        console.log(data)
        successResponse.data = data
        successResponse.message = "Complete Profile Details"
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        errorResponse.message = "Get request error"
        return res.status(500).json(errorResponse)
    }
}

const createProfile = async (req,res) => {
    const { data, user } = req
    const {imageUrl, companyName, companyRole, alternateEmail, websiteUrl, industryType, organizationSize, onboardingStage} = data
    try {
        
        const profile = await Profile.create({
            userId: user._id,
            name: user.name,
            email: user.email,
            imageUrl,
             companyName,
              companyRole,
               alternateEmail,
                websiteUrl,
                 industryType,
                  organizationSize,
                   onboardingStage
        })

        const client = {
            client_role: user.clientType,
            isProfile: true,
            profile: profile._id
        }

        const updatedUser = await User.findByIdAndUpdate(user._id,{isProfileVerified: true, client},{new: true, runValidators: true})
        console.log(updatedUser)
        successResponse.data = await updatedUser.populate("client.profile")
        successResponse.message = "Profile has been created"
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(500).json(errorResponse)
    }
}

const showProfile = async (req,res) => {
    const { profile } = req
    const accessProfile = {
        imageUrl: profile.imageUrl,
        companyName: profile.companyName,
        companyRole: profile.companyRole,
        alternateEmail: profile.alternateEmail,
        websiteUrl: profile.websiteUrl,
        industryType: profile.industryType,
        organizationSize: profile.organizationSize,
        onboardingStage: profile.onboardingStage
    }

    successResponse.data = accessProfile
    successResponse.message = "Profile Found"
    return res.status(200).json(successResponse)
}

const upateProfile = async (req,res) => {
    const {profile, data} = req
    const profileId = profile._id
    try {
        const updatedProfile = Profile.findByIdAndUpdate(profileId, data, { new: true, runValidators: true }) 
        const accessProfile = {
            imageUrl: updatedProfile.imageUrl,
            companyName: updatedProfile.companyName,
            companyRole: updatedProfile.companyRole,
            alternateEmail: updatedProfile.alternateEmail,
            websiteUrl: updatedProfile.websiteUrl,
            industryType: updatedProfile.industryType,
            organizationSize: updatedProfile.organizationSize,
            onboardingStage: updatedProfile.onboardingStage
        }
        successResponse.data = accessProfile
        successResponse.message = "Profile Updated"
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.error = error
        return res.status(500).json(errorResponse)
    }
}

module.exports = {
    getProfile,
    createProfile,
    showProfile,
    upateProfile
}