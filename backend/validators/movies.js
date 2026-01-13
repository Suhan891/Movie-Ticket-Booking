const Joi = require("joi")

const movieSchema = Joi.Object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    cast: Joi.array().items(Joi.string().required()).required().min(1),
    trailerUrl: Joi.string().required(),
    language: Joi.string(),
    director: Joi.string().required(),
    releaseDate: Joi.string().required(),
    releasedStatus: Joi.string()
})

module.exports = movieSchema