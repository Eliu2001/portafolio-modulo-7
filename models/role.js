'use strict';
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, { tableName: 'roles' });
    Role.associate = function (models) {
        // Opción 1: Un role tiene muchos usuarios
        Role.hasMany(models.User, { as: 'usuarios', foreignKey: 'roleId' });
    };
    return Role;
};
