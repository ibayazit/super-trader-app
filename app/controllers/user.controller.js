const responder = require('../../utils/responder')
const { findUserByPk, findUsers, newUser, updateUserById, deleteUserById } = require('../services/user.service')

const getUsers = responder(async (req, res) => {
    const users = await findUsers()

    return {
        data: users
    }
})

const createUser = responder(async (req, res) => {
    const user = await newUser(req.body)

    return {
        data: user,
        status: 201
    }
})

const getUser = responder(async (req, res) => {
    const user = await findUserByPk(req.params.id)

    return {
        data: user,
        status: user ? 200 : 404
    }
})

const updateUser = responder(async (req, res) => {
    const updatedCount = await updateUserById(req.params.id, req.body)

    return {
        message: updatedCount > 0 ? 'User updated' : 'User does not exists',
        status: updatedCount > 0 ? 200 : 404
    }
})

const deleteUser = responder(async (req, res) => {
    const deletedCount = await deleteUserById(req.params.id)

    return {
        message: deletedCount > 0 ? 'User deleted' : 'Record does not exists',
        status: deletedCount > 0 ? 200 : 404
    }
})

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}