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

    async create (req, res){
        try{
            const data = req.body;
            if (!data.nombre || !data.descripcion || !data.fechaInicio || !data.cantidadHoras || !data.cantidadInscriptos){
                return res.status(400).json({ error :'Todos los campos son obligatorios'});
            }
            const nuevoCurso = await this.service.create(data);

        } catch (error){
            console.error('Error al crear curso:', error);
            res.status(500).json({error: 'Error interno al crear el curso'});
        }

        }
}


