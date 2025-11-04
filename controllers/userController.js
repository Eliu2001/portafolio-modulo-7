const { User, Role, sequelize } = require('../models');
module.exports = {
    async create(req, res) {
        const t = await sequelize.transaction();
        try {
            const { nombre, correo, contraseña, roleId } = req.body;
            const user = await User.create({ nombre, correo, contraseña, roleId },
                { transaction: t });
            await t.commit();
            return res.status(201).json(user);
        } catch (error) {
            await t.rollback();
            return res.status(400).json({ error: error.message });
        }
    },
    async list(req, res) {
        const users = await User.findAll({
            include: [{
                model: Role, as:
                    'rol'
            }]
        });
        return res.json(users);
    },
    async getById(req, res) {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            include: [{
                model: Role, as:
                    'rol'
            }]
        });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        return res.json(user);
    },
    async update(req, res) {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { nombre, correo, contraseña, roleId } = req.body;
            const user = await User.findByPk(id);
            if (!user) {
                await t.rollback();
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            await user.update({ nombre, correo, contraseña, roleId }, {
                transaction: t
            });
            await t.commit();
            return res.json(user);
        } catch (error) {
            await t.rollback();
            return res.status(400).json({ error: error.message });
        }
    },
    async remove(req, res) {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                await t.rollback();
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            // await user.setRoles([], { transaction: t });
            await user.destroy({ transaction: t });
            await t.commit();
            return res.json({ message: 'Usuario eliminado' });
        } catch (error) {
            await t.rollback();
            return res.status(400).json({ error: error.message });
        }
    }
};