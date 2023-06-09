const Joi = require('joi');

const userJoiSchema = Joi.object({
  _id: Joi.string(),
  email: Joi.string().email().required(),
  firstname: Joi.string().required().min(2),
  lastname: Joi.string().required().min(2),
  phoneno: Joi.string().required().min(10),
  password: Joi.string().required().min(4),
  roleId: Joi.string().required(),
  status: Joi.string().required(),
  createdAt: Joi.date(),
  createdBy: Joi.string(),
  updatedAt: Joi.date(),
  updatedBy: Joi.string(),
});

module.exports = User;
