'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Business and Econimics',
          user: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Art and Design',
          user: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Agriculture',
          user: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
