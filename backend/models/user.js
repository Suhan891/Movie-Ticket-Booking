const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["user","admin"],
        default: "user"
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    name: {
        type: String
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: {
      type: String,
      default: undefined,
    },

    phone: {
      type: String,
      trim: true
    },
    phoneVerified: {
      type: Boolean,
      default: false
    },
    verificationDeferred: { // Based on user's choice on selecting "Later"
      type: Boolean,
      default: true
    },

    tokenVersion: {
      type: Number,
      default: 0,
    },
    authProvider:{
      type: String,
      enum: ["website","google"],
      default: "website"
    }, 
    resetPasswordToken: {
      type: String,
      default: undefined,
    },
    resetPasswordExpires: {
      type: Date,
      default: undefined,
    },
},{
    timestamps: true
})

const User = mongoose.model("User",userSchema)
module.exports = User;