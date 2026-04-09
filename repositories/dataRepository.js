const fs = require('fs');
const path = require('path');

// Абсолютні шляхи до наших файлів з даними
const categoriesPath = path.join(__dirname, '../data/categories.json');
const productsPath = path.join(__dirname, '../data/products.json');

// Синхронний підхід
// Блокує потік виконання, поки файл не прочитається.
const getCategoriesSync = () => {
    try {
        const data = fs.readFileSync(categoriesPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Помилка синхронного читання категорій:', error);
        return [];
    }
};

// Асинхронний підхід з Callback
// Функція приймає callback, який викликається після завершення.
const getProductsCallback = (callback) => {
    fs.readFile(productsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Помилка читання товарів (callback):', err);
            callback(err, null);
            return;
        }
        callback(null, JSON.parse(data));
    });
};

// Асинхронний підхід з Promise
// Ланцюжки .then() та .catch() для обробки результату або помилки.
const getCategoriesPromise = () => {
    return fs.promises.readFile(categoriesPath, 'utf8')
        .then(data => JSON.parse(data))
        .catch(error => {
            console.error('Помилка читання категорій (Promise):', error);
            return [];
        });
};

// Асинхронний підхід з Async/Await
const getProductsAsync = async () => {
    try {
        const data = await fs.promises.readFile(productsPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Помилка читання товарів (async/await):', error);
        return [];
    }
};

// Експортуємо всі методи, щоб їх могли використовувати сервіси
module.exports = {
    getCategoriesSync,
    getProductsCallback,
    getCategoriesPromise,
    getProductsAsync
};