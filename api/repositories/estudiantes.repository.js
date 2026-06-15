import pool from './database.js';

export default class EstudiantesRepository {
    async getAll(page, limit, search) {
        const offset = (page - 1) * limit;
        
        let query = 'SELECT * FROM estudiantes WHERE activo = 1';
        const values = [];

        if (search) {
            values.push(`%${search}%`);
            query += ` AND (nombres ILIKE $${values.length} OR apellido ILIKE $${values.length} OR documento ILIKE $${values.length})`;
        }

        values.push(limit, offset);
        query += ` ORDER BY id_estudiante ASC LIMIT $${values.length - 1} OFFSET $${values.length}`;

        const { rows } = await pool.query(query, values);
        return rows;
    }

    async getById(id) {
        const query = 'SELECT * FROM estudiantes WHERE id_estudiante = $1 AND activo = 1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    async create(estudiante) {
        const query = `
            INSERT INTO estudiantes (documento, apellido, nombres, email, fecha_nacimiento, activo, id_usuario_modificacion, fecha_hora_modificacion)
            VALUES ($1, $2, $3, $4, $5, 1, 1, NOW())
            RETURNING *;
        `;
        const values = [
            estudiante.documento,
            estudiante.apellido,
            estudiante.nombres,
            estudiante.email,
            estudiante.fecha_nacimiento,
        ];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async update(id, estudiante) {
        const query = `
            UPDATE estudiantes
            SET documento = $1, apellido = $2, nombres = $3, email = $4, fecha_nacimiento = $5, fecha_hora_modificacion = NOW()
            WHERE id_estudiante = $6 AND activo = 1
            RETURNING *;
        `;
        const values = [
            estudiante.documento,
            estudiante.apellido,
            estudiante.nombres,
            estudiante.email,
            estudiante.fecha_nacimiento,
            id
        ];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async delete(id) {
        const query = `
            UPDATE estudiantes
            SET activo = 0, fecha_hora_modificacion = NOW()
            WHERE id_estudiante = $1 AND activo = 1
            RETURNING *;
        `;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}