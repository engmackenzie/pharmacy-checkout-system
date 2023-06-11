const { v4: uuidv4 } = require('uuid');
const { Bill } = require('../models');
const { APIError } = require('../utils/errors');
const { billsDatastores } = require('../datastores');
const { 
  createBillDatastore,
  getBillDatastore,
  getBillsDatastore,
  updateBillDatastore,
  deleteBillDatastore
 } = billsDatastores;

const createBillController = async (req, res) => {
  try {
    // validate model
    let data = req.body;
    data._id = uuidv4();
    data.createdAt = new Date();
    const { error, value } = Bill.validate(data);
    if (error) throw new APIError(error.message, 400);

    // verify that total = sum of subtotals
    // verify that subtotal = unitPrice * noOfItems
    let total = 0;
    let count = 0;
    for (const item of req.body.items) {
      if (item.noOfItems * item.unitPrice !== item.subTotal)
        throw new APIError(`Items[${count}] subtotal should equal noOfItems * unitPrice`, 400);
      total += item.subTotal;
      count++;
    }
    if (total !== req.body.total) 
      throw new APIError('The bill\'s total should equal sum of all subtotals', 400);

    // call createBill datastore
    await createBillDatastore(value);

    return res.status(201).json({ success: true, message: 'Bill created successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to create bill' });
  }
};

const getBillController = async (req, res) => {
  try {
    // call get bill datastore
    const { _id } = req.params;
    const bill = await getBillDatastore(_id);
    if (!bill) throw new APIError('No bill found for that id', 404);

    return res.status(200).json({ success: true, data: bill });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to get bill' });
  }
};

const getBillsController = async (req, res) => {
  try {
    const bills = await getBillsDatastore(req.query);
    return res.status(200).json({ success: true, data: bills });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to get bills' });
  }
};

const updateBillController = async (req, res) => {
  try {
    const { _id } = req.params;
    if (req.body._id) delete req.body._id;

    const bill = await getBillDatastore(_id);
    if (!bill) throw new APIError('No bill found for that ID');

    for (const key of Object.keys(req.body)) {
      bill[key] = req.body[key];
    }
    bill['updatedAt'] = new Date();

    const { error, value } = Bill.validate(bill);
    if (error) throw new APIError(error.message, 400);

    let total = 0;
    let count = 0;
    for (const item of bill.items) {
      if (item.noOfItems * item.unitPrice !== item.subTotal)
        throw new APIError(`Items[${count}] subtotal should equal noOfItems * unitPrice`, 400);
      total += item.subTotal;
      count++;
    }
    if (total !== bill.total) 
      throw new APIError('The bill\'s total should equal sum of all subtotals', 400);

    await updateBillDatastore(_id, bill);
    return res.status(200).json({ success: true, message: 'Bill updated successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to update bill' });
  }
};

const deleteBillController = async (req, res) => {
  try {
    const result = await deleteBillDatastore(req.params._id);
    if (result.deletedCount !== 1) throw new APIError('No bill found for that ID');

    return res.status(201).json({ success: true, message: 'Bill deleted successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to delete bill' });
  }
};

module.exports = {
  createBillController,
  getBillController,
  getBillsController,
  updateBillController,
  deleteBillController
}