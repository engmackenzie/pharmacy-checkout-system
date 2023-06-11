const { APIError } = require('../utils/errors');
const { verifyToken } = require('../utils/jwtToken');
const { usersDatastores, rolesDatastores } = require('../datastores');
const { getUserDatastore } = usersDatastores;
const { getRoleDatastore } = rolesDatastores;

const authenticationCheck = async (req, res, next) => {
  try {
    const auth = req.get('authorization');
    const [scheme, token] = auth.split(' ');
    if (scheme !== 'Bearer')
      throw new APIError('Authentication scheme not supported', 401);

    // verify token
    const data = verifyToken(token);
    if (!data) throw new APIError('Authorization required', 401);

    // get user
    const user = await getUserDatastore(data._id);
    const role = await getRoleDatastore(user.roleId);
    delete role._id;
    res.locals.user = { ...user, ...role };

    next();
  } catch(error) {
    if (process.env.NODE_ENV === 'test') {
      console.log(error);
    }
    if (error instanceof APIError) next(error);

    next(new APIError('Authentication Failed', 401));
  }
}

module.exports = authenticationCheck;