import { compare } from "bcryptjs";
import { userRepo } from "../data-source";
import { AppError } from "../errors/appError";
import { TLoginRequest, TLoginResponse } from "../interfaces/login.interface";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createTokenService = async (
  data: TLoginRequest
): Promise<TLoginResponse> => {
  const { email, password } = data;
  const user = await userRepo.findOne({
    where: { email },
  });

  if (!user) {
    throw new AppError("Credenciais inválidas", 403);
  }
  const passwordCheck = await compare(password, user.password);

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
