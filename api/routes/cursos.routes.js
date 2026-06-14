import express from 'express';
import CursosController from '../controllers/cursos.controller.js';
import {transformarDatosCurso} from '../transforms/cursos.transform.js';
import {validarCurso} from '../validators/cursos.validator.js';

const router = express.Router();
const cursosController = new CursosController();

router.get('/cursos', cursosController.getAll.bind(cursosController));
router.get('/cursos/:id', cursosController.getById.bind(cursosController));
router.post('/cursos', transformarDatosCurso, validarCurso, cursosController.create.bind(cursosController));
router.put('/cursos/:id', transformarDatosCurso, validarCurso, cursosController.update.bind(cursosController));
router.delete('/cursos/:id', cursosController.delete.bind(cursosController));

export default router;