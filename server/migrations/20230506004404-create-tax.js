'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tax', { 
      state:{
        type: Sequelize.STRING(25),
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      percentage: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tax');
  }
};
