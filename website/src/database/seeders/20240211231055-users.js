'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
       
        firstName: 'Nahuel',
        lastName: 'Banco',
        email: 'nahuel@gmail.com',
        password: '$2a$10$xbm40QXyhfqhbfnhTqjTMu9j6i5qEBCNEKDo3uHyXKu9PpMNuD7Hy',
        birthdate: '2000-07-19',
        avatar: '/images/users/default.png',
        idRoleFK: 2
      },
      {
       
        firstName: 'Alejandra',
        lastName: 'Gonzalez',
        email: 'ale@mail.com',
        password: '$2a$10$fqH.0GEMmXhzfg3XqnefjebG5/C.4a5.Bx..T46vDOj5J2yAoC3ue',
        birthdate: '1995-06-23',
        avatar: '/images/users/default.png',
        idRoleFK: 2
      },
      {
        
        firstName: 'Mirian',
        lastName: 'Baigorria',
        email: 'mirian@gmail.com',
        password: '$2a$10$l0fc3WF3WPbjoR3d.UTjZeqhunMVk.7ivLKfddtZUpfEcxMtGAA4G',
        birthdate: '2000-01-01',
        avatar: '/images/users/default.png',
        idRoleFK: 2
      },
  ];
    await queryInterface.bulkInsert('users', users);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
