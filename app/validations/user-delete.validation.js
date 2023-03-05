const { validate, Joi } = require('express-validation')

const validationRules = {
    params: Joi.object({
        id: Joi.number().required()
    })
}

module.exports = validate(validationRules, {}, {})