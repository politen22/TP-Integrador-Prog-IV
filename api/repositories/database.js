import pg from 'pg';

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.on('connect', () => {
    console.log('Conectado a la base de datos PostgreSQL 🐘');
});

pool.on('error', (err) => {
    console.error('Error fatal en la base de datos', err);
});

export default pool;