const mongoose = require('mongoose');
const joigoose = require("joigoose")(mongoose, null, { 
  _id: false, timestamps: false 
});
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const itemJoiSchema = Joi.object({
  _id: Joi.string().default(uuidv4),
  name: Joi.string().required(),
  desc: Joi.string(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  supplier: Joi.string(),
  expDate: Joi.date(),
  createdAt: Joi.date().default(Date.now),
  createdBy: Joi.string().meta({ type: 'ObjectId', ref: 'User' }),
  updatedAt: Joi.date(),
  updatedBy: Joi.string().meta({ type: '', ref: 'User' }),
});

const itemMongooseSchema = new mongoose.Schema(joigoose.convert(itemJoiSchema));
itemMongooseSchema.path('createdBy').get(function (value) {
  return value.toString(); // Convert createdBy field to string
});
itemMongooseSchema.path('updatedBy').get(function (value) {
  return value.toString(); // Convert updatedBy field to string
});
const Item = mongoose.model('Item', itemMongooseSchema);

module.exports = Item;