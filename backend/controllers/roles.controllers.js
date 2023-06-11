const { v4: uuidv4 } = require('uuid');
const { Role } = require('../models');
const { APIError } = require('../utils/errors');
const { rolesDatastores } = require('../datastores');
const { 
  createRoleDatastore,
  getRoleDatastore,
  getRolesDatastore,
  updateRoleDatastore,
  deleteRoleDatastore
 } = rolesDatastores;

const createRoleController = async (req, res) => {
  try {
    // validate model
    let data = req.body;
    data._id = uuidv4();
    data.createdAt = new Date();
    const { error, value } = Role.validate(data);
    if (error) throw new APIError(error.message, 400);

    // call createRole datastore
    await createRoleDatastore(value);

    return res.status(201).json({ success: true, message: 'Role created successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to create role' });
  }
};

const getRoleController = async (req, res) => {
  try {
    // call get role datastore
    const { _id } = req.params;
    const role = await getRoleDatastore(_id);
    if (!role) throw new APIError('No role found for that id', 404);

    return res.status(200).json({ success: true, data: role });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to get role' });
  }
};

const getRolesController = async (req, res) => {
  try {
    const roles = await getRolesDatastore(req.query);
    return res.status(200).json({ success: true, data: roles });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to get roles' });
  }
};

const updateRoleController = async (req, res) => {
  try {
    const { _id } = req.params;
    if (req.body._id) delete req.body._id;

    const role = await getRoleDatastore(_id);
    if (!role) throw new APIError('No role found for that ID');

    for (const key of Object.keys(req.body)) {
      role[key] = req.body[key];
    }
    role['updatedAt'] = new Date();

    const { error, value } = Role.validate(role);
    if (error) throw new APIError(error.message, 400);

    await updateRoleDatastore(_id, role);
    return res.status(200).json({ success: true, message: 'Role updated successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to update role' });
  }
};

const deleteRoleController = async (req, res) => {
  try {
    const result = await deleteRoleDatastore(req.params._id);
    if (result.deletedCount !== 1) throw new APIError('No role found for that ID');

    return res.status(201).json({ success: true, message: 'Role deleted successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to delete role' });
  }
};

module.exports = {
  createRoleController,
  getRoleController,
  getRolesController,
  updateRoleController,
  deleteRoleController
}