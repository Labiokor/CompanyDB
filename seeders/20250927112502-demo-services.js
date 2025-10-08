'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
   await queryInterface.bulkInsert('services', [
    {
      title: 'Web Development',
      description: 'Professional web development services using modern technologies.',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Mobile App Development',
      description: 'High standard mobile app development services',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]); 
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('services', null, {});
  }
};
