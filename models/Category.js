const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'parent_id' // Вказуємо точну назву колонки в БД
    }
}, {
    tableName: 'categories',
    timestamps: true, 
    underscored: true 
});

module.exports = Category;