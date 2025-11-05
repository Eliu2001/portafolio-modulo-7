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
        user.contraseña = await bcrypt.hash(user.contraseña, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed('contraseña')) {
          user.contraseña = await bcrypt.hash(user.contraseña, 10);
        }
      }
    }
  });

  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.contraseña;
    return values;
  };

  return User;
};
