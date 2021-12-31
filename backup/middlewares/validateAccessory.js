const { validateAccessory } = require('../models/Accessory')

function validateAccessories(req, res, next) {
  let { error } = validateAccessory(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
module.exports = validateAccessories;