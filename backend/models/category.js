const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'categories'
});

module.exports = Category;
