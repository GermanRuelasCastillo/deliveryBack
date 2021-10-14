const User = require('../models/user');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

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
    },
    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const myuser = await User.findByEmail(email);
            if(!myuser){
                return res.status(401).json({
                    success: false,
                    message: 'El usuario no fue encontrado',
                    error: 'El usuario no fue encontrado'
                }); 
            }
            if(User.isPasswordMatched(password,myuser.password) == true){
                const token = jwt.sign({id:myuser.id,email:myuser.email},keys.secretOrKey,{
                    expiresIn: (60*60*24) //1hora
                });
                const data = {
                    id:myuser.id,
                    name:myuser.name,
                    lastname:myuser.lastname,
                    email:myuser.email,
                    phone:myuser.phone,
                    image:myuser.image,
                    session_token: `JWT ${token}`
                };
                return res.status(201).json({
                    success:true,
                    data: data,
                    error: ''
                });
            }else{
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta',
                    error: 'La contraseña es incorrecta'
                }); 
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error al momento de hacer login',
                error: error["detail"]
            }); 
        }
    }
};