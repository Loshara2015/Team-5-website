require('dotenv').config();

const fs = require('fs/promises');
const path = require('path');
const sequelize = require('../config/db');
const { Category, Product } = require('../models');

const categoriesPath = path.join(__dirname, '../data/categories.json');
const productsPath = path.join(__dirname, '../data/products.json');

const insertCategoriesInTreeOrder = async (categories, transaction) => {
    const insertedIds = new Set();
    const remaining = [...categories];

    while (remaining.length > 0) {
        const readyCategories = remaining.filter((category) => {
            return category.parentId === null || insertedIds.has(category.parentId);
        });

        if (readyCategories.length === 0) {
            throw new Error('Не вдалося визначити порядок вставки категорій. Перевірте parentId у categories.json.');
        }

        for (const category of readyCategories) {
            await Category.create(
                {
                    id: category.id,
                    name: category.name,
                    parentId: category.parentId
                },
                { transaction }
            );

            insertedIds.add(category.id);
        }

        for (const category of readyCategories) {
            const index = remaining.findIndex((item) => item.id === category.id);
            remaining.splice(index, 1);
        }
    }
};

const seed = async () => {
    try {
        await sequelize.authenticate();

        const [rawCategories, rawProducts] = await Promise.all([
            fs.readFile(categoriesPath, 'utf8'),
            fs.readFile(productsPath, 'utf8')
        ]);

        const categories = JSON.parse(rawCategories);
        const products = JSON.parse(rawProducts);

        await sequelize.transaction(async (transaction) => {
            await sequelize.query(
                'TRUNCATE TABLE products, categories RESTART IDENTITY CASCADE',
                { transaction }
            );

            await insertCategoriesInTreeOrder(categories, transaction);

            await Product.bulkCreate(
                products.map((product) => ({
                    id: product.id,
                    categoryId: product.categoryId,
                    name: product.name,
                    description: product.description,
                    price: Number(product.price),
                    image: product.image
                })),
                {
                    transaction,
                    validate: true
                }
            );

            await sequelize.query(
                `
                SELECT setval(
                    pg_get_serial_sequence('categories', 'id'),
                    COALESCE((SELECT MAX(id) FROM categories), 1),
                    true
                )
                `,
                { transaction }
            );

            await sequelize.query(
                `
                SELECT setval(
                    pg_get_serial_sequence('products', 'id'),
                    COALESCE((SELECT MAX(id) FROM products), 1),
                    true
                )
                `,
                { transaction }
            );
        });

        console.log(
            `Seed completed successfully: ${categories.length} categories and ${products.length} products inserted.`
        );
    } catch (error) {
        console.error('Seed failed:', error.message);
        process.exitCode = 1;
    } finally {
        await sequelize.close();
    }
};

seed();