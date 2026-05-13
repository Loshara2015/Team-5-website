const { Op } = require('sequelize');
const sequelize = require('../config/db');
const { Category, Product } = require('../models');

// Допоміжні функції для збереження старого формату даних, 
// який очікують контролери та сервіси
const mapCategory = (category) => {
    if (!category) return null;
    return {
        id: category.id,
        name: category.name,
        parentId: category.parentId
    };
};

const mapProduct = (product) => {
    if (!product) return null;
    return {
        id: product.id,
        categoryId: product.categoryId,
        name: product.name,
        price: Number(product.price),
        description: product.description,
        image: product.image
    };
};

const getRootCategories = async () => {
    const categories = await Category.findAll({
        where: { parentId: null },
        order: [['id', 'ASC']]
    });
    return categories.map(mapCategory);
};

const getSubcategories = async (parentId) => {
    const categories = await Category.findAll({
        where: { parentId },
        order: [['id', 'ASC']]
    });
    return categories.map(mapCategory);
};

const getAllCategories = async () => {
    const categories = await Category.findAll({
        order: [['id', 'ASC']]
    });
    return categories.map(mapCategory);
};

const getCategoryById = async (categoryId) => {
    const category = await Category.findByPk(categoryId);
    return mapCategory(category);
};

const createCategory = async (categoryData) => {
    return sequelize.transaction(async (t) => {
        const category = await Category.create({
            name: categoryData.name,
            parentId: categoryData.parentId
        }, { transaction: t });
        
        return mapCategory(category);
    });
};

const updateCategory = async (categoryId, categoryData) => {
    return sequelize.transaction(async (t) => {
        const category = await Category.findByPk(categoryId, { transaction: t });
        if (!category) return null;

        await category.update({
            name: categoryData.name,
            parentId: categoryData.parentId
        }, { transaction: t });

        return mapCategory(category);
    });
};

const deleteCategory = async (categoryId) => {
    return sequelize.transaction(async (t) => {
        // Перевіряємо чи є підкатегорії або товари (як у старому коді)
        const childCount = await Category.count({ where: { parentId: categoryId }, transaction: t });
        const productCount = await Product.count({ where: { categoryId: categoryId }, transaction: t });

        if (childCount > 0 || productCount > 0) {
            throw new Error('Category contains subcategories or products.');
        }

        const category = await Category.findByPk(categoryId, { transaction: t });
        if (category) {
            await category.destroy({ transaction: t });
        }
        
        return mapCategory(category);
    });
};

const getAllProducts = async () => {
    const products = await Product.findAll({
        order: [['id', 'ASC']]
    });
    return products.map(mapProduct);
};

const getProductById = async (productId) => {
    const product = await Product.findByPk(productId);
    return mapProduct(product);
};

const getProductsByCategory = async (categoryId) => {
    const products = await Product.findAll({
        where: { categoryId },
        order: [['id', 'ASC']]
    });
    return products.map(mapProduct);
};

const searchProducts = async (searchQuery) => {
    const pattern = `%${searchQuery}%`;
    const products = await Product.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.iLike]: pattern } },
                { description: { [Op.iLike]: pattern } }
            ]
        },
        order: [['id', 'ASC']]
    });
    return products.map(mapProduct);
};

const createProduct = async (productData) => {
    return sequelize.transaction(async (t) => {
        const product = await Product.create({
            categoryId: productData.categoryId,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            image: productData.image
        }, { transaction: t });

        return mapProduct(product);
    });
};

const updateProduct = async (productId, productData) => {
    return sequelize.transaction(async (t) => {
        const product = await Product.findByPk(productId, { transaction: t });
        if (!product) return null;

        await product.update({
            categoryId: productData.categoryId,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            image: productData.image
        }, { transaction: t });

        return mapProduct(product);
    });
};

const deleteProduct = async (productId) => {
    return sequelize.transaction(async (t) => {
        const product = await Product.findByPk(productId, { transaction: t });
        if (product) {
            await product.destroy({ transaction: t });
        }
        return mapProduct(product);
    });
};

// Бізнес-операція для демонстрації транзакції (ROLLBACK)
const createCategoryWithProduct = async (payload) => {
    return sequelize.transaction(async (t) => {
        // Крок 1: Створюємо категорію
        const category = await Category.create({
            name: payload.categoryName,
            parentId: payload.parentId
        }, { transaction: t });

        // Якщо увімкнена симуляція помилки, ставимо ціну -1 (це порушить обмеження моделі)
        const priceToSave = payload.simulateError ? -1 : payload.productPrice;

        // Крок 2: Створюємо товар. Якщо тут буде помилка, категорія теж не збережеться.
        const product = await Product.create({
            categoryId: category.id,
            name: payload.productName,
            description: payload.productDescription,
            price: priceToSave,
            image: payload.productImage
        }, { transaction: t });

        return {
            category: mapCategory(category),
            product: mapProduct(product)
        };
    });
};

module.exports = {
    getRootCategories,
    getSubcategories,
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    createCategoryWithProduct
};