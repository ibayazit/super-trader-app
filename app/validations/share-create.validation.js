const { validate, Joi } = require('express-validation')

const validationRules = {
    body: Joi.object({
        code: Joi.string().length(3).required().regex(/[A-Z]{3}/),
        title: Joi.string().required(),
        price: Joi.string().required().regex(/^\d+\.\d{0,2}$/),
        quantity: Joi.number().greater(0),
    }),
}

module.exports = validate(validationRules, {}, {})