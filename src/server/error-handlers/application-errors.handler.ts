import e, { Request, Response, NextFunction } from "express";
import AppError, { AppErrorStatus } from "./app-error";
import { StatusCodes } from "http-status-codes";

const resolveDevelopmentErrors = (error: AppError, res: Response) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error,
    stack: error.stack,
  });
};

const resolveProductionErrors = (error: AppError, res: Response) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

export function applicationErrorsHandler(
  error: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  error.statusCode =
    error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
  error.status = error.status ?? "error";

  if (process.env.NODE_ENV === "development") {
    resolveDevelopmentErrors(error, res);
  } else {
    console.group("------ ERROR: ------");
    console.log(error);
    console.groupEnd();
    resolveProductionErrors(error, res);
  }
}
