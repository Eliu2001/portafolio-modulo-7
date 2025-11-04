require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use('/api/users', usersRouter);
app.use('/api/roles', rolesRouter);
// health
app.get('/', (req, res) => res.json({ message: 'API Usuarios-Roles OK' }));
// Start server after DB connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la DB establecida');
        app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}
`));
    } catch (err) {
        console.error('No fue posible conectar con la base de datos:', err);
        process.exit(1);
    }
})();
