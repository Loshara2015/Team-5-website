const dataRepo = require('../repositories/dataRepository');

// 1. Отримання ТІЛЬКИ головних категорій (де parentId === null)
const getRootCategories = async () => {
    try {
        const categories = await dataRepo.getCategoriesPromise();
        return categories.filter(c => c.parentId === null);
    } catch (error) {
        console.error("Помилка в сервісі категорій:", error);
        return [];
    }
};

// 1.1 Отримання підкатегорій для конкретної категорії
const getSubcategories = async (parentId) => {
    try {
        const categories = await dataRepo.getCategoriesPromise();
        return categories.filter(c => c.parentId === parseInt(parentId));
    } catch (error) {
        console.error("Помилка при отриманні підкатегорій:", error);
        return [];
    }
};

// 2. Отримання категорії за її ID (використовуємо Синхронний метод)
const getCategoryById = (categoryId) => {
    const categories = dataRepo.getCategoriesSync();
    return categories.find(c => c.id === parseInt(categoryId));
};

// 3. Отримання всіх товарів (використовуємо метод Async/Await)
const getAllProducts = async () => {
    try {
        const products = await dataRepo.getProductsAsync();
        return products;
    } catch (error) {
        console.error("Помилка в сервісі товарів:", error);
        return [];
    }
};

// 4. Отримання товарів конкретної категорії (використовуємо метод з Callback, обгорнутий у Promise для зручності)
const getProductsByCategory = (categoryId) => {
    return new Promise((resolve, reject) => {
        dataRepo.getProductsCallback((err, products) => {
            if (err) {
                console.error("Помилка при фільтрації товарів:", err);
                resolve([]); // Повертаємо пустий масив у разі помилки
                return;
            }
            // Фільтруємо товари, залишаючи лише ті, що належать до потрібної категорії
            const filteredProducts = products.filter(p => p.categoryId === parseInt(categoryId));
            resolve(filteredProducts);
        });
    });
};

// Експортуємо функції сервісу
module.exports = {
    getRootCategories,
    getSubcategories,
    getCategoryById,
    getAllProducts,
    getProductsByCategory
};