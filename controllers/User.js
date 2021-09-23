const UserService = require('../services/UserService');

class User {
  static getAllUsers = async (req, res, next) => {
    try {
      const users = await UserService.getAllUsers(
        {},
        { trips: true }
      );
      res.send(users);
    } catch(e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  }

  static getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await UserService.getUser(
        { id: req.user },
        { trips: true }
      );

      const { password, email, ...rest } = user;
      console.log('REST: ', rest);
      res.send(rest)
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500)
    }
  }
};

module.exports = User;