'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
   await queryInterface.bulkInsert('blogs', [
    {
      title: 'Lorem',
      content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, est?',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Lorem',
      content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, est?',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]); 
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('blogs', null, {});
  }
};
