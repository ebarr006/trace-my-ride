const express = require('express');
const ObjectId = require('mongoose').Types.ObjectId
const TripService = require('../services/TripService');
const UserService = require('../services/UserService');
const users = express.Router();

users.get('/users', async (req, res, next) => {
  try {
    const users = await UserService.getUsers();
    res.send(users);
  } catch (e) {
    res.sendStatus(500);
    throw new Error(e);
  }
});

users.get('/users/:id', async (req, res, next) => {
  try {
    const user = await UserService.getUser({
      id: req.params.id
    });
    console.log(user);
    res.send(user);
  } catch (e) {
    res.sendStatus(500);
    throw new Error(e);
  }
});

module.exports = users;