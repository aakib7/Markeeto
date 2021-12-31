const { validateUserRegistration } = require('../models/User')

function validateReg(req, res, next) {
  let { error } = validateUserRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
module.exports = validateReg;