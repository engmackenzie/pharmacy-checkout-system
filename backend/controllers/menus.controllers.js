const { v4: uuidv4 } = require('uuid');
const { Menu } = require('../models');
const { APIError } = require('../utils/errors');
const { menusDatastores } = require('../datastores');
const { 
  createMenuDatastore,
  getMenuDatastore,
  getMenusDatastore,
  updateMenuDatastore,
  deleteMenuDatastore
 } = menusDatastores;

const createMenuController = async (req, res) => {
  try {
    // validate model
    let data = req.body;
    data._id = uuidv4();
    data.createdAt = new Date();
    const { error, value } = Menu.validate(data);
    if (error) throw new APIError(error.message, 400);

    // call createMenu datastore
    await createMenuDatastore(value);

    return res.status(201).json({ success: true, message: 'Menu created successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to create menu' });
  }
};

const getMenuController = async (req, res) => {
  try {
    // call get menu datastore
    const { _id } = req.params;
    const menu = await getMenuDatastore(_id);
    if (!menu) throw new APIError('No menu found for that id', 404);

    return res.status(200).json({ success: true, data: menu });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to get menu' });
  }
};

const getMenusController = async (req, res) => {
  try {
    const menus = await getMenusDatastore(req.query);
    return res.status(200).json({ success: true, data: menus });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to get menus' });
  }
};

const updateMenuController = async (req, res) => {
  try {
    const { _id } = req.params;
    if (req.body._id) delete req.body._id;

    const menu = await getMenuDatastore(_id);
    if (!menu) throw new APIError('No menu found for that ID');

    for (const key of Object.keys(req.body)) {
      menu[key] = req.body[key];
    }
    menu['updatedAt'] = new Date();

    const { error, value } = Menu.validate(menu);
    if (error) throw new APIError(error.message, 400);

    await updateMenuDatastore(_id, menu);
    return res.status(200).json({ success: true, message: 'Menu updated successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to update menu' });
  }
};

const deleteMenuController = async (req, res) => {
  try {
    const result = await deleteMenuDatastore(req.params._id);
    if (result.deletedCount !== 1) throw new APIError('No menu found for that ID');

    return res.status(201).json({ success: true, message: 'Menu deleted successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to delete menu' });
  }
};

module.exports = {
  createMenuController,
  getMenuController,
  getMenusController,
  updateMenuController,
  deleteMenuController
}