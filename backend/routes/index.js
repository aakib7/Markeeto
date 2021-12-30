var express = require('express');
var router = express.Router();
var { Mobile } = require("../models/Mobile");
var { Accessory } = require("../models/Accessory");
const validateMobile = require("../middlewares/validateMobile");
const validateAccessories = require("../middlewares/validateAccessory");
const validateReg = require("../middlewares/validateRegister");
const validateLogIn = require("../middlewares/validateLog");
const isAuth = require("../middlewares/isAuth")
const {User} = require("../models/User");
const bcrypt = require("bcryptjs");

/* GET home page. */

router.get('/', async function(req, res, next) {
  let mobile = await Mobile.find();
  let accessory = await Accessory.find();
  res.render('index',{layout:"layout",
              title: 'Products',
              mobiles: mobile,
              accessories:accessory,
              isAuth:req.session.user
            });

});
router.get('/accessory', async function(req, res, next) {
  let accessory = await Accessory.find();
  res.render('accessory',{layout:"layout",
              title: 'Accessory',
              accessories:accessory,
              isAuth:req.session.user
            });
});
router.get('/contact', async function(req, res, next) {
  res.render("contact",{title: 'ContactUs',
isAuth:req.session.user})
});
router.get('/login', async function(req, res, next) {
  res.render("login",{title: 'Login',
   isAuth:req.session.user
})
});
router.get('/register', async function(req, res, next) {
  res.render("register",{title: 'Register',
isAuth:req.session.user})
});
router.get('/profile',isAuth, async function(req, res, next) {
  res.render("profile",{title: 'profile',
   user:req.session.user,
  isAuth:req.session.user,
  isAdmin:req.session.user.role == 'admin'
})
});
router.get("/logout", async (req, res) => {
  req.session.user = null;
  console.log("session clear");
  return res.redirect("/login");
});

router.get('cart',async function(req, res, next){
  res.send("Hello cart");
});
router.get('/:id', async function(req, res, next) {
  let mobile = await Mobile.findById(req.params.id);
  let accessory = await Accessory.findById(req.params.id);
  if(mobile){
    // return res.send(mobile);
    res.render('detailsMobile',{layout:"layout",
              title: 'Details',
              mobiles: mobile,
              isAuth:req.session.user
            });
  }
  else{
    // return res.send(accessory);
    res.render('detailsAccessory',{layout:"layout",
              title: 'Details',
              accessory: accessory,
              isAuth:req.session.user
            });
  }
});



router.post("/",validateMobile ,async function (req, res, next) {
    let mobile = new Mobile(req.body);
    await mobile.save();
    res.send(mobile);
});
router.post("/accessory",validateAccessories ,async function (req, res, next) {
    let accessory = new Accessory(req.body);
    await accessory.save();
    res.send(accessory);
});
// Register 
router.post('/register',validateReg, async(req,res) => {
   let user = await User.findOne({ email:req.body.email });
   if(user){
     return res.status(400).send("User Already exist");
   }
   else{
    let user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    let salt = await bcrypt.genSalt(10); // password encryption with bcryptjs
    user.password = await bcrypt.hash(user.password, salt);
    await user.save()
    res.redirect('/login');
   }   
});
// Login 
router.post('/login',validateLogIn, async(req, res)=>{
    const{email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.redirect('/login'); 
    }
    else{
      const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(validPassword){
            req.session.user = user;
            // res.send(req.session.user);
            res.redirect('/profile');
        }
        else{
            return res.redirect('/login');
        }
    }
    
});

module.exports = router;
