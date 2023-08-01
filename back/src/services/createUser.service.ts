import { hash } from "bcryptjs";
import { userRepo } from "../data-source";
import { TUserRequest, TUserResponse } from "../interfaces/user.interface";
import { AppError } from "../errors/appError";
import { userSchemaResponse } from "../schemas/user.schema";
import { User } from "../entities/user.entity";

const createUserService = async (
  data: TUserRequest
): Promise<TUserResponse> => {
  const { email, firstName, lastName, password } = data;

  const findUser: User | null = await userRepo.findOne({
    where: { email },
  });

  if (findUser) {
    throw new AppError("User com essas credencias já existe", 409);
  }

  const hashPassword = await hash(password, 10);

  const user = userRepo.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });

  await userRepo.save(user);

  return userSchemaResponse.parse(user);
};

export { createUserService };
