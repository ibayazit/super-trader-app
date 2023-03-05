const { User, ProcessLog } = require('../../database/models')

const findUserByPk = async (id) => {
    const user = await User.findByPk(id, {
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

    return user
}

const findUsers = async () => {
    const users = await User.findAll({
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

    return users;
}

const newUser = async (body) => {
    const newUser = await User.create({
        firstName, lastName, email
    } = body);

    return newUser
}

const updateUserById = async (id, body) => {
    const updatedCount = await User.update({
        firstName, lastName, email
    } = body, {
        where: {
            id
        }
    });

    return updatedCount
}

const deleteUserById = async (id) => {
    const deletedCount = await User.destroy({ where: { id } });

    return deletedCount
}

module.exports = {
    findUserByPk,
    findUsers,
    newUser,
    updateUserById,
    deleteUserById
}