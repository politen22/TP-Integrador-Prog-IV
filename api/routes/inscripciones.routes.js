import express from 'express';
import InscripcionesController from '../controllers/inscripciones.controller.js';

const router = express.Router();
const inscripcionesController = new InscripcionesController();

router.get('/inscripciones', inscripcionesController.getAll.bind(inscripcionesController));
router.get('/inscripciones/:id', inscripcionesController.getById.bind(inscripcionesController));
router.post('/inscripciones', inscripcionesController.create.bind(inscripcionesController));
router.delete('/inscripciones/:id', inscripcionesController.delete.bind(inscripcionesController));

export default router;