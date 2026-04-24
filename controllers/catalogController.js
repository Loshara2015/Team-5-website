const catalogService = require('../services/catalogService');

const buildAdminRedirect = (status, message) => {
    return `/catalog/admin?status=${encodeURIComponent(status)}&message=${encodeURIComponent(message)}`;
};

const renderCatalogPage = async (req, res) => {
    try {
        const categories = await catalogService.getRootCategories();
        res.render('catalog', { categories });
    } catch (error) {
        console.error('Failed to load catalog page', error);
        res.status(500).send('Помилка сервера при завантаженні каталогу');
    }
};

const renderCategoryPage = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await catalogService.getCategoryById(categoryId);

        if (!category) {
            return res.status(404).send('Категорію не знайдено');
        }

        const subcategories = await catalogService.getSubcategories(categoryId);
        const products = await catalogService.getProductsByCategory(categoryId);

        res.render('category', {
            category,
            subcategories,
            products
        });
    } catch (error) {
        console.error('Failed to load category page', error);
        res.status(500).send('Помилка сервера при завантаженні товарів');
    }
};

const renderAdminPage = async (req, res) => {
    try {
        const products = await catalogService.getAllProducts();
        const categories = await catalogService.getAllCategories();

        res.render('admin/dashboard', {
            products,
            categories,
            message: req.query.message || '',
            status: req.query.status || ''
        });
    } catch (error) {
        console.error('Failed to load admin dashboard', error);
        res.status(500).send('Помилка завантаження адмін-панелі');
    }
};

const handleCreateProduct = async (req, res) => {
    try {
        await catalogService.createProduct(req.body);
        res.redirect(buildAdminRedirect('success', 'Товар успішно створено.'));
    } catch (error) {
        console.error('Failed to create product', error);
        res.redirect(buildAdminRedirect('error', 'Не вдалося створити товар.'));
    }
};

const handleDeleteProduct = async (req, res) => {
    try {
        const deletedProduct = await catalogService.deleteProduct(req.params.id);

        if (!deletedProduct) {
            return res.redirect(buildAdminRedirect('error', 'Товар не знайдено.'));
        }

        res.redirect(buildAdminRedirect('success', 'Товар успішно видалено.'));
    } catch (error) {
        console.error('Failed to delete product', error);
        res.redirect(buildAdminRedirect('error', 'Не вдалося видалити товар.'));
    }
};

const renderEditProductPage = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await catalogService.getProductById(productId);

        if (!product) {
            return res.status(404).send('Товар не знайдено');
        }

        const categories = await catalogService.getAllCategories();

        res.render('admin/edit-product', { product, categories });
    } catch (error) {
        console.error('Failed to load product edit page', error);
        res.status(500).send('Помилка завантаження сторінки редагування');
    }
};

const handleUpdateProduct = async (req, res) => {
    try {
        const updatedProduct = await catalogService.updateProduct(req.params.id, req.body);

        if (!updatedProduct) {
            return res.redirect(buildAdminRedirect('error', 'Товар не знайдено.'));
        }

        res.redirect(buildAdminRedirect('success', 'Товар успішно оновлено.'));
    } catch (error) {
        console.error('Failed to update product', error);
        res.redirect(buildAdminRedirect('error', 'Не вдалося оновити товар.'));
    }
};

const handleCreateCategory = async (req, res) => {
    try {
        await catalogService.createCategory(req.body);
        res.redirect(buildAdminRedirect('success', 'Категорію успішно створено.'));
    } catch (error) {
        console.error('Failed to create category', error);
        res.redirect(buildAdminRedirect('error', 'Не вдалося створити категорію.'));
    }
};

const handleDeleteCategory = async (req, res) => {
    try {
        const deletedCategory = await catalogService.deleteCategory(req.params.id);

        if (!deletedCategory) {
            return res.redirect(buildAdminRedirect('error', 'Категорію не знайдено.'));
        }

        res.redirect(buildAdminRedirect('success', 'Категорію успішно видалено.'));
    } catch (error) {
        console.error('Failed to delete category', error);
        res.redirect(
            buildAdminRedirect(
                'error',
                'Категорія містить підкатегорії або товари. Спочатку приберіть залежні записи.'
            )
        );
    }
};

const renderEditCategoryPage = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categoryToEdit = await catalogService.getCategoryById(categoryId);

        if (!categoryToEdit) {
            return res.status(404).send('Категорію не знайдено');
        }

        const categories = await catalogService.getAllCategories();
        const availableParents = categories.filter((category) => category.id !== Number(categoryId));

        res.render('admin/edit-category', {
            category: categoryToEdit,
            availableParents
        });
    } catch (error) {
        console.error('Failed to load category edit page', error);
        res.status(500).send('Помилка завантаження сторінки редагування категорії');
    }
};

const handleUpdateCategory = async (req, res) => {
    try {
        const updatedCategory = await catalogService.updateCategory(req.params.id, req.body);

        if (!updatedCategory) {
            return res.redirect(buildAdminRedirect('error', 'Категорію не знайдено.'));
        }

        res.redirect(buildAdminRedirect('success', 'Категорію успішно оновлено.'));
    } catch (error) {
        console.error('Failed to update category', error);
        res.redirect(buildAdminRedirect('error', 'Не вдалося оновити категорію.'));
    }
};

const handleCreateCategoryWithProduct = async (req, res) => {
    try {
        await catalogService.createCategoryWithProduct(req.body);

        res.redirect(
            buildAdminRedirect(
                'success',
                'Транзакцію успішно підтверджено: категорію і товар створено.'
            )
        );
    } catch (error) {
        console.error('Failed to execute business operation', error);
        res.redirect(
            buildAdminRedirect(
                'error',
                'Транзакцію скасовано: товар не створено, категорія теж не збережена.'
            )
        );
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
    handleUpdateCategory,
    handleCreateCategoryWithProduct
};