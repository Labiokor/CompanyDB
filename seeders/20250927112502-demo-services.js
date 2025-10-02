'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
   await queryInterface.bulkInsert('services', [
    {
      title: 'Web Development',
      description: 'Professional web development services using modern technologies.',
      price: 1500.00,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Mobile App Development',
      description: 'High standard mobile app development services',
      price: 800.00,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]); 
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('services', null, {});
  }
};
