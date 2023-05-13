import { Request, Response, NextFunction } from "express";
import { ISecurityUtils } from "../../utils/security.utils";
import AppError from "../error-handlers/app-error";
import { StatusCodes } from "http-status-codes";
import { IAuthRepository } from "./auth.repository";

export interface IAuthMiddleware {
    authenticate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
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

  return Object.freeze({
    authenticate,
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
