import pool from './database.js';

export default class UsuariosRepository {
    async buscarPorNombreUsuario(nombreUsuario) {
        const query = 'SELECT * FROM usuarios WHERE nombre_usuario = $1 AND activo = 1';
        const { rows } = await pool.query(query, [nombreUsuario]);
        return rows[0]; 
    }

    async crearUsuario(nombres, apellido, nombreUsuario, hashContrasenia) {
        const query = `
            INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, activo) 
            VALUES ($1, $2, $3, $4, 1) 
            RETURNING id_usuario, nombre_usuario;
        `;
        const { rows } = await pool.query(query, [nombres, apellido, nombreUsuario, hashContrasenia]);
        return rows[0];
    }
}