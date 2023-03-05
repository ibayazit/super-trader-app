'use strict';

const { Share, User } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rows = []
    const shares = await Share.findAll()
    const users = await User.findAll()

    await users.forEach(async (user) => {
      const share = shares[Math.floor(Math.random() * shares.length)]
      const buyQuantity = Math.floor(Math.random() * 100) + 1

      rows.push({
        process: 'BUY',
        code: share.code,
        userId: user.id,
        shareId: share.id,
        purchasePrice: share.price * buyQuantity * -1,
        quantity: buyQuantity,
      })

      await share.decrement('quantity', {by: rows.at(-1).quantity})
    })

    await queryInterface.bulkInsert('ProcessLogs', rows, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProcessLogs', null, {});
  }
};
