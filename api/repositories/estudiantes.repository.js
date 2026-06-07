import pool from './database.js';

export default class EstudiantesRepository{
    async getAll(){
        const query = 'SELECT * FROM estudiantes ORDER BY id_estudiante ASC';
        const { rows } = await pool.query(query);
        return rows;
    }
}