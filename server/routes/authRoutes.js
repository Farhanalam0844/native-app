const router   = require('express').Router();
const authCtrl = require('../controllers/authController');
router.get('/register',(_,res)=>{
  res.json({'msg': "registerpage"})

})
router.get('/login',(_,res)=>{
  
  res.json({'msg': "loginpage"})

})

router.post('/register', authCtrl.register);
router.post('/login',    authCtrl.login);

console.log("Auth routes mounted")
module.exports = router;

