import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { method, url, body, query } = req;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url}`);

  const safeQuery = query || {};
  if (Object.keys(safeQuery).length > 0) {
    console.log("  Query Params:", JSON.stringify(safeQuery, null, 2));
  }

  const safeBody = body || {};
  if (method !== "GET" && Object.keys(safeBody).length > 0) {
    console.log("  Body:", JSON.stringify(safeBody, null, 2));
  }

  next();
};
