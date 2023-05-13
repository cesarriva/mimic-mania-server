import { Request, Response, NextFunction } from "express";
import AppError from "./app-error";
import { StatusCodes } from "http-status-codes";

/**
 * Request Handler for 404 requests
 * @param expressReq Express Request
 * @param expressRes Express Response
 * @param next Next Function
 */
export function apiNotFoundHandler(
  expressReq: Request,
  _: Response,
  next: NextFunction
) {
  next(
    new AppError(
      `Cannot find ${expressReq.originalUrl} on this API server!`,
      StatusCodes.NOT_FOUND
    )
  );
}
