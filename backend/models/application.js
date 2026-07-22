const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'full_name'
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  cvUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'cv_url'
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'cover_letter'
  },
  jobId: {
    type: DataTypes.INTEGER,
    field: 'job_id',
    allowNull: true,
    references: {
      model: 'jobs',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewing', 'interviewed', 'hired', 'rejected'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'applications'
});

module.exports = Application;
