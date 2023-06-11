const { v4: uuidv4 } = require('uuid');
const User = require('../models/users.models');
const { APIError } = require('../utils/errors');
const { usersDatastores, rolesDatastores } = require('../datastores');
const { getRoleDatastore } = rolesDatastores;
const { 
  createUserDatastore,
  getUserDatastore,
  getUsersDatastore,
  updateUserDatastore,
  deleteUserDatastore
 } = usersDatastores;

const createUserController = async (req, res) => {
  try {
    // validate model
    let data = req.body;
    data._id = uuidv4();
    data.createdAt = new Date();
    const { error, value } = User.validate(data);
    if (error) throw new APIError(error.message, 400);

    // ensure that roleId exists
    const role = await getRoleDatastore(value.roleId);
    if (!role) throw new APIError('Role does not exist', 404);

    // call createUser datastore
    await createUserDatastore(value);

    return res.status(201).json({ success: true, message: 'User created successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to create user' });
  }
};

const getUserController = async (req, res) => {
  try {
    // call createUser datastore
    const { _id } = req.params;
    const user = await getUserDatastore(_id);
    if (!user) throw new APIError('No user found for that id', 404);

    return res.status(200).json({ success: true, data: user });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to get user' });
  }
};

const getUsersController = async (req, res) => {
  try {
    const users = await getUsersDatastore(req.query);
    return res.status(200).json({ success: true, data: users });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to get users' });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { _id } = req.params;
    if (req.body._id) delete req.body._id;

    const user = await getUserDatastore(_id);
    if (!user) throw new APIError('No user found for that ID');

    for (const key of Object.keys(req.body)) {
      user[key] = req.body[key];
    }
    user['updatedAt'] = new Date();

    const { error, value } = User.validate(user);
    if (error) throw new APIError(error.message, 400);

    await updateUserDatastore(_id, user);
    return res.status(200).json({ success: true, message: 'User updated successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to update user' });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const result = await deleteUserDatastore(req.params._id);
    if (result.deletedCount !== 1) throw new APIError('No user found for that ID');

    return res.status(201).json({ success: true, message: 'User deleted successfully' });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};

module.exports = {
  createUserController,
  getUserController,
  getUsersController,
  updateUserController,
  deleteUserController
}