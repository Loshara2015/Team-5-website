const catalogService = require('../services/catalogService');

const renderCatalogPage = async (req, res) => {
    try {
        // Тепер отримуємо ТІЛЬКИ головні категорії замість усіх
        const categories = await catalogService.getRootCategories();
        res.render('catalog', { categories: categories });
    } catch (error) {
        console.error(error);
        res.status(500).send('Помилка сервера при завантаженні каталогу');
    }
};

const renderCategoryPage = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = catalogService.getCategoryById(categoryId);
        
        if (!category) {
            return res.status(404).send('Категорію не знайдено');
        }

        // Отримуємо ПІДКАТЕГОРІЇ для цієї категорії
        const subcategories = await catalogService.getSubcategories(categoryId);
        
        // Отримуємо ТОВАРИ для цієї категорії
        const products = await catalogService.getProductsByCategory(categoryId);
        
        // Віддаємо шаблон, передаючи туди і категорію, і підкатегорії, і товари
        res.render('category', { 
            category: category, 
            subcategories: subcategories,
            products: products 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Помилка сервера при завантаженні товарів');
    }
};

module.exports = {
    renderCatalogPage,
    renderCategoryPage
};