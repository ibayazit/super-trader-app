const { Op } = require("sequelize");
const { Share, ProcessLog } = require('../../database/models')
const responder = require('../../utils/responder')
const { findShareByCode, findShares, newShare, updateShareByCode, deleteShareByCode } = require('../services/share.service')

const getShares = responder(async (req, res) => {
    const shares = await findShares()

    return {
        data: shares
    }
})

const createShare = responder(async (req, res) => {
    const share = await newShare(req.body)

    return {
        data: share,
        status: 201
    }
})

const getShare = responder(async (req, res) => {
    const share = await findShareByCode(req.params.code)

    return {
        data: share,
        status: share ? 200 : 404
    }
})

const updateShare = responder(async (req, res) => {
    const updatedCount = await updateShareByCode(req.params.code, req.body)

    return {
        message: updatedCount > 0 ? 'Share updated' : 'Record updated within 1 hour or does not exists',
        status: updatedCount > 0 ? 200 : 400
    }
})

const deleteShare = responder(async (req, res) => {
    const deletedCount = await deleteShareByCode(req.params.code)

    return {
        message: deletedCount > 0 ? 'Share deleted' : 'Record does not exists',
        status: deletedCount > 0 ? 200 : 404
    }
})

module.exports = {
    getShares,
    getShare,
    createShare,
    updateShare,
    deleteShare
}