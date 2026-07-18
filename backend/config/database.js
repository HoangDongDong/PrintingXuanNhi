const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'inanxuannhi_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 30006, // Default is usually 3306, but we can make it configurable. Let's default to 3306 but support env.
    dialect: 'mysql',
    logging: false, // Set to console.log if you want to see SQL logs
    define: {
      timestamps: true,
      underscored: true // converts camelCase to snake_case in DB
    }
  }
);

module.exports = sequelize;
