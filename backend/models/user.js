const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
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
    },
    role: {
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
    tokenVersion: {
      type: Number,
      default: 0,
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