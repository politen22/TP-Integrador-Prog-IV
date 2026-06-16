import express from 'express';
import CursosController from '../controllers/cursos.controller.js';
import {transformarDatosCurso} from '../transforms/cursos.transform.js';
import {validarCurso} from '../validators/cursos.validator.js';
import {verificarToken} from '../middlewares/auth.middlewares.js';


const router = express.Router();
const cursosController = new CursosController();

router.get('/cursos', verificarToken, cursosController.getAll.bind(cursosController));
router.get('/cursos/:id', verificarToken, cursosController.getById.bind(cursosController));
router.post('/cursos', verificarToken, transformarDatosCurso, validarCurso, cursosController.create.bind(cursosController));
router.put('/cursos/:id', verificarToken, transformarDatosCurso, validarCurso, cursosController.update.bind(cursosController));
router.delete('/cursos/:id', verificarToken, cursosController.delete.bind(cursosController));

export default router;