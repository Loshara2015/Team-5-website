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

const renderAdminPage = async (req, res) => {
    try {
        const products = await catalogService.getAllProducts();
        const categories = await catalogService.getAllCategories(); 
        res.render('admin/dashboard', { products, categories });
    } catch (error) {
        res.status(500).send('Помилка завантаження адмін-панелі');
    }
};

const handleCreateProduct = async (req, res) => {
    await catalogService.createProduct(req.body);
    res.redirect('/catalog/admin');
};

const handleDeleteProduct = async (req, res) => {
    await catalogService.deleteProduct(req.params.id);
    res.redirect('/catalog/admin');
};

// Відображення сторінки редагування товару
const renderEditProductPage = async (req, res) => {
    try {
        const productId = req.params.id;
        const products = await catalogService.getAllProducts();
        const product = products.find(p => p.id === parseInt(productId));
        
        if (!product) {
            return res.status(404).send('Товар не знайдено');
        }

        const categories = await catalogService.getAllCategories();
        res.render('admin/edit-product', { product, categories });
    } catch (error) {
        res.status(500).send('Помилка завантаження сторінки редагування');
    }
};

// Обробка оновлення товару
const handleUpdateProduct = async (req, res) => {
    try {
        await catalogService.updateProduct(req.params.id, req.body);
        res.redirect('/catalog/admin');
    } catch (error) {
        res.status(500).send('Помилка при оновленні товару');
    }
};

// Створення категорії
const handleCreateCategory = async (req, res) => {
    try {
        await catalogService.createCategory(req.body);
        res.redirect('/catalog/admin');
    } catch (error) {
        res.status(500).send('Помилка при створенні категорії');
    }
};

// Видалення категорії
const handleDeleteCategory = async (req, res) => {
    try {
        await catalogService.deleteCategory(req.params.id);
        res.redirect('/catalog/admin');
    } catch (error) {
        res.status(500).send('Помилка при видаленні категорії');
    }
};

// Відображення сторінки редагування категорії
const renderEditCategoryPage = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categories = await catalogService.getAllCategories();
        
        // Знаходимо категорію, яку хочемо редагувати
        const categoryToEdit = categories.find(c => c.id === parseInt(categoryId));
        
        if (!categoryToEdit) {
            return res.status(404).send('Категорію не знайдено');
        }

        // Передаємо ВСІ категорії у форму (щоб можна було обрати нового "батька"),
        // але виключаємо САМУ СЕБЕ, щоб категорія не могла стати батьком сама собі
        const availableParents = categories.filter(c => c.id !== parseInt(categoryId));

        res.render('admin/edit-category', { 
            category: categoryToEdit, 
            availableParents: availableParents 
        });
    } catch (error) {
        res.status(500).send('Помилка завантаження сторінки редагування категорії');
    }
};

// Обробка збереження змін
const handleUpdateCategory = async (req, res) => {
    try {
        await catalogService.updateCategory(req.params.id, req.body);
        res.redirect('/catalog/admin'); // Повертаємося в адмінку
    } catch (error) {
        res.status(500).send('Помилка при оновленні категорії');
    }
};


module.exports = {
    renderCatalogPage,
    renderCategoryPage,
    renderAdminPage,
    handleCreateProduct,
    handleDeleteProduct,
    renderEditProductPage,
    handleUpdateProduct,
    handleCreateCategory,
    handleDeleteCategory,
    renderEditCategoryPage,
    handleUpdateCategory
};