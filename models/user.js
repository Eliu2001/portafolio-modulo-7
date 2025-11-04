'use strict';

const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'users',
        hooks: {
            beforeCreate: async (user) => {
                const hash = await bcrypt.hash(user.contraseña, 10);
                user.contraseña = hash;
            },
            beforeUpdate: async (user) => {
                if (user.changed('contraseña')) {
                    const hash = await bcrypt.hash(user.contraseña, 10);
                    user.contraseña = hash;
                }
            }
        }
    });
    User.associate = function (models) {

        User.belongsTo(models.Role, { as: 'rol', foreignKey: 'roleId' });
};
User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.contraseña;
    return values;
};
return User;
};
