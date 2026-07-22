const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const Job = require('./job');
const Application = require('./application');

// Define Associations
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Job.hasMany(Application, { foreignKey: 'job_id', as: 'applications' });
Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

const db = {
  sequelize,
  Sequelize: sequelize.constructor,
  User,
  Product,
  Category,
  Job,
  Application
};

module.exports = db;
