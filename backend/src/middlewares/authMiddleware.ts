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
    throw new AppError("Authentication token not provided", StatusCodes.UNAUTHORIZED);
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new AppError("Invalid token format", StatusCodes.UNAUTHORIZED);
  }

  const token = parts[1];
  const jwtSecret = process.env.JWT_SECRET || "furniro_production_secure_jwt_secret_2026_@key";

  try {
    const decoded = jwt.verify(token, jwtSecret) as AuthenticatedUser;
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError("Invalid or expired token", StatusCodes.UNAUTHORIZED);
  }
}
