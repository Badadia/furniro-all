import type { Request, Response, NextFunction } from "express";
import AppError from "../exceptions/appError";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const timestamp = new Date().toISOString();

  if (err instanceof AppError) {
    console.warn(`[${timestamp}] AppError (${err.statusCode}): ${err.message}`);
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  console.error(`[${timestamp}] CRITICAL ERROR:`, {
    message: err.message,
    path: req.url,
    method: req.method,
  });
  res.status(500).json({
    error: "Internal Server Error",
  });
};

export default errorHandler;
