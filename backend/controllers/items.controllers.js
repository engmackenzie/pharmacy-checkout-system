const { v4: uuidv4 } = require('uuid');
const Item = require('../models/items.models');
const { APIError } = require('../utils/errors');
const itemsDatastore = require('../datastores/items.datastores');
const { createItemDatastore } = itemsDatastore;

const createItemController = async (req, res) => {
  try {
    // validate model
    let data = req.body;
    data._id = uuidv4();
    data.createdAt = new Date();
    const { error, value } = Item.validate(data);
    if (error) throw new APIError(error.message, 400);

    // call createItem datastore
    await createItemDatastore(value);

    return res.status(201).json({ success: true, message: 'Item created successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to create item' });
  }
};

module.exports = {
  createItemController,
}