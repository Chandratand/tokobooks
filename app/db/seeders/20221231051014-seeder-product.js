'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Hair clay',
          desc: 'Clay rambut bagus dan kuat',
          price: 100000,
          stock: 100,
          image: '/uploads/image 3.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Vitamin Rambut',
          desc: 'Vitamin untuk rambut tetap sehat',
          price: 120000,
          stock: 50,
          image: '/uploads/image 1.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Hair tonic',
          desc: 'Menyehatkan kulit kepala',
          price: 80000,
          stock: 60,
          image: '/uploads/image 2.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
