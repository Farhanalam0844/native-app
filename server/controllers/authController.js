const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');
 
register = async (req, res) => {

    console.log("Register")
  try{  
    const { email, password ,name ,age } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Missing fields' });
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ msg: 'User already exists' });
      
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hash , name , age });
   
    return res.status(201).json({ msg: 'User created', userId: user.id });
  } catch (err) { 
    return res.status(500).json({ msg: 'Server error', err: err.message });
  }

};

login = async (req, res) => {
    console.log("Login")
try{    const { email, password } = req.body;
    console.log(email,password)
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token });
   }  
 catch (err) { 
    return res.status(500).json({ msg: 'Server error', err: err.message });
  }

};
module.exports={
  login,
  register
}
