const authenticationCheck = require('./authentication.middleware');
const authorizationCheck = require('./authorization.middleware');

module.exports = {
  authenticationCheck,
  authorizationCheck
}