const { APIError } = require('../utils/errors');

const authenticationCheck = async (req, res, next) => {
  try {
    

    next();
  } catch(error) {
    if (error instanceof APIError) next(error);

    next(new APIError('Authentication Failed', 401));
  }
}

module.exports = authenticationCheck;