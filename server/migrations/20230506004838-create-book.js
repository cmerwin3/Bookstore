'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('book', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      author_lastname: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      author_firstname: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      genre: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      synopsis: {
        type: Sequelize.STRING(5000),
        allowNull: false
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('book');
  }
};