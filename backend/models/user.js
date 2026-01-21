const mongoose = require("mongoose")


const clientSchema = new mongoose.Schema({
  client_role: {
    type: String,
      enum: ["Movie","Theater"],
      default: null,
      required: function () {
        return this.role === "CLIENT"
      }
  },
  isProfile: {
    type: Boolean,
    default: false
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  }
}, { _id: false })

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
        enum: ["CUSTOMER","CLIENT","ADMIN"], // Changed from user and admin
        default: "CUSTOMER" // from user
    },
    clientType: {
      type: String,
      enum: ["Movie","Theater"],
      default: null,
      required: function () {
        return this.role === "CLIENT"
      }
    },

    isProfileVerified: {
    type: Boolean,
    default: false
    },
    client: {
      type: clientSchema,
      
    },

    status: {
      type: String,
      enum: ["APPROVED","PENDING","REJECTED"],
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    // Will Be Made another schema to validate user for 24hrs before email verification
    name: {
        type: String
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: {
      type: String,
      select: false,
      default: undefined,
    },

    phone: {
      type: String, // Later be changed to Number
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

userSchema.pre("save",function(next){
  if(this.isNew){ // Only while creating user
    if(this.role === "CUSTOMER") // Customers are always approved to use
      this.status = "APPROVED"
  }
})

const User = mongoose.model("User",userSchema)
module.exports = User;