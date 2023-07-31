import { Request, Response, NextFunction } from "express";
import { userRepo } from "../data-source";

const ensureIsTheOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userMail = res.locals.userMail;

  const userInfo = await userRepo.findOne({
    where: {
      email: userMail,
    },
  });

  res.locals.userInfo = userInfo;

  return next();
};
export { ensureIsTheOwner };
