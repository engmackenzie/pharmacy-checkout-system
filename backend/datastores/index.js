const itemsDatastores = require('./items.datastores');
const usersDatastores = require('./users.datastores');
const rolesDatastores = require('./roles.datastores');
const menusDatastores = require('./menus.datastores');
const billsDatastores = require('./bills.datastores');
const auditTrailsDatastores = require('./auditTrails.datastores');
const loginDatastores = require('./login.datastores');

module.exports = {
  itemsDatastores,
  usersDatastores,
  rolesDatastores,
  menusDatastores,
  billsDatastores,
  auditTrailsDatastores,
  loginDatastores
}