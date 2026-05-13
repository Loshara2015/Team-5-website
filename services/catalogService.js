const dataRepo = require('../repositories/dataRepository');

const toRequiredText = (value, fieldName) => {
    const normalizedValue = String(value ?? '').trim();

    if (!normalizedValue) {
        throw new Error(`${fieldName} is required.`);
    }

    return normalizedValue;
};

const toRequiredInteger = (value, fieldName) => {
    const normalizedValue = Number(value);

    if (!Number.isInteger(normalizedValue)) {
        throw new Error(`${fieldName} must be an integer.`);
    }

    return normalizedValue;
};

const toNullableInteger = (value, fieldName) => {
    if (value === undefined || value === null || value === '') {
        return null;
    }

    const normalizedValue = Number(value);

    if (!Number.isInteger(normalizedValue)) {
        throw new Error(`${fieldName} must be an integer.`);
    }

    return normalizedValue;
};

const toNonNegativeNumber = (value, fieldName) => {
    const normalizedValue = Number(value);

    if (!Number.isFinite(normalizedValue) || normalizedValue < 0) {
        throw new Error(`${fieldName} must be a non-negative number.`);
    }

    return normalizedValue;
};

const getRootCategories = async () => {
    return dataRepo.getRootCategories();
};

const getSubcategories = async (parentId) => {
    return dataRepo.getSubcategories(toRequiredInteger(parentId, 'Parent category id'));
};

const getAllCategories = async () => {
    return dataRepo.getAllCategories();
};

const getCategoryById = async (categoryId) => {
    return dataRepo.getCategoryById(toRequiredInteger(categoryId, 'Category id'));
};

const createCategory = async (categoryData) => {
    return dataRepo.createCategory({
        name: toRequiredText(categoryData.name, 'Category name'),
        parentId: toNullableInteger(categoryData.parentId, 'Parent category id')
    });
};

const updateCategory = async (categoryId, categoryData) => {
    const normalizedCategoryId = toRequiredInteger(categoryId, 'Category id');
    const normalizedParentId = toNullableInteger(categoryData.parentId, 'Parent category id');

    if (normalizedParentId === normalizedCategoryId) {
        throw new Error('Category cannot be parent of itself.');
    }

    return dataRepo.updateCategory(normalizedCategoryId, {
        name: toRequiredText(categoryData.name, 'Category name'),
        parentId: normalizedParentId
    });
};

const deleteCategory = async (categoryId) => {
    return dataRepo.deleteCategory(toRequiredInteger(categoryId, 'Category id'));
};

const getAllProducts = async () => {
    return dataRepo.getAllProducts();
};

const getProductById = async (productId) => {
    return dataRepo.getProductById(toRequiredInteger(productId, 'Product id'));
};

const getProductsByCategory = async (categoryId) => {
    return dataRepo.getProductsByCategory(toRequiredInteger(categoryId, 'Category id'));
};

const searchProducts = async (searchQuery) => {
    const normalizedQuery = String(searchQuery ?? '').trim();

    if (!normalizedQuery) {
        return [];
    }

    return dataRepo.searchProducts(normalizedQuery);
};

const createProduct = async (productData) => {
    return dataRepo.createProduct({
        categoryId: toRequiredInteger(productData.categoryId, 'Category id'),
        name: toRequiredText(productData.name, 'Product name'),
        description: toRequiredText(productData.description, 'Product description'),
        price: toNonNegativeNumber(productData.price, 'Product price'),
        image: toRequiredText(productData.image, 'Product image')
    });
};

const updateProduct = async (productId, productData) => {
    return dataRepo.updateProduct(toRequiredInteger(productId, 'Product id'), {
        categoryId: toRequiredInteger(productData.categoryId, 'Category id'),
        name: toRequiredText(productData.name, 'Product name'),
        description: toRequiredText(productData.description, 'Product description'),
        price: toNonNegativeNumber(productData.price, 'Product price'),
        image: toRequiredText(productData.image, 'Product image')
    });
};

const deleteProduct = async (productId) => {
    return dataRepo.deleteProduct(toRequiredInteger(productId, 'Product id'));
};

const createCategoryWithProduct = async (payload) => {
    return dataRepo.createCategoryWithProduct({
        categoryName: toRequiredText(payload.categoryName, 'Category name'),
        parentId: toNullableInteger(payload.parentId, 'Parent category id'),
        productName: toRequiredText(payload.productName, 'Product name'),
        productDescription: toRequiredText(payload.productDescription, 'Product description'),
        productPrice: toNonNegativeNumber(payload.productPrice, 'Product price'),
        productImage: toRequiredText(payload.productImage, 'Product image'),
        simulateError: payload.simulateError === 'true' || payload.simulateError === 'on'
    });
};

module.exports = {
    getRootCategories,
    getSubcategories,
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    createCategoryWithProduct
};