const dataRepo = require('../repositories/dataRepository');

// Отримання тільки головних категорій (де parentId === null)
const getRootCategories = async () => {
    try {
        const categories = await dataRepo.getCategoriesPromise();
        return categories.filter(c => c.parentId === null);
    } catch (error) {
        console.error("Помилка в сервісі категорій:", error);
        return [];
    }
};

// Отримання підкатегорій для конкретної категорії
const getSubcategories = async (parentId) => {
    try {
        const categories = await dataRepo.getCategoriesPromise();
        return categories.filter(c => c.parentId === parseInt(parentId));
    } catch (error) {
        console.error("Помилка при отриманні підкатегорій:", error);
        return [];
    }
};

// Отримання категорії за її ID (використовуємо Синхронний метод)
const getCategoryById = (categoryId) => {
    const categories = dataRepo.getCategoriesSync();
    return categories.find(c => c.id === parseInt(categoryId));
};

// Отримання всіх товарів (використовуємо метод Async/Await)
const getAllProducts = async () => {
    try {
        const products = await dataRepo.getProductsAsync();
        return products;
    } catch (error) {
        console.error("Помилка в сервісі товарів:", error);
        return [];
    }
};

// Отримання товарів конкретної категорії (використовуємо метод з Callback, обгорнутий у Promise для зручності)
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

const createProduct = async (productData) => {
    const products = await dataRepo.getProductsAsync();
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        ...productData,
        price: parseInt(productData.price),
        categoryId: parseInt(productData.categoryId) // <--- ДОДАНО ПЕРЕТВОРЕННЯ В ЧИСЛО
    };
    products.push(newProduct);
    await dataRepo.saveProductsAsync(products);
    return newProduct;
};

const deleteProduct = async (productId) => {
    let products = await dataRepo.getProductsAsync();
    products = products.filter(p => p.id !== parseInt(productId));
    return await dataRepo.saveProductsAsync(products);
};

const getAllCategories = async () => {
    try {
        const categories = await dataRepo.getCategoriesPromise();
        return categories;
    } catch (error) {
        console.error("Помилка при отриманні всіх категорій:", error);
        return [];
    }
};

const searchProducts = async (searchQuery) => {
    try {
        if (!searchQuery) return []; // Якщо запит порожній, нічого не шукаємо
        
        const products = await dataRepo.getProductsAsync();
        const lowerQuery = searchQuery.toLowerCase(); // Переводимо запит у нижній регістр для зручності
        
        // Фільтруємо товари, де назва або опис містять текст пошуку
        return products.filter(p => 
            p.name.toLowerCase().includes(lowerQuery) || 
            p.description.toLowerCase().includes(lowerQuery)
        );
    } catch (error) {
        console.error("Помилка при пошуку товарів:", error);
        return [];
    }
};

// Оновлення існуючого товару
const updateProduct = async (productId, updatedData) => {
    const products = await dataRepo.getProductsAsync();
    const index = products.findIndex(p => p.id === parseInt(productId));
    if (index !== -1) {
        products[index] = { 
            ...products[index], 
            ...updatedData,
            price: parseInt(updatedData.price),
            categoryId: parseInt(updatedData.categoryId)
        };
        await dataRepo.saveProductsAsync(products);
    }
};

// Створення категорій
const createCategory = async (categoryData) => {
    const categories = await dataRepo.getCategoriesPromise();
    const newCategory = {
        id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
        name: categoryData.name,
        parentId: categoryData.parentId ? parseInt(categoryData.parentId) : null
    };
    categories.push(newCategory);
    await dataRepo.saveCategoriesAsync(categories);
};

const deleteCategory = async (categoryId) => {
    let categories = await dataRepo.getCategoriesPromise();
    // Видаляємо саму категорію
    categories = categories.filter(c => c.id !== parseInt(categoryId));
    await dataRepo.saveCategoriesAsync(categories);
};

const updateCategory = async (categoryId, updatedData) => {
    try {
        const categories = await dataRepo.getCategoriesPromise();
        const index = categories.findIndex(c => c.id === parseInt(categoryId));
        
        if (index !== -1) {
            categories[index] = { 
                ...categories[index], 
                name: updatedData.name,
                // Якщо parentId порожній (головна категорія), ставимо null, інакше число
                parentId: updatedData.parentId ? parseInt(updatedData.parentId) : null
            };
            await dataRepo.saveCategoriesAsync(categories);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Помилка при оновленні категорії:", error);
        return false;
    }
};

// Експортуємо функції сервісу
module.exports = {
    getRootCategories,
    getSubcategories,
    getCategoryById,
    getAllProducts,
    getProductsByCategory,
    createProduct,
    deleteProduct,
    getAllCategories,
    searchProducts,
    updateProduct,
    createCategory,
    deleteCategory,
    updateCategory
};