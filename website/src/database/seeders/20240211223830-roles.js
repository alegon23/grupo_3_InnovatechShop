'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const roles = [
      { roleName: 'user' },
      { roleName: 'admin' }
    ];
    
    await queryInterface.bulkInsert('roles', roles);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('roles', null, {});
  }
};
