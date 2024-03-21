'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories",
      [
        { categoryName:'Celulares' },
        { categoryName:'Monitores & TVs' },
        { categoryName:'Tablets' },
        { categoryName:'Notebooks' },
        { categoryName:'Hardware' },
        { categoryName:'Accesorios' }
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  }
};
