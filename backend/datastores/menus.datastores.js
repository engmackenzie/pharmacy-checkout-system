const connect = require('../utils/db/mongoDb');
const { APIError } = require('../utils/errors');

const createMenuDatastore = async (data) => {
  const db = await connect;
  // check if menu exists
  const existing = await db.collection('menus').find({ name: data.name }).toArray();
  if (existing.length > 0) throw new APIError('A menu with the provided name exists', 400);

  return await db.collection('menus').insertOne(data);
};

const getMenuDatastore = async (_id) => {
  const db = await connect;
  const menu = await db.collection('menus').findOne({ _id});
  return menu;
};

const getMenusDatastore = async (filter) => {
  const db = await connect;
  const menus = await db.collection('menus').find({}).toArray();
  return menus;
};

const getMenusMatchAllQueryDatastore = async (filter) => {
  const db = await connect;
  const menus = await db.collection('menus').find({}).toArray();
  return menus;
}

const updateMenuDatastore = async (_id, data) => {
  const db = await connect;
  // check if new name uniqueness
  const existing = await db.collection('menus').find({ 
    name: data.name,
    $nor: [{ _id }]
  }).toArray();
  if (existing.length > 0) throw new APIError('A menu with the provided name exists', 400);

  return await db.collection('menus').updateOne({ _id }, { $set: data });
}

const deleteMenuDatastore = async (_id) => {
  const db = await connect;
  return await db.collection('menus').deleteOne({ _id });
}

module.exports = {
  createMenuDatastore,
  getMenuDatastore,
  getMenusDatastore,
  getMenusMatchAllQueryDatastore,
  updateMenuDatastore,
  deleteMenuDatastore
}