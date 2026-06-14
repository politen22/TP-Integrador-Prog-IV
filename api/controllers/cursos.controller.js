import CursosService from '../services/cursos.services.js';

export default class CursosController{
    constructor(){
        this.service = new CursosService();
    }

    async getAll(req, res){
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';
            const cursos = await this.service.getAll(page, limit, search);
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
            const nuevoCurso = await this.service.create(data);            
            res.status(201).json(nuevoCurso); 
        } catch (error){
            console.error('Error al crear curso:', error);
            res.status(500).json({error: 'Error interno al crear el curso'});
        }
    }

   async update(req, res){
        try {
            const id = req.params.id;
            const data = req.body;
            const cursoActualizado = await this.service.update(id, data);

            if(!cursoActualizado){
                return res.status(404).json({error: `No se encontró ningun curso con el ID ${id} para modificar`});
            }
            res.json(cursoActualizado);
        } catch(error) {
            console.error("Error al modificar el curso", error);
            res.status(500).json({error: "Error al intentar modificar el curso"});
        }
    }

    async delete (req, res){
        try{
            const id = req.params.id;
            const cursoEliminado = await this.service.delete(id);

            if(!cursoEliminado){
                return res.status(404).json({error: `No se encontro el curso con ID ${id} o ya fue eliminado.`});
            }
            
            res.json({mensaje: 'Curso eliminado con exito', curso: cursoEliminado});
        }   
            catch (error) {
                console.error('Error al eliminar:', error);
                res.status(500).json({error:'Error al intentar elminar'});
            }
    }

}

