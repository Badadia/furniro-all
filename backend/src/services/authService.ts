import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import AppError from "../exceptions/appError";
import { AuthResponseDTO, User, UserCreateDTO, UserLoginDTO } from "../model/user";
import IUserRepository from "../repositories/iUserRepository";

export class AuthService {
  private jwtSecret: string;

  constructor(private userRepository: IUserRepository) {
    this.jwtSecret = process.env.JWT_SECRET || "furniro_super_secret_jwt_key_2026";
  }

  async register(data: UserCreateDTO): Promise<AuthResponseDTO> {
    if (!data.name || !data.email || !data.password) {
      throw new AppError("Nome, e-mail e senha são obrigatórios", StatusCodes.BAD_REQUEST);
    }

    const existingUser = await this.userRepository.findByEmail(data.email.toLowerCase());
    if (existingUser) {
      throw new AppError("Este e-mail já está cadastrado", StatusCodes.CONFLICT);
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
      throw new AppError("E-mail e senha são obrigatórios", StatusCodes.BAD_REQUEST);
    }

    const user = await this.userRepository.findByEmail(data.email.toLowerCase().trim());
    if (!user || !user.password) {
      throw new AppError("Credenciais inválidas", StatusCodes.UNAUTHORIZED);
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      throw new AppError("Credenciais inválidas", StatusCodes.UNAUTHORIZED);
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
      throw new AppError("Usuário não encontrado", StatusCodes.NOT_FOUND);
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
