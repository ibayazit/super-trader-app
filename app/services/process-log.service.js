const { Op } = require("sequelize");
const { ProcessLog, sequelize } = require('../../database/models')

const findUserShares = async (userId, code = null, quantity = null) => {
    let additionalCondition = {}

    if (code) {
        additionalCondition.code = {
            [Op.eq]: code
        }
    }

    if (quantity) {
        additionalCondition.quantity = {
            [Op.gte]: quantity
        }
    }

    const shares = await ProcessLog.findAll({
        where: {
            userId,
            ...additionalCondition
        },
        attributes: [
            "code",
            [sequelize.fn("SUM", sequelize.col("purchasePrice")), "totalPurchasePrice"],
            [sequelize.fn("SUM", sequelize.col("quantity")), "totalQuantity"],
        ],
        group: ["code"]
    })

    return shares
}

const createProcessLog = async (share, user, quantity, process) => {
    const newProcessLog = await ProcessLog.create({
        process,
        code: share.code,
        userId: user.id,
        shareId: share.id,
        purchasePrice: share.price * quantity * (process === 'BUY' ? -1 : 1),
        quantity: quantity * (process === 'BUY' ? 1 : -1)
    });

    return newProcessLog;
}

module.exports = {
    findUserShares,
    createProcessLog
}