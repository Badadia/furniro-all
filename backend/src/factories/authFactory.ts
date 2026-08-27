import { AuthController } from "../controllers/authController";
import { prisma } from "../lib/prisma";
import { PrismaUserRepository } from "../repositories/prismaUserRepository";
import { AuthService } from "../services/authService";

export default class AuthFactory {
  static createController(): AuthController {
    const userRepository = new PrismaUserRepository(prisma);
    const authService = new AuthService(userRepository);
    const authController = new AuthController(authService);

    return authController;
  }
}
