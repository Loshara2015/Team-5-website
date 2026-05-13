const Category = require('./Category');
const Product = require('./Product');

// Зв'язок: Категорія має багато Товарів (Один-до-багатьох)
Category.hasMany(Product, {
    foreignKey: 'categoryId',
    as: 'products'
});

Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});

// Зв'язок для ієрархії категорій (Категорія може мати підкатегорії)
Category.hasMany(Category, {
    foreignKey: 'parentId',
    as: 'subcategories'
});

Category.belongsTo(Category, {
    foreignKey: 'parentId',
    as: 'parent'
});

module.exports = {
    Category,
    Product
};