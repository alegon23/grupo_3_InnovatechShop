'use strict';
const { DataTypes } = require("sequelize")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products_features', {
      idProductsFeatures: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
    },
    idFeatureFK: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: "features",
          },
          key: "idFeature",
        },
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products_features');
  }
};

