import InscripcionesService from "../services/inscripciones.services.js";

export default class InscripcionesController {
    constructor() {
        this.service = new InscripcionesService();
    }

    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';

            const inscripciones = await this.service.getAll(page, limit, search);
            res.json(inscripciones);
        } catch (error) {
            console.error('Error al obtener inscripciones:', error);
            res.status(500).json({ message: 'Error al obtener inscripciones' });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const inscripcion = await this.service.getById(id);

            if (!inscripcion) {
                return res.status(404).json({error: `No se encontro la inscripcion con el ID ${id}`});
            }
            res.json(inscripcion);
        } catch (error) {
            console.error("Error al obtener inscripcion", error);
            res.status(500).json({error: "Error interno"});
        }
    }

    async create(req, res) {
        try {
            const data = req.body;
            if (!data.id_curso || !data.id_estudiante) {
                return res.status(400).json({error: "El id_curso y el id_estudiante son obligatorios."});
            }

            const nuevaInscripcion = await this.service.create(data);
            res.status(201).json(nuevaInscripcion);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const inscripcionEliminada = await this.service.delete(id);

            if (!inscripcionEliminada) {
                return res.status(404).json({error: `No se encontro la inscripcion ${id} o ya está cancelada.`});
            }
            res.json({mensaje: 'Inscripcion cancelada con exito', inscripcion: inscripcionEliminada});
        } catch (error) {
            console.error('Error al cancelar:', error);
            res.status(500).json({error: 'Error al intentar cancelar la inscripcion'});
        }
    }
}