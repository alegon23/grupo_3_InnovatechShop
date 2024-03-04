module.exports = (sequelize, dataTypes) => {
    let alias = 'Image';
    
    let cols = {
        idImage: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        url: {
            type: dataTypes.STRING(150),
            allowNull: false,
        },
        mainImage: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
        idProductFK: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        }
    };

    let config = {
        timestamps: false,
        tableName: "images",
    };

    const Image = sequelize.define(alias, cols, config);

    Image.associate = function(models) {
        
        Image.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'idProductFK'
        })
    }

    return Image;
}