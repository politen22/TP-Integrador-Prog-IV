import pool from './database.js';

export default class DashboardRepository {
    async obtenerEstadisticas() {
        const queryEstudiantes = 'SELECT COUNT(*) as total FROM estudiantes WHERE activo = 1';
        const queryCursos = 'SELECT COUNT(*) as total FROM cursos WHERE id_curso_estado IN (1, 2)';
        
        const queryAbiertos = 'SELECT id_curso, nombre, descripcion FROM cursos WHERE id_curso_estado = 2 ORDER BY fecha_inicio DESC';
        const queryCerrados = 'SELECT id_curso, nombre, descripcion FROM cursos WHERE id_curso_estado IN (3, 4) ORDER BY fecha_inicio DESC';

        const [resEstudiantes, resCursos, resAbiertos, resCerrados] = await Promise.all([
            pool.query(queryEstudiantes),
            pool.query(queryCursos),
            pool.query(queryAbiertos),
            pool.query(queryCerrados)
        ]);

        return {
            totalEstudiantes: parseInt(resEstudiantes.rows[0].total),
            totalCursos: parseInt(resCursos.rows[0].total),
            cursosActivos: resAbiertos.rows,
            cursosCerrados: resCerrados.rows
        };
    }
}