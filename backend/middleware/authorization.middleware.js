const { APIError } = require('../utils/errors');

const authorizationCheck = async (req, res, next) => {
  try {
    

    next();
  } catch(error) {
    if (error instanceof APIError) next(error);

    next(new APIError('Authorization Failed', 401));
  }
}

module.exports = authorizationCheck;