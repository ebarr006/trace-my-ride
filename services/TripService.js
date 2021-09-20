const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TripService {
  static getTrips = (params = {}) => {
    try {
      return prisma.trip.findMany({
        where: { ...params },
        include: { user: true }
      })
    } catch (error) {
      throw new Error(`[TripService.getTrips]\n${error}`);
    }
  }

  static getTrip = (params = {}) => {
    try {
      return prisma.trip.findUnique({
        where: { ...params },
        include: { user: true }
      });
    } catch (error) {
      throw new Error(`[TripService.getTrip]\n${error}`);
    }
  }

  static createTrip = (params) => {
    try {
      return prisma.trip.create({
        data: { ...params },
        include: { user: true }
      });
    } catch (error) {
      console.log(`[TripService.createTrip]\n${error}`);
    }
  }
};

module.exports = TripService;