import { asClass, asValue, createContainer } from "awilix";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma-client";

import AuthController, {
  IAuthService,
} from "../express-server/auth/auth.service";

interface IContainer {
  authService: IAuthService;
  prismaClient: PrismaClient;
}

const container = createContainer<IContainer>();
container.register({
  authService: asClass(AuthController).scoped(),
  prismaClient: asValue(prisma),
});

export default container;
