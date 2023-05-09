import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import xss from "xss-clean";
import { authRouter } from "./auth";
import { PrismaClient } from "@prisma/client";

const apiRoot = process.env.API_ROOT || "/api";

const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(xss());
app.use(express.static("public"));

app.get("/pega", async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  console.log('que porra', users);

  res.send({users});
});

app.use(`${apiRoot}/auth`, authRouter);

// api.all('*', handleExpressApiNotFound);

// api.use(handleApplicationErrors);

export default app;
