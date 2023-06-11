const router = require('express').Router();
const { APIError } = require('../utils/errors');


// routes
router.use('/login', require('./login.routes'));
router.use('/items', require('./items.routes'));
router.use('/users', require('./users.routes'));
router.use('/menus', require('./menus.routes'));
router.use('/roles', require('./roles.routes'));
router.use('/bills', require('./bills.routes'));
router.use('/auditTrails', require('./auditTrails.routes'));

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to the Pharmacy Checkout System API!'  });
});

router.use((req, res, next) => {
  next(new APIError('Route does not exist', 404));
});

module.exports = router;