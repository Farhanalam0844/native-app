require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
//const sequelize  = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.get("/",(_,res)=>{
  res.json({'msg': "Home Page"})
})
// connect & sync DB
/*sequelize
  .sync()
  .then(() => console.log('✅ DB synced'))
  .catch((err) => console.error('❌ DB error:', err));
  */
module.exports = app;

