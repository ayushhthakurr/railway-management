const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  trainId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  numSeats: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('confirmed', 'cancelled'),
    defaultValue: 'confirmed'
  },
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Booking;