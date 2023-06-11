const jwt = require('jsonwebtoken');
const { APIError } = require('../utils/errors');
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (data, time) => 
    new Promise((resolve, reject) => {
    jwt.sign(data, JWT_SECRET, { expiresIn: time ? `${time}h` : '24h' }, (err, token) => {
      if (err) reject(err);

      resolve(token);
    });
  });

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new APIError('Invalid Token', 400);
    } else {
      throw new APIError('Something went wrong', 400);
    }
  }
};

module.exports = {
  generateToken,
  verifyToken,
};