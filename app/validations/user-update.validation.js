const { validate, Joi } = require('express-validation')

const validationRules = {
    params: Joi.object({
        id: Joi.number().required()
    }),
    body: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
    }),
}

module.exports = validate(validationRules, {}, {})