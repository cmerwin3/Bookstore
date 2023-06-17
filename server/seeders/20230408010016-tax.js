'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tax', [{ 
        state: 'LA',
        percentage: 0.10
      },{
        state: 'TX',
        percentage: 0.08
      },{
        state: 'AL',
        percentage: 0.07
      },{
        state: 'MS',
        percentage: 0.08
      },{
        state: 'FL',
        percentage: 0.09
      }
    ])
  },

  async down (queryInterface, Sequelize) {
  }
};
