import EstudiantesService from "../services/estudiantes.services.js";

export default class EstudiantesController{
    constructor(){
        this.service = new EstudiantesService();
    }

    async getAll(req, res){
        try{
            const estudiantes = await this.service.getAll();
            res.json(estudiantes);
        } catch (error) {
            console.error('Error al obtener los estudiantes:', error);
            res.status(500).json({message: 'Error al obtener los estudiantes'});
        }
    }
}