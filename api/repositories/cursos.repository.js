import pool from './database.js';

export default class CursosRepository {
    async getAll() {
        //como la consigna pide un soft delete, filtramos los eliminados
        const query = 'SELECT * FROM cursos WHERE id_curso_estado != 4 ORDER BY id_curso ASC';
        const { rows } = await pool.query(query);
        return rows;
    }

    async create(curso) {
        const query = `
            INSERT INTO cursos (nombre, descripcion, fecha_inicio, cantidad_horas, inscriptos_max, id_curso_estado, id_usuario_modificacion, fecha_hora_modificacion)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
            RETURNING *;
        `;
        
        const values = [
            curso.nombre, 
            curso.descripcion, 
            curso.fechaInicio, 
            curso.cantidadHoras, 
            curso.cantidadInscriptos, 
            1, // id_curso_estado (1 = BORRADOR)
            1  // id_usuario_modificacion
        ];
        
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

}