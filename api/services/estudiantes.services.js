import EstudiantesRepository from "../repositories/estudiantes.repository.js";
import EstudianteResponseDTO from "../dtos/estudiantes.response.dto.js";

export default class EstudiantesService {
    constructor() {
        this.repository = new EstudiantesRepository();
    }

    async getAll(page, limit, search) {
        const estudiantesBD = await this.repository.getAll(page, limit, search);
        return estudiantesBD.map(est => new EstudianteResponseDTO(est));
    }

    async getById(id) {
        const estudianteBD = await this.repository.getById(id);
        if (!estudianteBD) return null;
        return new EstudianteResponseDTO(estudianteBD);
    }

    async create(data) {
        const nuevoEstudiante = await this.repository.create(data);
        return new EstudianteResponseDTO(nuevoEstudiante);
    }

    async update(id, data) {
        const estudianteActualizado = await this.repository.update(id, data);
        if (!estudianteActualizado) return null;
        return new EstudianteResponseDTO(estudianteActualizado);
    }

    async delete(id) {
        const estudianteEliminado = await this.repository.delete(id);
        if (!estudianteEliminado) return null;
        return new EstudianteResponseDTO(estudianteEliminado);
    }
}