import express, { NextFunction, Request, Response, Handler } from "express";
import container from "../../dependency-injection/container";
import { LoginPayload, UserCreatePayload } from "./auth.models";
import { catchAsync } from "../error-handlers/catch-async";

const router = express.Router();

const { registerUser, loginUser } = container.cradle.authService;
const { authenticate } = container.cradle.authMiddleware;

const registerRequest = async (
  req: Request<{}, {}, UserCreatePayload>,
  res: Response
) => {
  const { user, token } = await registerUser(req.body);

  res.send({
    user,
    token,
  });
};

const loginRequest = async (
  req: Request<{}, {}, LoginPayload>,
  res: Response
) => {
  const { user, token } = await loginUser(req.body);

  res.send({
    user,
    token,
  });
};

const logoutRequest = (_: Request, res: Response) => {
  res.send({
    ok: true,
  });
};

router.post("/register", catchAsync(registerRequest));

router.post("/login", catchAsync(loginRequest));

router.post("/logout", authenticate, catchAsync(logoutRequest));

export { router as authRouter };
