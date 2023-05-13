import { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';

/**
 * Interface to mimic the bcrypt external module
 */
export interface IBCrypt {
  genSalt: (rounds?: number) => Promise<string>;
  compare: (s: string, hash: string) => Promise<boolean>;
  hash: (s: string, salt: number | string) => Promise<string>;
}

/**
 * Interface to mimic the jsonwebtoken external module
 */
export interface IJwt {
  sign: (payload: string | Buffer | object, secretOrPrivateKey: Secret, options?: SignOptions) => string | undefined;
  verify: (token: string, secretOrPublicKey: Secret, options?: VerifyOptions) => object | string;
}
