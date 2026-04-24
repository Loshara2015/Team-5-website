const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');

// Адмінка
router.get('/admin', catalogController.renderAdminPage);

// CRUD для товарів
router.post('/admin/products/add', catalogController.handleCreateProduct);
router.get('/admin/products/edit/:id', catalogController.renderEditProductPage);
router.post('/admin/products/edit/:id', catalogController.handleUpdateProduct);
router.post('/admin/products/delete/:id', catalogController.handleDeleteProduct);

// CRUD для категорій
router.post('/admin/categories/add', catalogController.handleCreateCategory);
router.get('/admin/categories/edit/:id', catalogController.renderEditCategoryPage);
router.post('/admin/categories/edit/:id', catalogController.handleUpdateCategory);
router.post('/admin/categories/delete/:id', catalogController.handleDeleteCategory);

// Бізнес-операція для демонстрації COMMIT / ROLLBACK
router.post('/admin/demo/category-with-product', catalogController.handleCreateCategoryWithProduct);

// Каталог
router.get('/', catalogController.renderCatalogPage);
router.get('/:id', catalogController.renderCategoryPage);

module.exports = router;