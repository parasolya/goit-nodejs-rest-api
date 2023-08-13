const Joi = require("joi");

const emailRegexp = require("../constants/user-constants");

const userSignupSchema = Joi.object({    
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
    avatarURL: Joi.string(),
});

const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
});

const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});

module.exports = {
    userSignupSchema,
    userSigninSchema,
    userEmailSchema
}