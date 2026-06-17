import pool from './database.js';

export default class CursosRepository {
    
    async getAll(page, limit, search) {
        const offset = (page - 1) * limit;
        let query = `
            SELECT c.* FROM cursos c
            INNER JOIN cursos_estados ce ON c.id_curso_estado = ce.id_curso_estado
            WHERE ce.es_activo = 1
        `;
        const values = [];

        if (search) {
            values.push(`%${search}%`);
            query += ` AND c.nombre ILIKE $${values.length}`;
        }

        values.push(limit, offset);
        query += ` ORDER BY c.id_curso ASC LIMIT $${values.length - 1} OFFSET $${values.length}`;

        const { rows } = await pool.query(query, values);
        return rows;
    }

    async getById(id) {
        const query = `
            SELECT c.* FROM cursos c
            INNER JOIN cursos_estados ce ON c.id_curso_estado = ce.id_curso_estado
            WHERE c.id_curso = $1 AND ce.es_activo = 1
        `;
        const values = [id];
        const { rows } = await pool.query(query, values);
        return rows[0];
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
            1  // id_usuario_modificacion (hardcodeado por ahora)
        ];
        
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async update(id, curso) {
        const query = `
            UPDATE cursos
            SET nombre = $1, descripcion = $2, fecha_inicio = $3, cantidad_horas = $4, inscriptos_max = $5, id_curso_estado = $6, fecha_hora_modificacion = NOW()
            WHERE id_curso = $7 
            AND id_curso_estado IN (SELECT id_curso_estado FROM cursos_estados WHERE es_activo = 1)
            RETURNING *;
        `;
        
        const values = [
            curso.nombre,
            curso.descripcion,
            curso.fechaInicio,
            curso.cantidadHoras,
            curso.cantidadInscriptos,
            curso.id_curso_estado,
            id
        ];
        
        const { rows } = await pool.query(query, values);
        return rows[0]; 
    }

    async delete(id) {
        const query = `
            UPDATE cursos
            SET id_curso_estado = 4, fecha_hora_modificacion = NOW()
            WHERE id_curso = $1 
            AND id_curso_estado IN (SELECT id_curso_estado FROM cursos_estados WHERE es_activo = 1)
            RETURNING *;
        `;

        const values = [id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}