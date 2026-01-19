const mongoose = require("mongoose")
const { PAYMENT_STATUS } = require("../util/constants")
const { Schema } = mongoose

const paymentSchema = new Schema({
    bookingId: {
        type:String,
        type: Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum:{
            values: [PAYMENT_STATUS.pending,PAYMENT_STATUS.success,PAYMENT_STATUS.failed],
            message: ""
        },
        default: PAYMENT_STATUS.pending
    }
},{timeStamps: true})

const Payment = mongoose.model("Payment",paymentSchema)
module.exports = Payment