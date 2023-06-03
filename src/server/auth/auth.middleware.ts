import { Request, Response, NextFunction } from "express";
import SocketIO from "socket.io";
import { ISecurityUtils } from "../../utils/security.utils";
import AppError from "../error-handlers/app-error";
import { StatusCodes } from "http-status-codes";
import { IAuthRepository } from "./auth.repository";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../socket";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export interface IAuthMiddleware {
  authenticate: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  authenticateSocketClient: (
    socket: SocketIO.Socket,
    next: (err?: any) => void
  ) => Promise<void>;
}

export const makeAuthenticationMiddleware = ({
  securityUtils,
  authRepository,
}: {
  securityUtils: ISecurityUtils;
  authRepository: IAuthRepository;
}): IAuthMiddleware => {
  const authenticate = async (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {
    try {
      const token = getTokenFromRequestHeader(req);

      const decoded = await securityUtils.verifyJsonWebToken(
        token,
        process.env.JWT_SECRET!
      );

      const user = await authRepository.getUserById(decoded.id);
      if (!user) {
        throw new AppError(
          "User for JWT Token was not found.",
          StatusCodes.UNAUTHORIZED
        );
      }

      req.authenticatedUser = user;
      next();
    } catch (error) {
      next(error);
    }
  };

  const authenticateSocketClient = async (
    socket: SocketIO.Socket<any, any, any, SocketData>,
    next: (err?: any) => void
  ) => {
    try {
      const token = getTokenFromClientSocket(socket);

      const decoded = await securityUtils.verifyJsonWebToken(
        token,
        process.env.JWT_SECRET!
      );

      const user = await authRepository.getUserById(decoded.id);
      if (!user) {
        throw new AppError(
          "User for JWT Token was not found.",
          StatusCodes.UNAUTHORIZED
        );
      }

      socket.data.authenticatedUser = user;

      next();
    } catch (error) {
      next(error);
    }
  };

  return Object.freeze({
    authenticate,
    authenticateSocketClient,
  });
};

const getTokenFromRequestHeader = (req: Request): string => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    throw new AppError("Client not authenticated", StatusCodes.UNAUTHORIZED);
  }
  const [, token] = req.headers.authorization.split(" ");
  return token;
};

const getTokenFromClientSocket = (socket: SocketIO.Socket): string => {
  const token = socket.handshake.auth.token;

  if (!token) {
    throw new AppError("Token not provided", StatusCodes.UNAUTHORIZED);
  }

  return token;
};
