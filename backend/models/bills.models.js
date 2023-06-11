const Joi = require('joi');

const billItemSchema = Joi.object({
  itemName: Joi.string().required().min(1),
  noOfItems: Joi.number().required().min(0),
  unitPrice: Joi.number().required().min(0),
  subTotal: Joi.number().required().min(0)
});

const Bill = Joi.object({
  _id: Joi.string().required(),
  customerId: Joi.string(),
  customerName: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  paymentStatus: Joi.string().required(),
  items: Joi.array().items(
   billItemSchema
  ).min(1),
  total: Joi.number().required().min(0),
  createdAt: Joi.date(),
  createdBy: Joi.string(),
  updatedAt: Joi.date(),
  updatedBy: Joi.string(),
});

module.exports = Bill;