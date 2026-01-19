const Joi = require("joi")

const bookingSchema = Joi.object({
    timing: Joi.string().required(),
    noOfSeats: Joi.number().required(),
    totalCost: Joi.string().required(),
    status: Joi.string().valid("SUCCESSFULL","CANCELLED","PROCESSING")
})

module.exports = bookingSchema