const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');

const db = {
  sequelize,
  Sequelize: sequelize.constructor,
  User,
  Product
};

module.exports = db;
