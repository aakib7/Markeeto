var express = require('express');
var router = express.Router();
var { Mobile } = require("../../../models/Mobile");
var { Accessory } = require("../../../models/Accessory");
const validateMobile = require("../../../middlewares/validateMobile");
const validateAccessories = require("../../../middlewares/validateAccessory");
const validateReg = require("../../../middlewares/validateRegister");
const validateLogIn = require("../../../middlewares/validateLog");
const isAuth = require("../../../middlewares/isAuth")
const {User} = require("../../../models/User");
const isAdmin = require("../../../middlewares/admin")
const _ = require("lodash");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let mobile = await Mobile.find();
  res.send(mobile);

});
router.get('/accessory', async function(req, res, next) {
  let accessory = await Accessory.find();
  res.send(accessory);

});
router.get('/:id', async function(req, res, next) {
  let mobile = await Mobile.findById(req.params.id);
  let accessory = await Accessory.findById(req.params.id);
  if(mobile){
    // return res.send(mobile);
    res.send(mobile);
  }
  else{
    // return res.send(accessory);
    res.send(accessory);
  }
});
// router.post("/",isAuth,isAdmin,validateMobile ,async function (req, res, next) {
router.post("/",validateMobile ,async function (req, res, next) {
    let mobile = new Mobile(req.body);
    await mobile.save();
    res.send(mobile);
});
router.post("/accessory",isAuth,isAdmin,validateAccessories ,async function (req, res, next) {
    let accessory = new Accessory(req.body);
    await accessory.save();
    res.send(accessory);
});

// update

// router.put('/:id', isAuth, admin, validateMobile ,async (req,res)=>{
router.put('/:id',validateMobile ,async (req,res)=>{
  try{
    let mobile = await Mobile.findById(req.params.id);
    if(!mobile) {
      return res.status(400).res.send("Mobile with given id not present")
    }
    mobile.company = req.body.company;
    mobile.model = req.body.model;
    mobile.color = req.body.color;
    mobile.price = req.body.price;
    mobile.ram = req.body.ram;
    mobile.rom = req.body.rom;
    mobile.description = req.body.description;
    mobile.category = req.body.category;
    await mobile.save();
    return res.send(mobile);
  }
  catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

// delete

// router.delete("/:id",isAuth, admin, async function (req, res, next) {
router.delete("/:id", async function (req, res, next) {
  try {
    let mobile = await Mobile.findByIdAndDelete(req.params.id);
    if(!mobile) {
      return res.status(400).res.send("Mobile with given id not present")
    }
    return res.send("delete");
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

// similary for accessory

module.exports = router;
