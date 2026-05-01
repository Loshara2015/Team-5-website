const { Product, Category } = require('../models');
const { Op } = require('sequelize');

const apiController = {
    // READ (з фільтрацією та пагінацією)
    getProducts: async (req, res) => {
        try {
            // Пагінація
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            // Фільтрація
            const whereClause = {};
            if (req.query.categoryId) {
                whereClause.categoryId = req.query.categoryId;
            }
            if (req.query.minPrice) {
                whereClause.price = { ...whereClause.price, [Op.gte]: req.query.minPrice };
            }

            // Запит до БД
            const { count, rows } = await Product.findAndCountAll({
                where: whereClause,
                limit: limit,
                offset: offset,
                order: [['id', 'ASC']]
            });

            // Відповідь 200 OK
            res.status(200).json({
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                products: rows
            });
        } catch (error) {
            res.status(500).json({ message: 'Помилка сервера', error: error.message });
        }
    },

    // READ (один товар)
    getProductById: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Товар не знайдено' }); // 404 Not Found
            }
            res.status(200).json(product); // 200 OK
        } catch (error) {
            res.status(500).json({ message: 'Помилка сервера' });
        }
    },

    // CREATE
    createProduct: async (req, res) => {
        try {
            const newProduct = await Product.create(req.body);
            res.status(201).json(newProduct); // 201 Created
        } catch (error) {
            res.status(400).json({ message: 'Невірні дані', error: error.message }); // 400 Bad Request
        }
    },

    // UPDATE
    updateProduct: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Товар не знайдено' }); // 404 Not Found
            }
            
            await product.update(req.body);
            res.status(200).json(product); // 200 OK
        } catch (error) {
            res.status(400).json({ message: 'Невірні дані', error: error.message });
        }
    },

    // DELETE
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Товар не знайдено' }); // 404 Not Found
            }

            await product.destroy();
            res.status(204).send(); // 204 No Content (успішно, але без тіла відповіді)
        } catch (error) {
            res.status(500).json({ message: 'Помилка сервера' });
        }
    }
};

module.exports = apiController;