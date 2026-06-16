import pool from './database.js';

export default class InscripcionesRepository {
    async getAll(page, limit, search) {
        const offset = (page - 1) * limit;
        const values = [];

        let query = `
            SELECT i.*, c.nombre as curso_nombre, e.nombres as estudiante_nombres, e.apellido as estudiante_apellido, e.documento as estudiante_documento
            FROM inscripciones i
            INNER JOIN cursos c ON i.id_curso = c.id_curso
            INNER JOIN estudiantes e ON i.id_estudiante = e.id_estudiante
            WHERE i.id_inscripcion_estado = 1 
        `;

        if (search) {
            values.push(`%${search}%`);
            query += `AND (c.nombre ILIKE $${values.length} OR e.apellido ILIKE $${values.length} OR e.documento ILIKE $${values.length}) `;
        }

        values.push(limit, offset);
        query += `ORDER BY i.fecha_hora_inscripcion DESC LIMIT $${values.length - 1} OFFSET $${values.length}`;

        const { rows } = await pool.query(query, values);
        return rows;
    }

    async getById(id) {
        const query = `
            SELECT i.*, c.nombre as curso_nombre, e.nombres as estudiante_nombres, e.apellido as estudiante_apellido, e.documento as estudiante_documento
            FROM inscripciones i
            INNER JOIN cursos c ON i.id_curso = c.id_curso
            INNER JOIN estudiantes e ON i.id_estudiante = e.id_estudiante
            WHERE i.id_inscripcion = $1 AND i.id_inscripcion_estado = 1
        `;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    async create(data) {
        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');
            
            const resEst = await client.query('SELECT activo FROM estudiantes WHERE id_estudiante = $1', [data.id_estudiante]);
            if (resEst.rows.length === 0 || resEst.rows[0].activo !== 1) {
                throw new Error("El estudiante no existe o no esta activo en el sistema.");
            }

            const resCur = await client.query('SELECT id_curso_estado, inscriptos_max FROM cursos WHERE id_curso = $1', [data.id_curso]);
            if (resCur.rows.length === 0) {
                throw new Error("El curso no existe.");
            }
            if (resCur.rows[0].id_curso_estado !== 2) {
                throw new Error("El curso seleccionado no tiene inscripciones abiertas.");
            }
            const cupoMax = resCur.rows[0].inscriptos_max;

            const resDup = await client.query(
                'SELECT id_inscripcion FROM inscripciones WHERE id_curso = $1 AND id_estudiante = $2 AND id_inscripcion_estado = 1', 
                [data.id_curso, data.id_estudiante]
            );
            if (resDup.rows.length > 0) {
                throw new Error("El estudiante ya esta inscripto en este curso.");
            }

            const resCap = await client.query('SELECT COUNT(*) as total FROM inscripciones WHERE id_curso = $1 AND id_inscripcion_estado = 1', [data.id_curso]);
            if (parseInt(resCap.rows[0].total) >= cupoMax) {
                throw new Error("El curso ya alcanzo su limite maximo de inscriptos.");
            }

            const insertQuery = `
                INSERT INTO inscripciones (id_curso, id_estudiante, fecha_hora_inscripcion, id_inscripcion_estado, id_usuario_modificacion, fecha_hora_modificacion)
                VALUES ($1, $2, NOW(), 1, 1, NOW())
                RETURNING *;
            `;
            const { rows } = await client.query(insertQuery, [data.id_curso, data.id_estudiante]);

            await client.query('COMMIT');
            return rows[0];

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async delete(id) {
        const query = `
            UPDATE inscripciones
            SET id_inscripcion_estado = 2, fecha_hora_modificacion = NOW()
            WHERE id_inscripcion = $1 AND id_inscripcion_estado = 1
            RETURNING *;
        `;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    async obtenerDetallePorId(id) {
            const query = `
                SELECT i.id_inscripcion as "idInscripcion", 
                    i.fecha_hora_inscripcion as "fechaHoraInscripcion",
                    c.nombre as "cursoNombre", 
                    e.nombres as "estudianteNombres", 
                    e.apellido as "estudianteApellido", 
                    e.documento as "estudianteDocumento"
                FROM inscripciones i
                INNER JOIN cursos c ON i.id_curso = c.id_curso
                INNER JOIN estudiantes e ON i.id_estudiante = e.id_estudiante
                WHERE i.id_inscripcion = $1
            `;
            const { rows } = await pool.query(query, [id]);
            return rows[0];
        }
}