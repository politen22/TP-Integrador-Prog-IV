import CursosService from '../services/cursos.services.js';

export default class CursosController{
    constructor(){
        this.service = new CursosService();
    }


    async getAll(req, res){
        try {
            const cursos = await this.service.getAll();
            res.json(cursos);
        } catch (error){
            console.error('Error al obtener los cursos', error);
            res.status(500).json({ message: 'Error al obtener los cursos' });
        }
    }
}
