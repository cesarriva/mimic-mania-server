import { StatusCodes } from "http-status-codes";

export type AppErrorStatus = "fail" | "error";

class AppError extends Error {
  statusCode: StatusCodes;
  status?: AppErrorStatus;
  isOperational: boolean;

  constructor(message: string, statusCode: StatusCodes) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
