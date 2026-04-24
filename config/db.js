const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT || 5432),
    database: process.env.PGDATABASE
});

pool.on('error', (error) => {
    console.error('Unexpected error on idle PostgreSQL client', error);
});

module.exports = pool;