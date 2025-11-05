require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());

// Rutas
app.use('/api/users', usersRouter);
app.use('/api/roles', rolesRouter);

// Ruta de prueba
app.get('/', (req, res) => res.json({ message: 'API Usuarios-Roles OK' }));

// Conexión y sincronización con la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida.');

    // 🔹 Sincroniza los modelos con la DB
    await sequelize.sync({ alter: true }); 
    // Usa { force: true } si quieres borrar y recrear tablas desde cero
    console.log('🗄️  Modelos sincronizados con la base de datos.');

    app.listen(PORT, () =>
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    process.exit(1);
  }
})();
