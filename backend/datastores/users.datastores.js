const { User } = require('../models');

const createUserDatastore = async (data) => {
  const newUser = new User(data);
  const createdUser = await newUser.save();
  return createdUser;
};

module.exports = {
  createUserDatastore,
};
