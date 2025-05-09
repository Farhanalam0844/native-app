const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  email:    { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  name:     { type: DataTypes.STRING },
  age:      { type: DataTypes.INTEGER },
});
module.exports = User;

