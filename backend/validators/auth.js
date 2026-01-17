const Joi = require("joi")

const signUpSchema = Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
    name: Joi.string().required(),
    password: Joi.string().min(5).required()
})

module.exports = {
    signUpSchema
}