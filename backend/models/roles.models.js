const Joi = require('joi');

const menuAccessItemSchema = Joi.object({
  C: Joi.number().integer().valid(0, 1).required(),
  R: Joi.number().integer().valid(0, 1).required(),
  U: Joi.number().integer().valid(0, 1).required(),
  D: Joi.number().integer().valid(0, 1).required(),
});

const Role = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  menuAccess: Joi.object().pattern(Joi.string().required(), menuAccessItemSchema),
  createdAt: Joi.date(),
  createdBy: Joi.string(),
  updatedAt: Joi.date(),
  updatedBy: Joi.string(),
});

module.exports = Role;