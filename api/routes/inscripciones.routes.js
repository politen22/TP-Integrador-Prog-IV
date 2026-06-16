import express from 'express';
import InscripcionesController from '../controllers/inscripciones.controller.js';
import {verificarToken} from '../middlewares/auth.middlewares.js';

const router = express.Router();
const inscripcionesController = new InscripcionesController();

router.get('/inscripciones', verificarToken, inscripcionesController.getAll.bind(inscripcionesController));
router.get('/inscripciones/:id', verificarToken, inscripcionesController.getById.bind(inscripcionesController));
router.post('/inscripciones', verificarToken, inscripcionesController.create.bind(inscripcionesController));
router.delete('/inscripciones/:id', verificarToken, inscripcionesController.delete.bind(inscripcionesController));

export default router;