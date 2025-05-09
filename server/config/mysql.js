// config/mysql.js
const mysql = require('mysql2/promise');

require('dotenv').config();      // ← make sure this is called before you read process.env
const pool = mysql.createPool({
  host:     process.env.DB_HOST ||  'localhost',
  user:     process.env.DB_USER || "phpmyadmin",
  password: process.env.DB_PASS || "YourPMAcontrolpass!",
  database: process.env.DB_NAME || "myapp_db",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;

