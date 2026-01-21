const Joi = require("joi")

const profileSchema = Joi.object({
    imageUrl: Joi.string(),
    companyName: Joi.string().required(),
    companyRole: Joi.string().valid("OWNER", "MANAGER", "DISTRIBUTOR").required(),
    alternateEmail: Joi.string().email().trim().lowercase(),
    websiteUrl: Joi.string(),
    industryType: Joi.string().valid("CINEMA", "PRODUCTION", "DISTRIBUTION").required(),
    organizationSize: Joi.string().valid("SOLO", "SMALL", "MEDIUM", "LARGE"),
    onboardingStage: Joi.string()
})

const updateProfileSchema = Joi.object({
    imageUrl: Joi.string(),
    companyName: Joi.string(),
    companyRole: Joi.string().valid("OWNER", "MANAGER", "DISTRIBUTOR"),
    alternateEmail: Joi.string().email().trim().lowercase(),
    websiteUrl: Joi.string(),
    industryType: Joi.string().valid("CINEMA", "PRODUCTION", "DISTRIBUTION"),
    organizationSize: Joi.string().valid("SOLO", "SMALL", "MEDIUM", "LARGE"),
    onboardingStage: Joi.string()
})

module.exports = {
    profileSchema,
    updateProfileSchema
}