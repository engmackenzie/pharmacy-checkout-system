const { Item } = require('../models');

const createItemDatastore = async (data) => {
  // use Item to insert to DB
  const newItem = new Item(data);
  const createdItem = await newItem.save();
  return createdItem;
};


module.exports = {
  createItemDatastore,
}