const connect = require('../utils/db/mongoDb');
const { APIError } = require('../utils/errors');

const createBillDatastore = async (data) => {
  const db = await connect;
  return await db.collection('bills').insertOne(data);
};

const getBillDatastore = async (_id) => {
  const db = await connect;
  const bill = await db.collection('bills').findOne({ _id});
  return bill;
};

const getBillsDatastore = async (filter) => {
  const db = await connect;
  const bills = await db.collection('bills').find({}).toArray();
  return bills;
};

const getBillsMatchAllQueryDatastore = async (filter) => {
  const db = await connect;
  const bills = await db.collection('bills').find({}).toArray();
  return bills;
}

const updateBillDatastore = async (_id, data) => {
  const db = await connect;

  return await db.collection('bills').updateOne({ _id }, { $set: data });
}

const deleteBillDatastore = async (_id) => {
  const db = await connect;
  return await db.collection('bills').deleteOne({ _id });
}

module.exports = {
  createBillDatastore,
  getBillDatastore,
  getBillsDatastore,
  getBillsMatchAllQueryDatastore,
  updateBillDatastore,
  deleteBillDatastore
}