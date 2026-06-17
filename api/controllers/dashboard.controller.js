import DashboardService from '../services/dashboard.services.js';

export default class DashboardController {
    constructor() {
        this.service = new DashboardService();
    }

    async getDashboard(req, res) {
        try {
            const datos = await this.service.obtenerEstadisticas();
            res.json(datos);
        } catch (error) {
            console.error('Error cargando dashboard:', error);
            res.status(500).json({ error: 'No se pudieron cargar las estadisticas.' });
        }
    }
}