    import DashboardRepository from '../repositories/dashboard.repository.js';

    export default class DashboardService {
        constructor() {
            this.repository = new DashboardRepository();
        }

        async obtenerEstadisticas() {
            return await this.repository.obtenerEstadisticas();
        }
    }