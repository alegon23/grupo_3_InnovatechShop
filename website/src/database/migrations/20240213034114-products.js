'use strict';
const { DataTypes } = require("sequelize")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
        idProduct: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        productName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        originalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        onDiscount: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        discount: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        mainProduct: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        idCategoryFK: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        idBrandFK: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
