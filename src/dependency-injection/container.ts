import { asClass, createContainer } from "awilix";

import AuthController, {
  IAuthService,
} from "../express-server/auth/auth.service";

interface IContainer {
  //Services
  authService: IAuthService;
}

const container = createContainer<IContainer>();
container.register({
  authService: asClass(AuthController).scoped(),
});

export default container;
