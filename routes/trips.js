const express = require('express');
const trips = express.Router();
const TripService = require('../services/TripService');

trips.get('/trips', async (req, res, next) => {
  try {
    const trips = await TripService.getTrips();
    res.send(trips);
  } catch (e) {
    res.sendStatus(500);
    throw new Error(e);
  }
});

trips.get('/trips/:id', async (req, res, next) => {
  try {
    const trip = await TripService.getTrip({
      id: req.params.id
    });
    console.log(trip);
    res.send(trip);
  } catch (e) {
    res.sendStatus(500);
    throw new Error(e);
  }
});

trips.post('/trips', async (req, res, next) => {
  const { name, description } = req.body;
  const startDate = new Date();
  let trip = null;

  try {
    trip = await TripService.createTrip({
      name,
      description,
      startDate,
      user: {
        connect: {
          id: req.user.id
        }
      }
    });
    res.send(trip);
  } catch (e) {
    res.sendStatus(500);
    throw new Error(e);
  }
});

module.exports = trips;

// create a trip


// then populate the user with trip