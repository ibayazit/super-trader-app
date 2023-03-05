const { validate, Joi } = require('express-validation')

const validationRules = {
    params: Joi.object({
        code: Joi.string().length(3).required().regex(/[A-Z]{3}/)
    })
}

module.exports = validate(validationRules, {}, {})