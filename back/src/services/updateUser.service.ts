import { userRepo } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import {
  TUser,
  TUserResponse,
  TUserUpdateRequest,
} from "../interfaces/user.interface";
import { userSchemaResponse } from "../schemas/user.schema";

export const updateUserService = async (
  userData: TUserUpdateRequest,
  foundUser: TUser
): Promise<TUserResponse> => {
  const findUser: User | null = await userRepo.findOne({
    where: { email: userData.email! },
  });

  if (findUser) {
    throw new AppError("User com essas credencias já existe", 409);
  }

  const updateUser = userRepo.create({
    ...foundUser,
    ...userData,
  });

  await userRepo.save(updateUser);

  const userValid: TUserResponse = userSchemaResponse.parse(updateUser);

  return userValid;
};
