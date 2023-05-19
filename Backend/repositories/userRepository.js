const { User } = require("../models");

//Create item
async function addUser(user) {
  return await User.create(user);
}

//Get item
async function getUserByEmail(email) {
  return await User.findOne({ where: { email } });
}

//Export modules
module.exports = {
  addUser,
  getUserByEmail,
};
