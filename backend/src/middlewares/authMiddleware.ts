import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import AppError from "../exceptions/appError";

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token de autenticação não fornecido", StatusCodes.UNAUTHORIZED);
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new AppError("Formato de token inválido", StatusCodes.UNAUTHORIZED);
  }

  const token = parts[1];
  const jwtSecret = process.env.JWT_SECRET || "furniro_super_secret_jwt_key_2026";

  try {
    const decoded = jwt.verify(token, jwtSecret) as AuthenticatedUser;
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError("Token inválido ou expirado", StatusCodes.UNAUTHORIZED);
  }
}
