'use strict';
const { DataTypes } = require("sequelize")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchases_products', {
      idPurchasesProducts: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idPurchaseFK: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: "purchases",
          },
          key: "idPurchase",
        },
    },
    idProductFK: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: "products",
          },
          key: "idProduct",
        },
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('purchases_products');
  }
};


