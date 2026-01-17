const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TheaterSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        // required: true
    },
    imageUrl:{
        type: String,
        //default: 
    },
    address: {  // Later create a new model for address
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
        // enum:["Kolkata","Mumbai","Bangalore",""]
    },
    pincode:{
        type: Number,
        required: true,
        trim: true
    },
    movies: {
        type: [Schema.Types.ObjectId],
        ref: "Movies"
    }
},{timestamps: true})

const Theater = mongoose.model("Theater",TheaterSchema)
module.exports = Theater