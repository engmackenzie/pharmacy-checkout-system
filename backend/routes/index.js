const router = require('express').Router();

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

router.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route does not exist'});
});

module.exports = router;