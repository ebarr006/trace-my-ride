const jwt = require("jsonwebtoken");
const UserService = require("../services/UserService");
const config = process.env;

const auth = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);

    const { id } = await UserService.getUser(
      { email: decoded.email },
      { trips: true }
    );

    req.user = id
    
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = {
  auth
};
