const { itemsDatastore } = require('../datastores');
const { DatastoreError } = require('../utils/errors');

const {
  createItemDatastore,
} = itemsDatastore;

const createItemService = async (data) => {
  // make data modifications where need be
  // also validate business logic
  return createItemDatastore(data)
    .then((result) => result)
    .catch((error) => {
      throw new DatastoreError('Failed to create Item');
    });
};

module.exports = {
  createItemService,
}