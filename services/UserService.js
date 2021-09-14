const User = require('../model/user');

class UserService {
  static getAllUsers = async (params = {}) => {
    let users = null;
    try {
      users = await User.find(params);
    } catch (error) {
      console.log(error);
    }
    return users;
  }

  static getUser = async (params = {}) => {
    let user = null;
    try {
      user = await User.findOne(params);
    } catch (error) {
      console.log(error);
    }
    return user;
  }

  static createUser = async (params) => {
    let user = null;
    try {
      user = await User.create(params)
    } catch (error) {
      console.log(error);
    }
    return user;
  }
};

module.exports = UserService;