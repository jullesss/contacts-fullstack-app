import { compare } from "bcryptjs";
import { userRepo } from "../data-source";
import { AppError } from "../errors/appError";
import { TLoginRequest, TLoginResponse } from "../interfaces/login.interface";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../entities/user.entity";

const createTokenService = async (
  data: TLoginRequest
): Promise<TLoginResponse> => {
  const email = data.email;
  const password = data.password;

  const user: User | null = await userRepo.findOne({
    where: { email },
  });

  if (!user) {
    throw new AppError("Credenciais inválidas", 403);
  }
  console.log(password);
  console.log(user.password);

  const passwordCheck = compare(password, user.password);
  console.log(passwordCheck);
  if (!passwordCheck) {
    throw new AppError("Credenciais inválidas", 403);
  }

  const token = jwt.sign(
    { userName: user.firstName },
    process.env.SECRET_KEY!,
    { expiresIn: "2h", subject: user.email }
  );

  return { token };
};

export { createTokenService };
