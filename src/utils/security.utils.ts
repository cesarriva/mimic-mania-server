import { promisify } from "util";
import {
  IBCrypt,
  IJwt,
} from "../dependency-injection/external-modules.interface";

export type DecodedToken = {
  id: number;
  refreshTokenVersion?: number;
  iat: number;
  exp: number;
};

export interface ISecurityUtils {
  generateHashedPassword: (password: string) => Promise<string>;
  validatePassword: (
    candidatePassword: string,
    hashedPassword: string
  ) => Promise<boolean>;
  generateJsonWebToken: (
    userId: number,
    secret: string,
    expiresIn?: string,
    refreshTokenVersion?: number
  ) => Promise<string | undefined>;
  verifyJsonWebToken: (token: string, secret: string) => Promise<DecodedToken>;
}

export class SecurityUtils implements ISecurityUtils {
  private readonly bcrypt: IBCrypt;
  private readonly jwt: IJwt;

  constructor({ bcrypt, jwt }: { bcrypt: IBCrypt; jwt: IJwt }) {
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  generateHashedPassword = async (password: string): Promise<string> => {
    const salt = await this.bcrypt.genSalt();
    return this.bcrypt.hash(password, salt);
  };

  validatePassword = async (
    candidatePassword: string,
    hashedPassword: string
  ): Promise<boolean> => {
    const isValidPassword = await this.bcrypt.compare(
      candidatePassword,
      hashedPassword
    );
    return isValidPassword;
  };

  generateJsonWebToken = async (
    userId: number,
    secret: string,
    expiresIn?: string,
    refreshTokenVersion?: number
  ): Promise<string | undefined> => {
    const options = expiresIn ? { expiresIn } : undefined;
    const token = (await promisify(this.jwt.sign)(
      { id: userId, refreshTokenVersion },
      secret,
      options
    )) as string | undefined;

    return token;
  };

  verifyJsonWebToken = async (
    token: string,
    secret: string
  ): Promise<DecodedToken> => {
    const decodedToken = (await promisify(this.jwt.verify)(
      token,
      secret,
      undefined
    )) as DecodedToken;

    return decodedToken;
  };
}
