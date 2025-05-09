require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const pool       = require('./config/mysql');
const sequelize  = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.get("/",(_,res)=>{
  res.json({'msg': "Home Page"})
})
app.get('/db-test', async (_, res) => {
  try {
    const [rows] = await pool.query('SHOW TABLES;');
    res.json(rows);
  } catch (err) {
    console.error('DB test error:', err);
    res.status(500).json({ error: err.message });
  }
});sequelize
  .authenticate()
  .then(() => console.log('✅ MySQL connected'))
  .then(() => sequelize.sync())       // create tables
  .then(() => console.log('✅ Tables synced'))
  .catch(err => console.error('❌ DB error:', err));
 
module.exports = app;

