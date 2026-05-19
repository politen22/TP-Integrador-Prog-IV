import CursosRepository from '../repositories/cursos.repository.js';
import CursoResponseDTO from '../dtos/cursos.response.dto.js';

export default class CursosService {
    constructor(){
        this.repository = new CursosRepository();
    }

    async getAll(){
        const cursosBD = await this.repository.getAll();
        return cursosBD.map (curso => new CursoResponseDTO(curso));
    }

    async getById(id){
        const cursosBD = await this.repository.getById(id);

        if (!cursosBD) {
            return null;
        }

        return new CursoResponseDTO(cursosBD);
    }

    async create(cursoData){
        const nuevoCursoBD = await this.repository.create(cursoData);
        return new CursoResponseDTO(nuevoCursoBD);
    }

    async update(id, cursoData){
        const cursoActualizadoBD = await this.repository.update(id, cursoData);

        if(!cursoActualizadoBD){
            return null;
        }

        return new CursoResponseDTO(cursoActualizadoBD);
    }

    async delete(id){
        const cursoEliminado = await this.repository.delete(id);
        if(!cursoEliminado) return null;
        return new CursoResponseDTO(cursoEliminado);
    }
}