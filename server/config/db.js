const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
"myapp_db",
 "phpmyadmin",
  "YourPMAcontrolPass!",
  {
    host: "localhost",
    dialect: 'mysql',          // swap to 'postgres' | 'mariadb' | 'sqlite' if you prefer
    logging: false,
  }
);

module.exports = sequelize;

