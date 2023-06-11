const router = require('express').Router();
const { authenticationCheck, authorizationCheck } = require('../middleware');
const { itemsControllers } = require('../controllers');
const {
  createItemController,
  getItemController,
  getItemsController,
  updateItemController,
  deleteItemController
} = itemsControllers;

router.post('/', [
  authenticationCheck,
  authorizationCheck,
  createItemController
]);

router.get('/:_id',[
  authenticationCheck,
  authorizationCheck,
  getItemController
]);

router.get('/', [
  authenticationCheck,
  authorizationCheck,
  getItemsController
]);

router.put('/:_id', [
  authenticationCheck,
  authorizationCheck,
  updateItemController
]);

router.delete('/:_id', [
  authenticationCheck,
  authorizationCheck,
  deleteItemController
]);



module.exports = router;