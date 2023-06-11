const connect = require('../utils/db/mongoDb');
const { APIError } = require('../utils/errors');

const createRoleDatastore = async (data) => {
  const db = await connect;
  // check if role exists
  const existing = await db.collection('roles').find({ name: data.name }).toArray();
  if (existing.length > 0) throw new APIError('A role with the provided name exists', 400);

  return await db.collection('roles').insertOne(data);
};

const getRoleDatastore = async (_id) => {
  const db = await connect;
  const role = await db.collection('roles').findOne({ _id});
  return role;
};

const getRolesDatastore = async (filter) => {
  const db = await connect;
  const roles = await db.collection('roles').find({}).toArray();
  return roles;
};

const getRolesMatchAllQueryDatastore = async (filter) => {
  const db = await connect;
  const roles = await db.collection('roles').find({}).toArray();
  return roles;
}

const updateRoleDatastore = async (_id, data) => {
  const db = await connect;
  // check if new email or phoneno uniqueness
  const existing = await db.collection('roles').find({ 
    name: data.name,
    $nor: [{ _id }]
  }).toArray();
  if (existing.length > 0) throw new APIError('A role with the provided name exists', 400);

  return await db.collection('roles').updateOne({ _id }, { $set: data });
}

const deleteRoleDatastore = async (_id) => {
  const db = await connect;
  return await db.collection('roles').deleteOne({ _id });
}

module.exports = {
  createRoleDatastore,
  getRoleDatastore,
  getRolesDatastore,
  getRolesMatchAllQueryDatastore,
  updateRoleDatastore,
  deleteRoleDatastore
}