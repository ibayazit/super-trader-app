const { Op } = require("sequelize");
const { Share, ProcessLog } = require('../../database/models')

const findShareByCode = async (code, quantity = null) => {
    let additionalCondition = {}

    if (quantity) {
        additionalCondition.quantity = {
            [Op.gte]: quantity
        }
    }

    const share = await Share.findOne({
        where: {
            code: code,
            ...additionalCondition
        }
    })

    return share
}

const decrementShare = async (share, quantity) => {
    await share.decrement('quantity', { by: quantity })
}

const incrementShare = async (share, quantity) => {
    await share.increment('quantity', { by: quantity })
}

const findShares = async () => {
    const shares = await Share.findAll({
        include: [
            {
                model: ProcessLog,
                limit: 10,
                attributes: [
                    'process',
                    'code',
                    'purchasePrice',
                    'quantity'
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            }
        ]
    })

    return shares
}

const newShare = async (body) => {
    const share = await Share.create({
        code, title, price, quantity
    } = body);

    return share
}

const updateShareByCode = async (code, body) => {
    const date = new Date();
    date.setHours(date.getHours() - 1);

    const updatedCount = await Share.update({ title, price, quantity } = body, {
        where: {
            code,
            updatedAt: {
                [Op.lte]: date
            }
        }
    });

    return updatedCount
}

const deleteShareByCode = async (code) => {
    const deletedCount = await Share.destroy({ where: { code } });

    return deletedCount
}

module.exports = {
    findShareByCode,
    decrementShare,
    incrementShare,
    findShares,
    newShare,
    updateShareByCode,
    deleteShareByCode
}