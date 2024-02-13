'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const roles = [
      {
        idRole: 1,
        roleName: 'user'
      },
      {
        idRole: 2,
        roleName: 'admin'
      }
  ];
    await queryInterface.bulkInsert('roles', roles);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('roles', null, {});
  }
};
