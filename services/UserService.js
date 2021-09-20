const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserService {
  static getUsers = (params = {}) => {
    try {
      return prisma.user.findMany({
        include: { trips: true }
      });
    } catch (error) {
      throw new Error(`[UserService.getUsers]\n${error}`);
    }
  }

  static getUser = async (params = {}) => {
    try {
      return await prisma.user.findUnique({
        where: { ...params },
        include: { trips: true }
      });
    } catch (error) {
      throw new Error(`[UserService.getUsers]\n${error}`);
    }
  }

  static createUser = (params) => {
    try {
      return prisma.user.create({
        data: { ...params },
        include: { trips: true }
      });
    } catch (error) {
      console.log(`[UserService.createUser]\n${error}`);
    }
  }
};

module.exports = UserService;