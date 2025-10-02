'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Ecomerce website',
        description: 'A high-quality e-commerce website template suitable for online stores.',
        price: '99.99',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mobile App',
        description: 'A sleek and modern mobile application template for iOS and Android platforms.',
        price: '79.99',
        createdAt: new Date(),
        updatedAt: new Date()
      } 
  ]);  
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
