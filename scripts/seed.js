require('dotenv').config();

const fs = require('fs/promises');
const path = require('path');
const pool = require('../config/db');

const categoriesPath = path.join(__dirname, '../data/categories.json');
const productsPath = path.join(__dirname, '../data/products.json');

const insertCategoriesInTreeOrder = async (client, categories) => {
    const insertedIds = new Set();
    const remaining = [...categories];

    while (remaining.length > 0) {
        const readyCategories = remaining.filter((category) => {
            return category.parentId === null || insertedIds.has(category.parentId);
        });

        if (readyCategories.length === 0) {
            throw new Error('Unable to resolve category hierarchy while seeding.');
        }

        for (const category of readyCategories) {
            await client.query(
                `
                INSERT INTO categories (id, name, parent_id)
                VALUES ($1, $2, $3)
                `,
                [category.id, category.name, category.parentId]
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
    const client = await pool.connect();

    try {
        const [rawCategories, rawProducts] = await Promise.all([
            fs.readFile(categoriesPath, 'utf8'),
            fs.readFile(productsPath, 'utf8')
        ]);

        const categories = JSON.parse(rawCategories);
        const products = JSON.parse(rawProducts);

        await client.query('BEGIN');

        await client.query('TRUNCATE TABLE products, categories RESTART IDENTITY CASCADE');

        await insertCategoriesInTreeOrder(client, categories);

        for (const product of products) {
            await client.query(
                `
                INSERT INTO products (id, category_id, name, description, price, image)
                VALUES ($1, $2, $3, $4, $5, $6)
                `,
                [
                    product.id,
                    product.categoryId,
                    product.name,
                    product.description,
                    Number(product.price),
                    product.image
                ]
            );
        }

        await client.query(`
            SELECT setval(
                pg_get_serial_sequence('categories', 'id'),
                COALESCE((SELECT MAX(id) FROM categories), 1),
                true
            )
        `);

        await client.query(`
            SELECT setval(
                pg_get_serial_sequence('products', 'id'),
                COALESCE((SELECT MAX(id) FROM products), 1),
                true
            )
        `);

        await client.query('COMMIT');

        console.log(
            `Seed completed successfully: ${categories.length} categories and ${products.length} products inserted.`
        );
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Seed failed', error);
        process.exitCode = 1;
    } finally {
        client.release();
        await pool.end();
    }
};

seed();