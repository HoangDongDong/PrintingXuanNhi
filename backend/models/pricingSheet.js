const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PricingSheet = sequelize.define('PricingSheet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'image_url'
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'pricing_sheets'
});

module.exports = PricingSheet;
