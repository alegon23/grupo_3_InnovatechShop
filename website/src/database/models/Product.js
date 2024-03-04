module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    
    let cols = {
        idProduct: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        productName: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        originalPrice: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        onDiscount: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
        discount: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        mainProduct: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        stock: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        idCategoryFK: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        idBrandFK: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        }
    };

    let config = {
        timestamps: false,
        tableName: "products",
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'idCategoryFK'
        });

        Product.belongsTo(models.Brand, {
            as: 'brand',
            foreignKey: 'idBrandFK',
        });

        Product.hasMany(models.Image, {
            as: 'images',
            foreignKey: 'idProductFK',
        });

        Product.belongsToMany(models.Feature, {
            as: 'features',
            through: 'products_features',
            foreignKey: 'idProductFK',
            otherKey: 'idFeatureFK',
            timestamps: false
        });
    }

    return Product;
}
