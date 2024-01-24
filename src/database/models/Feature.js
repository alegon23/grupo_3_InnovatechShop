module.exports = (sequelize, dataTypes) => {
    let alias = 'Feature';
    
    let cols = {
        idFeature: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        featureTitle: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        featureDescription: {
            type: dataTypes.STRING(100),
            allowNull: false,
        }
    };

    let config = {
        timestamps: false,
        tableName: "features",
    };

    const Feature = sequelize.define(alias, cols, config);

    Feature.associate = function(models) {
        
        //Feature.belongsTo(models.ProductFeature, {
        //    as: 'productFeature',
        //    foreignKey: 'idFeatureFK'
        //});

        Feature.belongsToMany(models.Product, {
            as: 'products',
            through: 'products_features',
            foreignKey: 'idFeatureFK',
            otherKey: 'idProductFK',
            timestamps: false
        });
    }

    return Feature;
}
