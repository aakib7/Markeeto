const { validateUserLogIn } = require('../models/User')

function validateLogIn(req, res, next) {
  let { error } = validateUserLogIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
module.exports = validateLogIn;