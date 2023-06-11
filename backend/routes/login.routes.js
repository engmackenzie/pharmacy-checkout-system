const router = require('express').Router();
const { loginControllers } = require('../controllers');
const { loginController } = loginControllers;

router.post('/', [
  loginController
]);

module.exports = router;