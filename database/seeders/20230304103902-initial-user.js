'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'İbrahim',
        lastName: 'BAYAZİT',
        email: 'ibrbayazit@gmail.com'
      },
      {
        firstName: 'Elon',
        lastName: 'MUSK',
        email: 'elon@spacex.com'
      },
      {
        firstName: 'Uğurcan',
        lastName: 'ERÇAKIR',
        email: 'ugurcan@outlook.com'
      },
      {
        firstName: 'Fatih',
        lastName: 'ŞENTÜRK',
        email: 'fatih@senturkler.com'
      },
      {
        firstName: 'Furkan',
        lastName: 'ERSÖZ',
        email: 'furkan@gmail.com'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
