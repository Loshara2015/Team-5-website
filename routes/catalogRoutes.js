const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');

// Головна сторінка каталогу (наприклад, http://localhost:3000/catalog)
router.get('/', catalogController.renderCatalogPage);

// Сторінка конкретної категорії (наприклад, http://localhost:3000/catalog/3)
router.get('/:id', catalogController.renderCategoryPage);

module.exports = router;