const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const joigoose = require('joigoose')(mongoose);

const userJoiSchema = Joi.object({
  _id: Joi.string().default(uuidv4),
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  phoneno: Joi.string().required(),
  roleId: Joi.string().required(),
  status: Joi.string().required(),
  createdAt: Joi.date().default(Date.now),
  createdBy: Joi.string().meta({ type: 'ObjectId', ref: 'User' }),
  updatedAt: Joi.date(),
  updatedBy: Joi.string().meta({ type: 'ObjectId', ref: 'User' }),
});

const userMongooseSchema = new mongoose.Schema(joigoose.convert(userJoiSchema));
userMongooseSchema.path('createdBy').get(function (value) {
  return value.toString(); // Convert createdBy field to string
});
userMongooseSchema.path('updatedBy').get(function (value) {
  return value.toString(); // Convert updatedBy field to string
});
const User = mongoose.model('User', userMongooseSchema);

module.exports = User;
