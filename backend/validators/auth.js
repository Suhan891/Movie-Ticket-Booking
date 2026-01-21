const Joi = require("joi")

const signUpSchema = Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
    name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("CUSTOMER","CLIENT").required(),
    clientType: Joi.string().valid("Movie","Theater")
})

const loginSchema = Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string().min(6).required()
})

module.exports = {
    signUpSchema,
    loginSchema
}