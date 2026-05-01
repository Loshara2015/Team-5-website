const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST || 'localhost',
        port: Number(process.env.PGPORT || 5432),
        dialect: 'postgres',
        logging: false // Вимикаємо вивід SQL запитів у консоль, щоб не засмічувати її
    }
);

module.exports = sequelize;