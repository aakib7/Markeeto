var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("hello");
});
// router.get('/register', function(req, res, next) {
//   res.render("login",{title: 'Register'})
// });

module.exports = router;
