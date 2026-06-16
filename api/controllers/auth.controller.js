import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import UsuariosRepository from '../repositories/usuarios.repository.js';

export default class AuthController {
    constructor() {
        this.usuariosRepository = new UsuariosRepository();
    }

    async login(req, res) {
        try {
            const { nombre_usuario, contrasenia } = req.body;

            if (!nombre_usuario || !contrasenia) {
                return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
            }

            const usuario = await this.usuariosRepository.buscarPorNombreUsuario(nombre_usuario);
            if (!usuario) {
                return res.status(401).json({ error: 'Credenciales invalidas' });
            }

            const hashRecibido = crypto.createHash('sha256').update(contrasenia).digest('hex');

            if (hashRecibido !== usuario.contrasenia) {
                return res.status(401).json({ error: 'Credenciales invalidas' });
            }

            const token = jwt.sign(
                { idUsuario: usuario.id_usuario, nombreUsuario: usuario.nombre_usuario },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            res.json({ 
                mensaje: 'Login exitoso', 
                token: token 
            });

        } catch (error) {
            console.error('Error en el login:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}