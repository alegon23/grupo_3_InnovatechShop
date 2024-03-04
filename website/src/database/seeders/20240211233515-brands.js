'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("brands",[
      {
        brandName:'iPhone'
      },{
        brandName:'Samsung'
      },
      {
        brandName:'Motorola'
      },
      {
        brandName:'TCL'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brands', null, {});
  }
};
