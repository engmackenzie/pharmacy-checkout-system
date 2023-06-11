const connect = require('../utils/db/mongoDb');

const loginDatastore = async (username) => {
  const db = await connect;
  // search user with phoneno or email
  const user = await db.collection('users').findOne({
    $or: [ { email: username }, { phoneno: username }  ]
  });
  return user;
};

module.exports = {
  loginDatastore,
}