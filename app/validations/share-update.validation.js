const { validate, Joi } = require('express-validation')

const validationRules = {
    params: Joi.object({
        code: Joi.string().length(3).required().regex(/[A-Z]{3}/)
    }),
    body: Joi.object({
        title: Joi.string(),
        price: Joi.string().required().regex(/^\d+\.\d{0,2}$/),
        quantity: Joi.number().greater(0),
    }),
}

module.exports = validate(validationRules, {}, {})