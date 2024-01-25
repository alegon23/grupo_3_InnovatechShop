module.exports = (sequelize, dataTypes) => {
    let alias = 'Role';
    
    let cols = {
        idRole: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        roleName: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
    };

    let config = {
        timestamps: false,
        tableName: "roles",
    };

    const Role = sequelize.define(alias, cols, config);

    Role.associate = function(models) {
        
        Role.hasMany(models.User, {
            as: 'users',
            foreignKey: 'idRoleFK'
        })
    };

    return Role;
}