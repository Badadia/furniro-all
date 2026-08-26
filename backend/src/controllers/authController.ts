import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { AuthService } from "../services/authService";

export class AuthController {
  constructor(private authService: AuthService) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.getMe = this.getMe.bind(this);
  }

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const result = await this.authService.register({ name, email, password });
    res.status(StatusCodes.CREATED).json(result);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this.authService.login({ email, password });
    res.status(StatusCodes.OK).json(result);
  }

  async getMe(req: AuthenticatedRequest, res: Response) {
    if (!req.user?.id) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Não autorizado" });
      return;
    }
    const result = await this.authService.getMe(req.user.id);
    res.status(StatusCodes.OK).json(result);
  }
}
