const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserService {
  static getUsers = (where = {}, include = {}) => {
    try {
      return prisma.user.findMany({ where, include });
    } catch (error) {
      throw new Error(`[UserService.getUsers]\n${error}`);
    }
  }

  static getUser = async (where = {}, include = {}) => {
    try {
      return await prisma.user.findUnique({ where, include });
    } catch (error) {
      throw new Error(`[UserService.getUsers]\n${error}`);
    }
  }

  static createUser = (data = {}, include = {}) => {
    try {
      return prisma.user.create({ data, include });
    } catch (error) {
      console.log(`[UserService.createUser]\n${error}`);
    }
  }
};

module.exports = UserService;