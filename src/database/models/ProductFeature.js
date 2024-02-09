module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductFeature';
    
    let cols = {
        idProductsFeatures: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        idProductFK: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        idFeatureFK: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        }
    };

    let config = {
        timestamps: false,
        tableName: "products_features",
    };

    const ProductFeature = sequelize.define(alias, cols, config);

    return ProductFeature;
}
