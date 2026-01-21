const Joi = require("joi")

const showSchema = Joi.object({
    timing: Joi.string().required(),
    price: Joi.string().required(),
    noOfSeats: Joi.number().required(),
    format: Joi.string(),
    seatType: Joi.array().items(Joi.string())
})

const updateShowSchema = Joi.object({  // should not be done -> will be removed later
    timing: Joi.string(),
    price: Joi.string(),
    noOfSeats: Joi.number(),
    format: Joi.string(),
    seatType: Joi.array().items(Joi.string())
})

module.exports = {
    showSchema,
    updateShowSchema
}