'use strict';
const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.js')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

// 1️⃣ Importar los modelos manualmente
db.Role = require('./role')(sequelize, Sequelize.DataTypes);
db.User = require('./user')(sequelize, Sequelize.DataTypes);

// 2️⃣ Definir las asociaciones después de que ambos estén cargados
db.Role.hasMany(db.User, { as: 'usuarios', foreignKey: 'roleId' });
db.User.belongsTo(db.Role, { as: 'rol', foreignKey: 'roleId' });

// 3️⃣ Exportar
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
