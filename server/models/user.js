const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true  // This can be null for social logins
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true  // This will store the Google ID for social logins
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otpExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
  }
});

module.exports = User;
