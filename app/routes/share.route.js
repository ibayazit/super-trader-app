const express = require('express')
const { getShares, getShare, createShare, updateShare, deleteShare } = require('../controllers/share.controller')

// Validations
const shareCreateValidation = require('../validations/share-create.validation')
const shareUpdateValidation = require('../validations/share-update.validation')
const shareDeleteValidation = require('../validations/share-delete.validation')

const router = express.Router()

router.route('/')
    .get(getShares)
    .post(shareCreateValidation, createShare)

router.route('/:code')
    .get(getShare)
    .patch(shareUpdateValidation, updateShare)
    .delete(shareDeleteValidation, deleteShare)

module.exports = router