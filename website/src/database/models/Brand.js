module.exports = (sequelize, dataTypes) => {
    let alias = 'Brand';
    
    let cols = {
        idBrand: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        brandName: {
            type: dataTypes.STRING(30),
            allowNull: false,
        },
    };

    let config = {
        timestamps: false,
        tableName: "brands",
    };

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = function(models) {
        
        Brand.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'idBrandFK'
        })
    }

    return Brand;
}
