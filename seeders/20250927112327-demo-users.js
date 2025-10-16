'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: " Tuser",
        email: "testuser@example.com",
        password: "password3"
      }
    ], {});
},

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
