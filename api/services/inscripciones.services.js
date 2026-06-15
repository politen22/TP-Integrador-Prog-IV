import InscripcionesRepository from "../repositories/inscripciones.repository.js";
import InscripcionResponseDTO from "../dtos/inscripciones.response.dto.js";

export default class InscripcionesService {
    constructor() {
        this.repository = new InscripcionesRepository();
    }

    async getAll(page, limit, search) {
        const inscripcionesBD = await this.repository.getAll(page, limit, search);
        return inscripcionesBD.map(ins => new InscripcionResponseDTO(ins));
    }

    async getById(id) {
        const inscripcionBD = await this.repository.getById(id);
        if (!inscripcionBD) return null;
        return new InscripcionResponseDTO(inscripcionBD);
    }

    async create(data) {
        const nuevaInscripcion = await this.repository.create(data);
        return new InscripcionResponseDTO(nuevaInscripcion);
    }

    async delete(id) {
        const inscripcionEliminada = await this.repository.delete(id);
        if (!inscripcionEliminada) return null;
        return new InscripcionResponseDTO(inscripcionEliminada);
    }
}