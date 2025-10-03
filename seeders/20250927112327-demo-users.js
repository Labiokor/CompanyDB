'use strict';


module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Labiokor',
        email: 'labi@gmail.com',
        password: 'labi1234',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kris',
        email: 'kris@gmail.com',
        password: 'kris1234',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    
  ]);
},

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
