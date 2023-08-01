import { Request, Response, NextFunction } from "express";
import { userRepo } from "../data-source";
import { User } from "../entities/user.entity";

const ensureIsTheOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userMail = res.locals.userMail;

  const userInfo: User | null = await userRepo.findOne({
    where: {
      email: userMail,
    },
  });

  res.locals.userInfo = userInfo;

  return next();
};
export { ensureIsTheOwner };
