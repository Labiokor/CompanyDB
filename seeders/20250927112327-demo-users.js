'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: " User",
        email: "testuser@1example.com",
        password: "password53"
      }
    ], {});
},

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
