const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');

// Головна сторінка каталогу
router.get('/', catalogController.renderCatalogPage);

// Сторінка конкретної категорії
router.get('/:id', catalogController.renderCategoryPage);

module.exports = router;