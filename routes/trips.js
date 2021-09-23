const express = require('express');
const Trip = require('../controllers/Trip');

const trips = express.Router();

trips.get('/', Trip.getAllTrips);
trips.get('/:id', Trip.getTrip);
trips.post('/ios/create', Trip.createTripForIOS);
trips.post('/ios/create/pin', Trip.createPin);

module.exports = trips;