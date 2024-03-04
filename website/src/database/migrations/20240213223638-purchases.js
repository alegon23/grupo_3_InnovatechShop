'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('purchases', {
      idPurchase:{
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      quantityItems:{
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
      },
      totalPrice:{
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
      },
      idUserFK:{
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: "users",
          },
          key: "idUser",
        },
      }

    })
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('purchases');
  }
};
