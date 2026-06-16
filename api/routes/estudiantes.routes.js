import express from 'express';
import EstudiantesController from '../controllers/estudiantes.controller.js';
import {transformarDatosEstudiante} from '../transforms/estudiantes.transform.js';
import {validarEstudiante} from '../validators/estudiantes.validator.js';
import {verificarToken} from '../middlewares/auth.middlewares.js';

const router = express.Router();
const estudiantesController = new EstudiantesController();

router.get('/estudiantes', verificarToken, estudiantesController.getAll.bind(estudiantesController));
router.get('/estudiantes/:id', verificarToken, estudiantesController.getById.bind(estudiantesController));
router.post('/estudiantes', verificarToken, transformarDatosEstudiante, validarEstudiante, estudiantesController.create.bind(estudiantesController));
router.put('/estudiantes/:id', verificarToken, transformarDatosEstudiante, validarEstudiante, estudiantesController.update.bind(estudiantesController));
router.delete('/estudiantes/:id', verificarToken, estudiantesController.delete.bind(estudiantesController));

export default router;