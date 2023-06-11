const router = require('express').Router();
const { authenticationCheck, authorizationCheck } = require('../middleware');
const { billsControllers } = require('../controllers');
const {
  createBillController,
  getBillController,
  getBillsController,
  updateBillController,
  deleteBillController
} = billsControllers;

router.post('/', [
  authenticationCheck,
  authorizationCheck,
  createBillController
]);

router.get('/:_id',[
  authenticationCheck,
  authorizationCheck,
  getBillController
]);

router.get('/', [
  authenticationCheck,
  authorizationCheck,
  getBillsController
]);

router.put('/:_id', [
  authenticationCheck,
  authorizationCheck,
  updateBillController
]);

router.delete('/:_id', [
  authenticationCheck,
  authorizationCheck,
  deleteBillController
]);



module.exports = router;