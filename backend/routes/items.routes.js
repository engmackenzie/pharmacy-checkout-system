const router = require('express').Router();
const { authenticationCheck, authorizationCheck } = require('../middleware');
const { itemsController } = require('../controllers');
const {
  createItemController,
} = itemsController;

router.post('/', [
  authenticationCheck,
  authorizationCheck,
  createItemController
]);

// router.get('/', [
//   authenticationCheck,
//   authorizationCheck
// ]);

module.exports = router;