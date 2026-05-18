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

    async create(cursoData){
        const nuevoCursoBD = await this.repository.create(cursoData);
        return new CursoResponseDTO(nuevoCursoBD);
    }
}