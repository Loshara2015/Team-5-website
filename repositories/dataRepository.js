const pool = require('../config/db');

const mapCategory = (row) => ({
    id: row.id,
    name: row.name,
    parentId: row.parent_id
});

const mapProduct = (row) => ({
    id: row.id,
    categoryId: row.category_id,
    name: row.name,
    price: Number(row.price),
    description: row.description,
    image: row.image
});

const withTransaction = async (callback) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const getRootCategories = async () => {
    const { rows } = await pool.query(
        `
        SELECT id, name, parent_id
        FROM categories
        WHERE parent_id IS NULL
        ORDER BY id
        `
    );

    return rows.map(mapCategory);
};

const getSubcategories = async (parentId) => {
    const { rows } = await pool.query(
        `
        SELECT id, name, parent_id
        FROM categories
        WHERE parent_id = $1
        ORDER BY id
        `,
        [parentId]
    );

    return rows.map(mapCategory);
};

const getAllCategories = async () => {
    const { rows } = await pool.query(
        `
        SELECT id, name, parent_id
        FROM categories
        ORDER BY id
        `
    );

    return rows.map(mapCategory);
};

const getCategoryById = async (categoryId) => {
    const { rows } = await pool.query(
        `
        SELECT id, name, parent_id
        FROM categories
        WHERE id = $1
        `,
        [categoryId]
    );

    return rows[0] ? mapCategory(rows[0]) : null;
};

const createCategory = async (categoryData) => {
    return withTransaction(async (client) => {
        const { rows } = await client.query(
            `
            INSERT INTO categories (name, parent_id)
            VALUES ($1, $2)
            RETURNING id, name, parent_id
            `,
            [categoryData.name, categoryData.parentId]
        );

        return mapCategory(rows[0]);
    });
};

const updateCategory = async (categoryId, categoryData) => {
    return withTransaction(async (client) => {
        const { rows } = await client.query(
            `
            UPDATE categories
            SET name = $1,
                parent_id = $2,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING id, name, parent_id
            `,
            [categoryData.name, categoryData.parentId, categoryId]
        );

        return rows[0] ? mapCategory(rows[0]) : null;
    });
};

const deleteCategory = async (categoryId) => {
    return withTransaction(async (client) => {
        const childCategoriesResult = await client.query(
            `
            SELECT COUNT(*)::int AS count
            FROM categories
            WHERE parent_id = $1
            `,
            [categoryId]
        );

        const productsResult = await client.query(
            `
            SELECT COUNT(*)::int AS count
            FROM products
            WHERE category_id = $1
            `,
            [categoryId]
        );

        if (childCategoriesResult.rows[0].count > 0 || productsResult.rows[0].count > 0) {
            throw new Error('Category contains subcategories or products.');
        }

        const { rows } = await client.query(
            `
            DELETE FROM categories
            WHERE id = $1
            RETURNING id, name, parent_id
            `,
            [categoryId]
        );

        return rows[0] ? mapCategory(rows[0]) : null;
    });
};

const getAllProducts = async () => {
    const { rows } = await pool.query(
        `
        SELECT id, category_id, name, description, price, image
        FROM products
        ORDER BY id
        `
    );

    return rows.map(mapProduct);
};

const getProductById = async (productId) => {
    const { rows } = await pool.query(
        `
        SELECT id, category_id, name, description, price, image
        FROM products
        WHERE id = $1
        `,
        [productId]
    );

    return rows[0] ? mapProduct(rows[0]) : null;
};

const getProductsByCategory = async (categoryId) => {
    const { rows } = await pool.query(
        `
        SELECT id, category_id, name, description, price, image
        FROM products
        WHERE category_id = $1
        ORDER BY id
        `,
        [categoryId]
    );

    return rows.map(mapProduct);
};

const searchProducts = async (searchQuery) => {
    const pattern = `%${searchQuery}%`;

    const { rows } = await pool.query(
        `
        SELECT id, category_id, name, description, price, image
        FROM products
        WHERE name ILIKE $1 OR description ILIKE $1
        ORDER BY id
        `,
        [pattern]
    );

    return rows.map(mapProduct);
};

const createProduct = async (productData) => {
    return withTransaction(async (client) => {
        const { rows } = await client.query(
            `
            INSERT INTO products (category_id, name, description, price, image)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, category_id, name, description, price, image
            `,
            [
                productData.categoryId,
                productData.name,
                productData.description,
                productData.price,
                productData.image
            ]
        );

        return mapProduct(rows[0]);
    });
};

const updateProduct = async (productId, productData) => {
    return withTransaction(async (client) => {
        const { rows } = await client.query(
            `
            UPDATE products
            SET category_id = $1,
                name = $2,
                description = $3,
                price = $4,
                image = $5,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $6
            RETURNING id, category_id, name, description, price, image
            `,
            [
                productData.categoryId,
                productData.name,
                productData.description,
                productData.price,
                productData.image,
                productId
            ]
        );

        return rows[0] ? mapProduct(rows[0]) : null;
    });
};

const deleteProduct = async (productId) => {
    return withTransaction(async (client) => {
        const { rows } = await client.query(
            `
            DELETE FROM products
            WHERE id = $1
            RETURNING id, category_id, name, description, price, image
            `,
            [productId]
        );

        return rows[0] ? mapProduct(rows[0]) : null;
    });
};

const createCategoryWithProduct = async (payload) => {
    return withTransaction(async (client) => {
        const categoryResult = await client.query(
            `
            INSERT INTO categories (name, parent_id)
            VALUES ($1, $2)
            RETURNING id, name, parent_id
            `,
            [payload.categoryName, payload.parentId]
        );

        const category = mapCategory(categoryResult.rows[0]);
        const priceToSave = payload.simulateError ? -1 : payload.productPrice;

        const productResult = await client.query(
            `
            INSERT INTO products (category_id, name, description, price, image)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, category_id, name, description, price, image
            `,
            [
                category.id,
                payload.productName,
                payload.productDescription,
                priceToSave,
                payload.productImage
            ]
        );

        return {
            category,
            product: mapProduct(productResult.rows[0])
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