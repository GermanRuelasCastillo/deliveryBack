const User = require('../models/user');


module.exports = {
    async getAll(req, res, next) {
        try {
            const data = await User .getAll();
            return res.status(201).json(data);
        } catch (error) {
            console.log(error);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener usuarios'
            });
        }
    },
    async register(req, res, next) {
        try {
            const user = req.body;
            const data = await User.create(user);
            return res.status(201).json({
                success: true,
                error: 'Ninguno',
                message: 'Registro creado correctamente',
                data: data.id
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Registro no se puedo crear',
                error: error["detail"]
            });
        }
    }
};