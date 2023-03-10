'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Books',
      [
        {
          title: 'David Bach : Factor Latte',
          author: 'David Bach',
          image: '/uploads/image 1.png',
          published: new Date(),
          price: 90,
          stock: 100,
          user: 1,
          category: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Selena and Nebula',
          author: 'TERE LVE',
          image: '/uploads/image 2.png',
          published: new Date(),
          price: 90,
          stock: 100,
          user: 1,
          category: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Pelukis Senja',
          author: 'Rudy DOSILA',
          image: '/uploads/image 3.png',
          published: new Date(),
          price: 90,
          stock: 100,
          user: 1,
          category: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Stop the Watch',
          author: 'Miki sintia',
          image: '/uploads/image 4.png',
          published: new Date(),
          price: 90,
          stock: 100,
          user: 1,
          category: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Kamu adalah kamu',
          author: 'Kamu',
          image: '/uploads/image 5.png',
          published: new Date(),
          price: 90,
          stock: 100,
          user: 1,
          category: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Hello Dunia',
          author: 'Anon',
          image: '/uploads/image 6.png',
          published: new Date(),
          price: 90,
          stock: 100,
          user: 1,
          category: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
