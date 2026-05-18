import pool from './database.js';

export default class CursosRepository {
    async getAll() {
        //como la consigna pide un soft delete, filtramos los eliminados

        const query = 'SELECT * FROM cursos WHERE id_curso_estado != 4 ORDER BY id_curso ASC';
        const { rows } = await pool.query(query);
        return rows;
    }
}    