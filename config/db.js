const { Sequelize } = require('sequelize');
require('dotenv').config();

const baseOptions = {
    dialect: 'postgres',
    logging: false
};

const sslOptions =
    process.env.DB_SSL === 'true'
        ? {
              dialectOptions: {
                  ssl: {
                      require: true,
                      rejectUnauthorized: false
                  }
              }
          }
        : {};

let sequelize;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        ...baseOptions,
        ...sslOptions
    });
} else {
    sequelize = new Sequelize(
        process.env.PGDATABASE,
        process.env.PGUSER,
        process.env.PGPASSWORD,
        {
            ...baseOptions,
            host: process.env.PGHOST || 'localhost',
            port: Number(process.env.PGPORT || 5432),
            ...sslOptions
        }
    );
}

module.exports = sequelize;