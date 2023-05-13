import { asClass, asFunction, asValue, createContainer } from "awilix";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma-client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AuthService, { IAuthService } from "../server/auth/auth.service";
import AuthRepository, {
  IAuthRepository,
} from "../server/auth/auth.repository";
import { IBCrypt, IJwt } from "./external-modules.interface";
import { ISecurityUtils, SecurityUtils } from "../utils/security.utils";
import {
  IAuthMiddleware,
  makeAuthenticationMiddleware,
} from "../server/auth/auth.middleware";

interface IContainer {
  //Services
  authService: IAuthService;

  //Repositories
  authRepository: IAuthRepository;
  prismaClient: PrismaClient;

  //Utils
  securityUtils: ISecurityUtils;

  //Middleware
  authMiddleware: IAuthMiddleware;

  //External modules
  bcrypt: IBCrypt;
  jwt: IJwt;
}

const container = createContainer<IContainer>();
container.register({
  authService: asClass(AuthService).scoped(),
  authRepository: asClass(AuthRepository).scoped(),
  prismaClient: asValue(prisma),
  securityUtils: asClass(SecurityUtils).scoped(),
  authMiddleware: asFunction(makeAuthenticationMiddleware).scoped(),
  bcrypt: asValue(bcrypt),
  jwt: asValue(jwt),
});

export default container;
