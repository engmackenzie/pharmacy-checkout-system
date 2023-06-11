const Joi = require('joi');

const Login = Joi.object({
  username: Joi.string().required().min(1),
  password: Joi.string().required().min(1)
});

module.exports = Login;