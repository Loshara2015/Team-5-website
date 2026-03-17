const fs = require('fs');
const path = require('path');

// Абсолютні шляхи до наших файлів з даними
const categoriesPath = path.join(__dirname, '../data/categories.json');
const productsPath = path.join(__dirname, '../data/products.json');

// ==========================================
// 1. Синхронний підхід (Synchronous)
// Блокує потік виконання, поки файл не прочитається.
// ==========================================
const getCategoriesSync = () => {
    try {
        const data = fs.readFileSync(categoriesPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Помилка синхронного читання категорій:', error);
        return [];
    }
};

// ==========================================
// 2. Асинхронний підхід з Callback
// Класичний метод Node.js. Функція приймає callback, який викликається після завершення.
// ==========================================
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

// ==========================================
// 3. Асинхронний підхід з Promise
// Використовує ланцюжки .then() та .catch() для обробки результату або помилки.
// ==========================================
const getCategoriesPromise = () => {
    return fs.promises.readFile(categoriesPath, 'utf8')
        .then(data => JSON.parse(data))
        .catch(error => {
            console.error('Помилка читання категорій (Promise):', error);
            return [];
        });
};

// ==========================================
// 4. Асинхронний підхід з Async/Await
// Найсучасніший та найзручніший спосіб. Код виглядає як синхронний, але не блокує потік.
// ==========================================
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