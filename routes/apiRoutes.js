const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Ендпоінти для Товарів
router.get('/products', apiController.getProducts);
router.get('/products/:id', apiController.getProductById);
router.post('/products', apiController.createProduct);
router.put('/products/:id', apiController.updateProduct); // Або PATCH
router.delete('/products/:id', apiController.deleteProduct);

module.exports = router;