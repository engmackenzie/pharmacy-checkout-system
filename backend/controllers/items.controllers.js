const { v4: uuidv4 } = require('uuid');
const { Item } = require('../models');
const { APIError } = require('../utils/errors');
const { itemsDatastores } = require('../datastores');
const { 
  createItemDatastore,
  getItemDatastore,
  getItemsDatastore,
  updateItemDatastore,
  deleteItemDatastore
 } = itemsDatastores;

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

const getItemController = async (req, res) => {
  try {
    // call createItem datastore
    const { _id } = req.params;
    const item = await getItemDatastore(_id);
    if (!item) throw new APIError('No item found for that id', 404);

    return res.status(200).json({ success: true, data: item });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    res.status(500).json({ success: false, message: 'Failed to get item' });
  }
};

const getItemsController = async (req, res) => {
  try {
    const items = await getItemsDatastore(req.query);
    return res.status(200).json({ success: true, data: items });
  } catch(error) {
    console.error('----item', error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to get items' });
  }
};

const updateItemController = async (req, res) => {
  try {
    const { _id } = req.params;
    if (req.body._id) delete req.body._id;

    const item = await getItemDatastore(_id);
    if (!item) throw new APIError('No item found for that ID');

    for (const key of Object.keys(req.body)) {
      item[key] = req.body[key];
    }
    item['updatedAt'] = new Date();

    const { error, value } = Item.validate(item);
    if (error) throw new APIError(error.message, 400);

    await updateItemDatastore(_id, item);
    return res.status(200).json({ success: true, message: 'Item updated successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to update item' });
  }
};

const deleteItemController = async (req, res) => {
  try {
    const result = await deleteItemDatastore(req.params._id);
    if (result.deletedCount !== 1) throw new APIError('No item found for that ID');

    return res.status(201).json({ success: true, message: 'Item deleted successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to delete item' });
  }
};

module.exports = {
  createItemController,
  getItemController,
  getItemsController,
  updateItemController,
  deleteItemController
}