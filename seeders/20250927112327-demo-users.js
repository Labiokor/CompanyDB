'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123"
      }
    ], {});
},

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
