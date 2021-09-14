const express = require('express');
const users = express.Router();
const UserService = require('../services/UserService');

users.get('/users', async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    console.log(users);
    res.send(users);
  } catch (e) {
    res.sendStatus(500);
    throw new Error(e);
  }
});

users.get('/user', async (req, res, next) => {
  try {
    const user = await UserService.getUser();
    res.send(user);
  } catch (e) {
    res.sendStatus(500);
    throw new Error(e);
  }
});

module.exports = users;