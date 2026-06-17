import express from 'express';
import DashboardController from '../controllers/dashboard.controller.js';
import {verificarToken} from '../middlewares/auth.middlewares.js';

const router = express.Router();
const dashboardController = new DashboardController();

router.get('/dashboard', verificarToken, dashboardController.getDashboard.bind(dashboardController));

export default router;