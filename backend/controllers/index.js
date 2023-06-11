const itemsControllers = require('./items.controllers');
const usersControllers = require('./users.controllers');
const menusControllers = require('./menus.controllers');
const rolesControllers = require('./roles.controllers');
const billsControllers = require('./bills.controllers');
const auditTrailsControllers = require('./auditTrails.controllers');
const loginControllers = require('./login.controllers');

module.exports = {
  itemsControllers,
  usersControllers,
  menusControllers,
  rolesControllers,
  billsControllers,
  auditTrailsControllers,
  loginControllers
}