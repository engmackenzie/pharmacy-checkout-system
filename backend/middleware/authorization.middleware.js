const { APIError } = require('../utils/errors');
const { menusDatastores } = require('../datastores');
const { getMenuDatastore } = menusDatastores;
const connect = require('../utils/db/mongoDb');

const authorizationCheck = async (req, res, next) => {
  try {
    const db = await connect;
    const { user } = res.locals;
    const accessedMenu = req.originalUrl.split('/')[2];
    const method = req.method;
    const permissions = { POST: 'C', GET: 'R', PUT: 'U', DELETE: 'D' };

    const menu = await db.collection('menus').findOne({ name: accessedMenu });
    if (!menu) throw new APIError('Resource not found', 404);
    
    // check if user is authorized to access the menu
    const menuObject = user.menuAccess[menu._id];
    if (menuObject) {
      // check if user has permission to perform the action
      if (!menuObject[permissions[method]]) throw new APIError('You are not authorized to perform this operation', 403);
    } else {
      throw new APIError('You are not authorized to access this resource', 403);
    }

    next();
  } catch(error) {
    if (process.env.NODE_ENV === 'test') {
      console.log(error);
    }
    if (error instanceof APIError) next(error);

    next(new APIError('Authorization Failed', 401));
  }
}

module.exports = authorizationCheck;