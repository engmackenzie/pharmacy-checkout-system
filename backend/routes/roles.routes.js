const router = require('express').Router();
const { authenticationCheck, authorizationCheck } = require('../middleware');

router.post('/', [
  authenticationCheck,
  authorizationCheck
]);

router.get('/', [
  authenticationCheck,
  authorizationCheck
]);

module.exports = router;