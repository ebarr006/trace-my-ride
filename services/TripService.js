const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TripService {
  static getTrips = (where = {}, include = {}) => {
    try {
      return prisma.trip.findMany({ where, include })
    } catch (error) {
      throw new Error(`[TripService.getTrips]\n${error}`);
    }
  }

  static getTrip = (where = {}, include = {}) => {
    try {
      return prisma.trip.findUnique({ where, include });
    } catch (error) {
      throw new Error(`[TripService.getTrip]\n${error}`);
    }
  }

  static createTrip = (data = {}, include = {}) => {
    try {
      return prisma.trip.create({ data, include });
    } catch (error) {
      console.log(`[TripService.createTrip]\n${error}`);
    }
  }

  static createPin = (data = {}, include = {}) => {
    try {
      return prisma.pin.create({ data, include });
    } catch (error) {
      console.log(`[TripService.createPin]\n${error}`);
    }
  }
};

module.exports = TripService;