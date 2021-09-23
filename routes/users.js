const express = require('express');
const User = require('../controllers/User');

const users = express.Router();

users.get('/', User.getAllUsers);
users.get('/:id', User.getUser)

module.exports = users;