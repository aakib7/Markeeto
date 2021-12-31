const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const accessorySchema = mongoose.Schema({
  company: String,
  model: String,
  color: String,
  price: Number,
  name: String,
  description: String,
  category: String,
});

function validateAccessory(data){
  const schema = Joi.object({
    company: Joi.string().min(3).max(10).required(),
    name: Joi.string().min(3).max(10).required(),
    model: Joi.string().min(3).max(10).required(),
    description: Joi.string().min(3).max(100).required(),
    category: Joi.string().min(3).max(20).required(),
    color: Joi.string().min(3).max(10).required(),
    price: Joi.number().min(1).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

const Accessory = mongoose.model("Accessory", accessorySchema);
module.exports.Accessory = Accessory;
module.exports.validateAccessory = validateAccessory;
