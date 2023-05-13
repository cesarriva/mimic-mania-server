import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import xss from "xss-clean";
import { authRouter } from "./auth";
import { apiNotFoundHandler } from "./error-handlers/api-not-found.handler";
import { applicationErrorsHandler } from "./error-handlers/application-errors.handler";

const apiRoot = process.env.API_ROOT || "/api";

const app: Express = express();

app.use(helmet());
app.use(cors({ origin: "http://localhost:19000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(xss());
app.use(express.static("public"));

app.use(`${apiRoot}/auth`, authRouter);

app.all("*", apiNotFoundHandler);
app.use(applicationErrorsHandler);

export default app;
