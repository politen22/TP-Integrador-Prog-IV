import express from 'express';
import EstudiantesController from '../controllers/estudiantes.controller.js';
import {transformarDatosEstudiante} from '../transforms/estudiantes.transform.js';
import {validarEstudiante} from '../validators/estudiantes.validator.js';

const router = express.Router();
const estudiantesController = new EstudiantesController();

router.get('/estudiantes', estudiantesController.getAll.bind(estudiantesController));
router.get('/estudiantes/:id', estudiantesController.getById.bind(estudiantesController));
router.post('/estudiantes', transformarDatosEstudiante, validarEstudiante, estudiantesController.create.bind(estudiantesController));
router.put('/estudiantes/:id', transformarDatosEstudiante, validarEstudiante, estudiantesController.update.bind(estudiantesController));
router.delete('/estudiantes/:id', estudiantesController.delete.bind(estudiantesController));

export default router;