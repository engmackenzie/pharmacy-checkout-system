const router = require('express').Router();
const { authenticationCheck, authorizationCheck } = require('../middleware');
const { rolesControllers } = require('../controllers');
const {
  createRoleController,
  getRoleController,
  getRolesController,
  updateRoleController,
  deleteRoleController
} = rolesControllers;

router.post('/', [
  authenticationCheck,
  authorizationCheck,
  createRoleController
]);

router.get('/:_id',[
  authenticationCheck,
  authorizationCheck,
  getRoleController
]);

router.get('/', [
  authenticationCheck,
  authorizationCheck,
  getRolesController
]);

router.put('/:_id', [
  authenticationCheck,
  authorizationCheck,
  updateRoleController
]);

router.delete('/:_id', [
  authenticationCheck,
  authorizationCheck,
  deleteRoleController
]);



module.exports = router;