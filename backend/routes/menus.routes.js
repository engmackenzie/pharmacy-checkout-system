const router = require('express').Router();
const { authenticationCheck, authorizationCheck } = require('../middleware');
const { menusControllers } = require('../controllers');
const {
  createMenuController,
  getMenuController,
  getMenusController,
  updateMenuController,
  deleteMenuController
} = menusControllers;

router.post('/', [
  authenticationCheck,
  authorizationCheck,
  createMenuController
]);

router.get('/:_id',[
  authenticationCheck,
  authorizationCheck,
  getMenuController
]);

router.get('/', [
  authenticationCheck,
  authorizationCheck,
  getMenusController
]);

router.put('/:_id', [
  authenticationCheck,
  authorizationCheck,
  updateMenuController
]);

router.delete('/:_id', [
  authenticationCheck,
  authorizationCheck,
  deleteMenuController
]);

module.exports = router;