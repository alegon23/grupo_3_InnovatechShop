module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    
    let cols = {
        idUser: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstName: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        birthdate: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        avatar: {
            type: dataTypes.STRING(150),
            allowNull: false,
        },
        idRoleFK: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
       
    };

    let config = {
        timestamps: false,
        tableName: "users",
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        
        User.belongsTo(models.Role, {
            as: 'role',
            foreignKey: 'idRoleFK'
        });
    };

  
    return User;
   
}