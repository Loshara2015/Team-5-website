const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');

// Головна сторінка каталогу
router.get('/', catalogController.renderCatalogPage);

// Адмінські маршрути
router.get('/admin', catalogController.renderAdminPage);
router.post('/admin/products/add', catalogController.handleCreateProduct);

// Використовуємо контролер для видалення
router.post('/admin/products/delete/:id', catalogController.handleDeleteProduct);

// Сторінка конкретної категорії 
router.get('/:id', catalogController.renderCategoryPage);

// Сторінка редагування товару
router.get('/admin/products/edit/:id', catalogController.renderEditProductPage);

// POST запити для товарів
router.post('/admin/products/edit/:id', catalogController.handleUpdateProduct);
router.post('/admin/products/add', catalogController.handleCreateProduct);
router.post('/admin/products/delete/:id', catalogController.handleDeleteProduct);

// POST запити для категорій
router.post('/admin/categories/add', catalogController.handleCreateCategory);
router.post('/admin/categories/delete/:id', catalogController.handleDeleteCategory);

module.exports = router;