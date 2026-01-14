const Joi = require("joi")

const movieSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    casts: Joi.array().items(Joi.string().required()).required().min(1),
    trailerUrl: Joi.string().required(),
    language: Joi.string(),
    director: Joi.string().required(),
    releaseDate: Joi.date().iso().required(),
    releasedStatus: Joi.string()
})



module.exports = {
    movieSchema
}