const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');
const Category = require('./category');

// Define Associations
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

const db = {
  sequelize,
  Sequelize: sequelize.constructor,
  User,
  Product,
  Category
};

module.exports = db;
