import EstudiantesRepository from "../repositories/estudiantes.repository.js";

export default class EstudaintesService{
    constructor(){
        this.repository = new EstudiantesRepository();
    }

    async getAll(){
        return await this.repository.getAll();
    }
}