const TripService = require('../services/TripService');

class Trip {
  static getAllTrips = async (req, res, next) => {
    try {
      const trips = await TripService.getTrips(
        {},
        { pins: false }
      );
      res.send(trips);
    } catch(e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  }

  static getTrip = async (req, res, next) => {
    const { id } = req.params;
    try {
      const trip = await TripService.getTrip(
        { id: req.user },
        { pins: true }
      );
      return trip;
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500)
    }
  }

  static createTripForIOS = async (req, res, next) => {
    const { name, description } = req.body;
    let trip = null;
    try {
      trip = await TripService.createTrip(
        {
          name,
          description,
          active: true,
          user: {
            connect: {
              id: req.user
            }
          }
        },
        { pins: false }
      );
      res.status(201).send(trip);
    } catch (e) {
      res.sendStatus(500);
      throw new Error(e);
    }
  }

  static createPin = async (req, res, next) => {
    const { lat, lng, tripId } = req.body;
    try {
      const pin = await TripService.createPin(
        {
          lat: lat.toString(),
          lng: lng.toString(),
          trip: {
            connect: {
              id: tripId
            }
          }
        },
        { trip: false }
      );
      console.log('Created Pin: ', pin);
      res.sendStatus(201);
    } catch (e) {
      res.sendStatus(500)
      throw new Error(e)
    }
  }

};

module.exports = Trip;