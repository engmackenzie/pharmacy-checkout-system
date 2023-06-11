const router = require('express').Router();
const { authenticationCheck, authorizationCheck } = require('../middleware');
const { usersControllers } = require('../controllers');
const {
  createUserController,
  getUserController,
  getUsersController,
  updateUserController,
  deleteUserController
} = usersControllers;

router.post('/', [
  authenticationCheck,
  authorizationCheck,
  createUserController
]);

router.get('/:_id',[
  authenticationCheck,
  authorizationCheck,
  getUserController
]);

router.get('/', [
  authenticationCheck,
  authorizationCheck,
  getUsersController
]);

router.put('/:_id', [
  authenticationCheck,
  authorizationCheck,
  updateUserController
]);

router.delete('/:_id', [
  authenticationCheck,
  authorizationCheck,
  deleteUserController
]);



module.exports = router;