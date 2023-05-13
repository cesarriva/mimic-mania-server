import { Handler, Request, Response, NextFunction } from "express";

export const catchAsync = (request: Handler): Handler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await request(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
