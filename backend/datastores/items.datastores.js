const connect = require('../utils/db/mongoDb');

const createItemDatastore = async (data) => {
  const db = await connect;
  const createdItem = await db.collection('items').insertOne(data);
  return createdItem;
};


module.exports = {
  createItemDatastore,
}