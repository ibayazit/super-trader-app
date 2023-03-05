const { validate, Joi } = require('express-validation')

const validationRules = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
    }),
}

module.exports = validate(validationRules, {}, {})