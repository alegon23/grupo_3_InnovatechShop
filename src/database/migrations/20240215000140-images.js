'use strict';
const { DataTypes } = require("sequelize")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('images', {
      idImage: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    mainImage: {
        type: DataTypes.BOOLEAN,
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
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('images');
  }
};