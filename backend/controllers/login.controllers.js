const { APIError } = require('../utils/errors');
const { generateToken } = require('../utils/jwtToken');
const { loginDatastores, rolesDatastores } = require('../datastores');
const { loginDatastore } = loginDatastores;
const { getRoleDatastore } = rolesDatastores;

 const { Login } = require('../models');

const loginController = async (req, res) => {
  try {
    // validate req.body data
    const { error, value } = Login.validate(req.body);
    if (error) throw new APIError(error.message, 400);

    const {username, password } = req.body;

    // get user by email or phone no - if not exists throw error
    const user = await loginDatastore(username);
    if (!user) throw new APIError('User not found', 404);

    // check if password matches - if not match throw error
    // TODO: use bycrypt
    if (password !== user.password) throw new APIError('Wrong access credentials', 401);

    // generate token
    const token = await generateToken({_id: user._id}, );

    // get user role access items
    const role = await getRoleDatastore(user.roleId);
    delete role._id;
    delete user.password;
    delete user.createdBy;
    delete user.updatedBy;
    delete user.updatedAt;
    user['roleName'] = role.name,
    user['menuAccess'] = role.menuAccess;
   
    return res.status(200).json({ success: true, token: token, data: user });
  } catch(error) {
    console.error(error); // logger should be here

    if (error instanceof APIError) return res.status(error.status).json(error.returnObject);
    
    return res.status(500).json({ success: false, message: 'Failed to login' });
  }
};

module.exports = {
  loginController
}