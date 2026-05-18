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

    async getById(req, res){
        try{
            const id = req.params.id;
            const curso = await this.service.getById(id);

            if(!curso){
                return res.status(404).json({error: `No se encontro ningun curso con ese ID ${id}`});
            }
            
            res.json(curso);
        } catch (error) {
            console.error("Error al obtener el curso", error);
            res.status(500).json({error: "Error interno al mostra el curso"});
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

    async update(req, res){
        try {
            const id = req.params.id;
            const data = req.body;

            if (!data.nombre || !data.descripcion || !data.fechaInicio || !data.cantidadHoras || !data.cantidadInscriptos) {
                return res.status(400).json({error: 'Todos los campos son obligatorios para modificar el curso'});
        }

        const cursoActualizado = await this.service.update(id, data);

        if(!cursoActualizado){
            return res.status(404).json({error: `No se encontro ningun curso con el ID ${id} para modificar`});
        }
        res.json(cursoActualizado);
    } catch(error) {
        console.error("Error al modificar el curso", error);
        res.status(500).json({error: "Error al intento de modificar el curso"});
    }
}
}

