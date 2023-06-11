const Joi = require('joi');

const Menu = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  createdAt: Joi.date(),
  createdBy: Joi.string(),
  updatedAt: Joi.date(),
  updatedBy: Joi.string(),
});

module.exports = Menu;