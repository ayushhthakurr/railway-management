const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Train = sequelize.define('Train', {
  source: {
    type: DataTypes.STRING,
    allowNull: false
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Train;