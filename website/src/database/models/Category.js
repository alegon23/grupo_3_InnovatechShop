module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    
    let cols = {
        idCategory: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        categoryName: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
    };

    let config = {
        timestamps: false,
        tableName: "categories",
    };

    const Category = sequelize.define(alias, cols, config);
    
    Category.associate = function(models) {
        
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'idCategoryFK'
        })
    }

    return Category;
}
