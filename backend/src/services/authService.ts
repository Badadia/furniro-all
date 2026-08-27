import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import AppError from "../exceptions/appError";
import { AuthResponseDTO, User, UserCreateDTO, UserLoginDTO } from "../model/user";
import IUserRepository from "../repositories/iUserRepository";

export class AuthService {
  private jwtSecret: string;

  constructor(private userRepository: IUserRepository) {
    this.jwtSecret = process.env.JWT_SECRET || "furniro_production_secure_jwt_secret_2026_@key";
  }

  async register(data: UserCreateDTO): Promise<AuthResponseDTO> {
    if (!data.name || !data.email || !data.password) {
      throw new AppError("Name, email and password are required", StatusCodes.BAD_REQUEST);
    }

    const existingUser = await this.userRepository.findByEmail(data.email.toLowerCase());
    if (existingUser) {
      throw new AppError("This email is already registered", StatusCodes.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async login(data: UserLoginDTO): Promise<AuthResponseDTO> {
    if (!data.email || !data.password) {
      throw new AppError("Email and password are required", StatusCodes.BAD_REQUEST);
    }

    const user = await this.userRepository.findByEmail(data.email.toLowerCase().trim());
    if (!user || !user.password) {
      throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
    }

    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async getMe(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  private generateToken(user: User): string {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      this.jwtSecret,
      { expiresIn: "7d" }
    );
  }
}
