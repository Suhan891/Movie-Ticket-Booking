const mongoose = require("mongoose")
const {Schema} = mongoose

// Only For Clients
const profileSchema = new Schema({
    userId:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
    },
    imageUrl: String,
    companyName: {
        type: String,
        required: true
        },
    companyRole: {
        type: String,
        enum: ["OWNER", "MANAGER", "DISTRIBUTOR"],
        required: true
    },

    alternateEmail: {
        type: String,
        lowercase: true,
        trim: true
    },

    websiteUrl: String,

    industryType: {
        type: String,
        enum: ["CINEMA", "PRODUCTION", "DISTRIBUTION"],
        required: true
    },

    organizationSize: {
        type: String,
        enum: ["SOLO", "SMALL", "MEDIUM", "LARGE"]
    },

    onboardingStage: {
        type: String,
        default: "PROFILE_CREATED"
    }
})

const Profile = mongoose.model("Profile",profileSchema)
module.exports = Profile