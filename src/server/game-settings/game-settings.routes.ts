import express, { Request, Response } from "express";
import container from "../../dependency-injection/container";
import { catchAsync } from "../error-handlers/catch-async";

const router = express.Router();

const { authenticate } = container.cradle.authMiddleware;
const { gameSettingsService } = container.cradle;

const getWordCategoriesRequest = async (_req: Request, res: Response) => {
  const categories = await gameSettingsService.getWordCategories();

  res.send(categories);
};

router.get(
  "/word-categories",
  authenticate,
  catchAsync(getWordCategoriesRequest)
);

export { router as gameSettingsRouter };
