const express = require('express')
const { getPortfolio, shareBuy, shareSell } = require('../controllers/trade.controller')

// Validations
const tradeBuyValidation = require('../validations/trade-buy.validation')
const tradeSellValidation = require('../validations/trade-sell.validation')

const router = express.Router()

router.route('/portfolio/:id')
    .get(getPortfolio)

router.route('/buy/:id')
    .post(tradeBuyValidation, shareBuy)

router.route('/sell/:id')
    .post(tradeSellValidation, shareSell)

module.exports = router