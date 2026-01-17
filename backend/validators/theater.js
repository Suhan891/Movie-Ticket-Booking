const Joi = require("joi")

const theaterSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string(),
    city: Joi.string().required(),
    pincode: Joi.number().required(),
    address: Joi.string().required(),
    movies: Joi.array().items(Joi.string())
})

const movieIdSchema = Joi.object({
    movieIds: Joi.array().items(Joi.string().required()).required()
})

module.exports = {
    theaterSchema,
    movieIdSchema
}





