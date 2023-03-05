const { validate, Joi } = require('express-validation')

const validationRules = {
    params: Joi.object({
        id: Joi.number().required()
    }),
    body: Joi.object({
        code: Joi.string().length(3).required().regex(/[A-Z]{3}/),
        quantity: Joi.number().greater(0),
    }),
}

module.exports = validate(validationRules, {}, {})