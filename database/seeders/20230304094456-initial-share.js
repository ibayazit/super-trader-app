'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Shares', [
      {
        code: 'FOS',
        title: 'Ford Otomotiv Sanayi',
        price: 588.40,
        quantity: 100000,
      },
      {
        code: 'THY',
        title: 'Turk Hava Yollari',
        price: 138.70,
        quantity: 100000,
      },
      {
        code: 'TUP',
        title: 'Tüpras',
        price: 610.50,
        quantity: 100000,
      },
      {
        code: 'TAV',
        title: 'Tav Havalimanlari Holding',
        price: 75.00,
        quantity: 100000,
      },
      {
        code: 'TTK',
        title: 'Türk Telekom',
        price: 17.45,
        quantity: 100000,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Shares', null, {});
  }
};
