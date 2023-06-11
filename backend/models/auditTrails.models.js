const Joi = require('joi');

const AuditTrail = Joi.object({
  _id: Joi.string().required(),
  userId: Joi.string().required(),
  accessedMenuId: Joi.string().required(),
  action: Joi.string().required().valid('C', 'R', 'U', 'D'),
  requestUrl: Joi.string(),
  requestPayload: Joi.string(),
  response: Joi.string(),
  createdAt: Joi.date()
});

module.exports = AuditTrail;