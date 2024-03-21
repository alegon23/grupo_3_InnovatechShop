module.exports = (sequelize, dataTypes) => {
    let alias = 'Feature';
    
    let cols = {
        idFeature: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        feature: {
            type: dataTypes.STRING(150),
            allowNull: false,
        },
    };

    let config = {
        timestamps: false,
        tableName: "features",
    };

    const Feature = sequelize.define(alias, cols, config);

    Feature.associate = function(models) {
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
