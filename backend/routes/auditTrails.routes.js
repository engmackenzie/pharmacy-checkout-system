const router = require('express').Router();
const { authenticationCheck, authorizationCheck } = require('../middleware');
const { auditTrailsControllers } = require('../controllers');
const {
  createAuditTrailController,
  getAuditTrailController,
  getAuditTrailsController
} = auditTrailsControllers;

router.post('/', [
  authenticationCheck,
  authorizationCheck,
  createAuditTrailController
]);

router.get('/:_id',[
  authenticationCheck,
  authorizationCheck,
  getAuditTrailController
]);

router.get('/', [
  authenticationCheck,
  authorizationCheck,
  getAuditTrailsController
]);

module.exports = router;