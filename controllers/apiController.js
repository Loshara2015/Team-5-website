const { Product, Category } = require('../models');
const { Op } = require('sequelize');

class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

const sendError = (res, error) => {
    if (error instanceof ApiError) {
        return res.status(error.status).json({ message: error.message });
    }

    if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeForeignKeyConstraintError'
    ) {
        return res.status(400).json({
            message: 'Невірні дані',
            error: error.message
        });
    }

    console.error('API error:', error);
    return res.status(500).json({ message: 'Помилка сервера' });
};

const parsePositiveInteger = (value, fieldName, defaultValue = null) => {
    if (value === undefined || value === null || value === '') {
        return defaultValue;
    }

    const numberValue = Number(value);

    if (!Number.isInteger(numberValue) || numberValue < 1) {
        throw new ApiError(400, `${fieldName} має бути додатним цілим числом.`);
    }

    return numberValue;
};

const parseNonNegativeNumber = (value, fieldName, defaultValue = null) => {
    if (value === undefined || value === null || value === '') {
        return defaultValue;
    }

    const numberValue = Number(value);

    if (!Number.isFinite(numberValue) || numberValue < 0) {
        throw new ApiError(400, `${fieldName} має бути невід’ємним числом.`);
    }

    return numberValue;
};

const toRequiredText = (value, fieldName) => {
    const text = String(value ?? '').trim();

    if (!text) {
        throw new ApiError(400, `${fieldName} є обов’язковим полем.`);
    }

    return text;
};

const normalizeProductPayload = (body) => {
    return {
        categoryId: parsePositiveInteger(body.categoryId, 'categoryId'),
        name: toRequiredText(body.name, 'name'),
        description: toRequiredText(body.description, 'description'),
        price: parseNonNegativeNumber(body.price, 'price'),
        image: toRequiredText(body.image, 'image')
    };
};

const ensureCategoryExists = async (categoryId) => {
    const category = await Category.findByPk(categoryId);

    if (!category) {
        throw new ApiError(400, 'Категорію для товару не знайдено.');
    }
};

const apiController = {
    // READ: список товарів з фільтрацією та пагінацією
    getProducts: async (req, res) => {
        try {
            const page = parsePositiveInteger(req.query.page, 'page', 1);
            const limit = parsePositiveInteger(req.query.limit, 'limit', 10);

            if (limit > 100) {
                throw new ApiError(400, 'limit не має перевищувати 100.');
            }

            const offset = (page - 1) * limit;
            const whereClause = {};

            const categoryId = parsePositiveInteger(req.query.categoryId, 'categoryId', null);
            if (categoryId !== null) {
                whereClause.categoryId = categoryId;
            }

            const minPrice = parseNonNegativeNumber(req.query.minPrice, 'minPrice', null);
            if (minPrice !== null) {
                whereClause.price = {
                    ...whereClause.price,
                    [Op.gte]: minPrice
                };
            }

            const query = String(req.query.q ?? '').trim();
            if (query) {
                whereClause[Op.or] = [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { description: { [Op.iLike]: `%${query}%` } }
                ];
            }

            const { count, rows } = await Product.findAndCountAll({
                where: whereClause,
                limit,
                offset,
                order: [['id', 'ASC']]
            });

            return res.status(200).json({
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                itemsPerPage: limit,
                products: rows
            });
        } catch (error) {
            return sendError(res, error);
        }
    },

    // READ: один товар за id
    getProductById: async (req, res) => {
        try {
            const productId = parsePositiveInteger(req.params.id, 'id');
            const product = await Product.findByPk(productId);

            if (!product) {
                throw new ApiError(404, 'Товар не знайдено.');
            }

            return res.status(200).json(product);
        } catch (error) {
            return sendError(res, error);
        }
    },

    // CREATE: створення товару
    createProduct: async (req, res) => {
        try {
            const productData = normalizeProductPayload(req.body);
            await ensureCategoryExists(productData.categoryId);

            const newProduct = await Product.create(productData);

            return res.status(201).json(newProduct);
        } catch (error) {
            return sendError(res, error);
        }
    },

    // UPDATE: оновлення товару
    updateProduct: async (req, res) => {
        try {
            const productId = parsePositiveInteger(req.params.id, 'id');
            const product = await Product.findByPk(productId);

            if (!product) {
                throw new ApiError(404, 'Товар не знайдено.');
            }

            const productData = normalizeProductPayload(req.body);
            await ensureCategoryExists(productData.categoryId);

            await product.update(productData);

            return res.status(200).json(product);
        } catch (error) {
            return sendError(res, error);
        }
    },

    // DELETE: видалення товару
    deleteProduct: async (req, res) => {
        try {
            const productId = parsePositiveInteger(req.params.id, 'id');
            const product = await Product.findByPk(productId);

            if (!product) {
                throw new ApiError(404, 'Товар не знайдено.');
            }

            await product.destroy();

            return res.status(204).send();
        } catch (error) {
            return sendError(res, error);
        }
    }
};

module.exports = apiController;