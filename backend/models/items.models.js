const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const Item = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  desc: Joi.string(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  supplier: Joi.string(),
  createdAt: Joi.date(),
  createdBy: Joi.string(),
  updatedAt: Joi.date(),
  updatedBy: Joi.string(),
});

module.exports = Item;