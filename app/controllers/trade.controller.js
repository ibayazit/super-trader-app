const { sequelize } = require('../../database/models')
const responder = require('../../utils/responder')
const { findUserByPk } = require('../services/user.service')
const { findUserShares, createProcessLog } = require('../services/process-log.service')
const { findShareByCode, decrementShare, incrementShare } = require('../services/share.service')

const getPortfolio = responder(async (req, res) => {
    const user = await findUserByPk(req.params.id)

    if (!user) {
        throw new Error('User not found')
    }

    const shares = await findUserShares(req.params.id)

    return {
        data: { user, shares },
        status: user ? 200 : 400
    }
})

const shareBuy = responder(async (req, res) => {
    const user = await findUserByPk(req.params.id)

    if (!user) {
        throw new Error('User not found')
    }

    const share = await findShareByCode(req.body.code, req.body.quantity)

    if (!share) {
        throw new Error('Shares doesn\'t have enough quentity or not exists')
    }

    const transaction = await sequelize.transaction()

    let newProcessLog = null;
    try {
        await decrementShare(share, req.body.quantity)

        newProcessLog = await createProcessLog(share, user, req.body.quantity, 'BUY')

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw new Error('Something went wrong. Please try later.')
    }

    return {
        data: newProcessLog
    }
})

const shareSell = responder(async (req, res) => {
    const user = await findUserByPk(req.params.id)

    if (!user) {
        throw new Error('User not found')
    }

    const userShares = await findUserShares(req.params.id, req.body.code, req.body.quantity)

    if (!userShares.at(0)) {
        throw new Error('User\'s shares doesn\'t have enough quentity or not exists')
    }

    const share = await findShareByCode(req.body.code)

    if (!share) {
        throw new Error('Shares doesn\'t have enough quentity or not exists')
    }

    const transaction = await sequelize.transaction()

    let newProcessLog = null;
    try {
        await incrementShare(share, req.body.quantity)

        newProcessLog = await createProcessLog(share, user, req.body.quantity, 'SELL')

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw new Error('Something went wrong. Please try later.')
    }

    return {
        data: newProcessLog
    }
})

module.exports = {
    getPortfolio,
    shareBuy,
    shareSell
}