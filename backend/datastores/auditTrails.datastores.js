const connect = require('../utils/db/mongoDb');
const { APIError } = require('../utils/errors');

const createAuditTrailDatastore = async (data) => {
  const db = await connect;
  return await db.collection('auditTrails').insertOne(data);
};

const getAuditTrailDatastore = async (_id) => {
  const db = await connect;
  const auditTrail = await db.collection('auditTrails').findOne({ _id});
  return auditTrail;
};

const getAuditTrailsDatastore = async (filter) => {
  const db = await connect;
  const auditTrails = await db.collection('auditTrails').find({}).toArray();
  return auditTrails;
};

const getAuditTrailsMatchAllQueryDatastore = async (filter) => {
  const db = await connect;
  const auditTrails = await db.collection('auditTrails').find({}).toArray();
  return auditTrails;
}

module.exports = {
  createAuditTrailDatastore,
  getAuditTrailDatastore,
  getAuditTrailsDatastore,
  getAuditTrailsMatchAllQueryDatastore,
}