const connect = require('../utils/db/mongoDb');

const createItemDatastore = async (data) => {
  const db = await connect;
  const createdItem = await db.collection('items').insertOne(data);
  return createdItem;
};

const getItemDatastore = async (_id) => {
  const db = await connect;
  const item = await db.collection('items').findOne({ _id});
  return item;
};

const getItemsDatastore = async (filter) => {
  const db = await connect;
  const items = await db.collection('items').find({}).toArray();
  return items;
};

const updateItemDatastore = async (_id, data) => {
  const db = await connect;
  return await db.collection('items').updateOne({ _id }, { $set: data });
}

const deleteItemDatastore = async (_id) => {
  const db = await connect;
  return await db.collection('items').deleteOne({ _id });
}


module.exports = {
  createItemDatastore,
  getItemDatastore,
  getItemsDatastore,
  updateItemDatastore,
  deleteItemDatastore
}