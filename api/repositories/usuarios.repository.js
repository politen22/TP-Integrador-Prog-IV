import pool from './database.js';

export default class UsuariosRepository {
    async buscarPorNombreUsuario(nombreUsuario) {
        const query = 'SELECT * FROM usuarios WHERE nombre_usuario = $1 AND activo = 1';
        const { rows } = await pool.query(query, [nombreUsuario]);
        return rows[0]; 
    }
}