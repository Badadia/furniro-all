import { PrismaClient } from "@prisma/client";
import { User, UserCreateDTO } from "../model/user";
import IUserRepository from "./iUserRepository";

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: UserCreateDTO): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
