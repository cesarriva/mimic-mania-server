declare module "xss-clean" {
  import { Response, NextFunction, Request } from "express";

  const xssFn: () => (req: Request, res: Response, next: NextFunction) => void;

  export default xssFn;
}
