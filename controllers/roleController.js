const { Role, sequelize } = require('../models');
module.exports = {
    async create(req, res) {
        try {
            const role = await Role.create(req.body);
            return res.status(201).json(role);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },
    async list(req, res) {
        const roles = await Role.findAll({
            include: [{
                association:
                    'usuarios'
            }]
        });
        return res.json(roles);
    },
    async getById(req, res) {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ message: 'Rol no encontrado' });
        return res.json(role);
    },
    async update(req, res) {
        const t = await sequelize.transaction();
        try {
            const role = await Role.findByPk(req.params.id);
            if (!role) {
                await t.rollback();
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            await role.update(req.body, { transaction: t });
            await t.commit();
            return res.json(role);
        } catch (error) {
            await t.rollback();
            return res.status(400).json({ error: error.message });
        }
    },
    async remove(req, res) {
        const t = await sequelize.transaction();
        try {
            const role = await Role.findByPk(req.params.id);
            if (!role) {
                await t.rollback();
                9
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            await role.destroy({ transaction: t });
            await t.commit();
            return res.json({ message: 'Rol eliminado' });
        } catch (error) {
            await t.rollback();
            return res.status(400).json({ error: error.message });
        }
    }
};