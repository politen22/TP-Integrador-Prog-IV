import express from 'express';
import cors from 'cors';
import pool from './repositories/database.js';
import cursosRoutes from './routes/cursos.routes.js';
import estudiantesRoutes from './routes/estudiantes.routes.js';

const app = express();
const port = process.env.PORT || 4000;

app.use (cors());
app.use(express.json());

app.use((req,res,next) => {
    console.log(`${new Date().toLocaleTimeString()}] Peticion: ${req.method} ${req.url}`);
    next();
});

app.use('/api', cursosRoutes);
app.use('/api', estudiantesRoutes);

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Ocurrio un error en el servidor'});
});

app.listen(port, () => {
    console.log('Servidor API iniciado en http://localhost:${3000}');
});
