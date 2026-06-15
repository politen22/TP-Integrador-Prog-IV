import EstudiantesService from "../services/estudiantes.services.js";

export default class EstudiantesController {
    constructor() {
        this.service = new EstudiantesService();
    }

    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';

            const estudiantes = await this.service.getAll(page, limit, search);
            res.json(estudiantes);
        } catch (error) {
            console.error('Error al obtener los estudiantes:', error);
            res.status(500).json({ message: 'Error al obtener los estudiantes' });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const estudiante = await this.service.getById(id);

            if (!estudiante) {
                return res.status(404).json({ error: `No se encontró ningún estudiante con el ID ${id}` });
            }
            res.json(estudiante);
        } catch (error) {
            console.error("Error al obtener el estudiante", error);
            res.status(500).json({ error: "Error interno al mostrar el estudiante" });
        }
    }

    async create(req, res) {
        try {
            const data = req.body;
            const nuevoEstudiante = await this.service.create(data);
            res.status(201).json(nuevoEstudiante);
        } catch (error) {
            console.error('Error al crear estudiante:', error);
            res.status(500).json({ error: 'Error interno al crear el estudiante' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;

            const estudianteActualizado = await this.service.update(id, data);

            if (!estudianteActualizado) {
                return res.status(404).json({ error: `No se encontró ningún estudiante con el ID ${id} para modificar` });
            }
            res.json(estudianteActualizado);
        } catch (error) {
            console.error("Error al modificar el estudiante", error);
            res.status(500).json({ error: "Error al intentar modificar el estudiante" });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const estudianteEliminado = await this.service.delete(id);

            if (!estudianteEliminado) {
                return res.status(404).json({ error: `No se encontró el estudiante con ID ${id} o ya fue eliminado.` });
            }
            res.json({ mensaje: 'Estudiante eliminado con éxito', estudiante: estudianteEliminado });
        } catch (error) {
            console.error('Error al eliminar:', error);
            res.status(500).json({ error: 'Error al intentar eliminar' });
        }
    }
}