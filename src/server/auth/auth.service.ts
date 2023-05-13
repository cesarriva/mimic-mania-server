import { IAuthRepository } from "./auth.repository";
import {
  UserWithNoPassword,
  LoginPayload,
  UserCreatePayload,
  LoggedUser,
} from "./auth.models";
import { ISecurityUtils } from "../../utils/security.utils";
import AppError from "../error-handlers/app-error";
import { StatusCodes } from "http-status-codes";

export interface IAuthService {
  registerUser: (
    payload: UserCreatePayload
  ) => Promise<LoggedUser>;
  loginUser: (
    payload: LoginPayload
  ) => Promise<LoggedUser>;
}

export default class AuthService implements IAuthService {
  private securityUtils: ISecurityUtils;
  private authRepository: IAuthRepository;

  constructor({
    securityUtils,
    authRepository,
  }: {
    securityUtils: ISecurityUtils;
    authRepository: IAuthRepository;
  }) {
    this.securityUtils = securityUtils;
    this.authRepository = authRepository;
  }

  registerUser = async (
    payload: UserCreatePayload
  ): Promise<{ user: UserWithNoPassword; token?: string }> => {
    const hashedPassword = await this.securityUtils.generateHashedPassword(
      payload.password
    );

    const user = await this.authRepository.createUser({
      ...payload,
      password: hashedPassword,
    });

    const token = await this.generateToken(user.id);

    return {
      user,
      token,
    };
  };

  loginUser = async (
    payload: LoginPayload
  ): Promise<{ user: UserWithNoPassword; token?: string }> => {
    const { email, password } = payload;

    if (!email || !password || !email.length || !password.length) {
      throw new AppError(
        "Email and password are required",
        StatusCodes.BAD_REQUEST
      );
    }

    const user = await this.authRepository.getUserByEmail(email);
    const isValidPassword = await this.securityUtils.validatePassword(
      password,
      user?.password ?? ""
    );

    if (!user || !isValidPassword) {
      throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
    }

    const token = await this.generateToken(user.id);

    return {
      user,
      token,
    };
  };

  private generateToken = async (
    userId: number
  ): Promise<string | undefined> => {
    const token = await this.securityUtils.generateJsonWebToken(
      userId,
      process.env.JWT_SECRET!
    );
    return token;
  };
}
