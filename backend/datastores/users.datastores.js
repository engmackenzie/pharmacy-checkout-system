const connect = require('../utils/db/mongoDb');
const { APIError } = require('../utils/errors');

const createUserDatastore = async (data) => {
  const db = await connect;
  // check if email or phoneno exists
  const existing = await db.collection('users').find({$or: [{ phoneno: data.phoneno }, { email: data.email }]}).toArray();
  if (existing.length > 0) throw new APIError('A user with the provided email or phoneno exists', 400);

  const createdUser = await db.collection('users').insertOne(data);
  return createdUser;
};

const getUserDatastore = async (_id) => {
  const db = await connect;
  const user = await db.collection('users').findOne({ _id});
  return user;
};

const getUsersDatastore = async (filter) => {
  const db = await connect;
  const users = await db.collection('users').find({}).toArray();
  return users;
};

const getUsersMatchAllQueryDatastore = async (filter) => {
  const db = await connect;
  const users = await db.collection('users').find({}).toArray();
  return users;
}

const updateUserDatastore = async (_id, data) => {
  const db = await connect;
  // check if new email or phoneno uniqueness
  const existing = await db.collection('users').find({ 
    $or: [{ phoneno: data.phoneno }, { email: data.email }],
    $nor: [{ _id }]
  }).toArray();
  if (existing.length > 0) throw new APIError('A user with the provided email or phoneno exists', 400);

  return await db.collection('users').updateOne({ _id }, { $set: data });
}

const deleteUserDatastore = async (_id) => {
  const db = await connect;
  return await db.collection('users').deleteOne({ _id });
}

module.exports = {
  createUserDatastore,
  getUserDatastore,
  getUsersDatastore,
  getUsersMatchAllQueryDatastore,
  updateUserDatastore,
  deleteUserDatastore
}