import express, { Request, Response } from "express";
import { IAuthService } from "./auth.service";
import container from "../../dependency-injection/container";

const router = express.Router();

const { registerUser, loginUser } = container.cradle.authService;

router.post(
  "/register",
  async (req: Request<{}, {}, RegisterPayload>, res: Response) => {
    const { email, name, password } = req.body;

    const user = await registerUser(email, name, password);
    res.send({
      data: {
        user,
      },
    });
  }
);

router.post("/login", (req: Request<{}, {}, LoginPayload>, res: Response) => {
  const { email, password } = req.body;

  loginUser(email, password);
  res.send({ data: "logged in" });
});

router.post("/logout", (req: Request, res: Response) => {
  res.send({ data: "logged out" });
});

interface RegisterPayload extends LoginPayload {
  name: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export { router as authRouter };
