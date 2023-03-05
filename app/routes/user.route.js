const express = require('express')
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/user.controller')

// Validations
const userCreateValidation = require('../validations/user-create.validation')
const userUpdateValidation = require('../validations/user-update.validation')
const userDeleteValidation = require('../validations/user-delete.validation')

const router = express.Router()

router.route('/')
    .get(getUsers)
    .post(userCreateValidation, createUser)

router.route('/:id')
    .get(getUser)
    .patch(userUpdateValidation, updateUser)
    .delete(userDeleteValidation, deleteUser)

module.exports = router