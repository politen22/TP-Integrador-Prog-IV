import express from 'express';
import EstudiantesController from '../controllers/estudiantes.controller.js';

const router = express.Router();
const estudiantesController = new EstudiantesController();

router.get('/estudiantes', estudiantesController.getAll.bind(estudiantesController));

export default router;