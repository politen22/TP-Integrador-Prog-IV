import express from 'express';
import CursosController from '../controllers/cursos.controller.js';

const router = express.Router();
const cursosController = new CursosController();

router.get('/cursos', cursosController.getAll.bind(cursosController));
router.post('/cursos', cursosController.create.bind(cursosController));

export default router;