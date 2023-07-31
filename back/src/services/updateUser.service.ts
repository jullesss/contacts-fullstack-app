import { userRepo } from "../data-source";
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
  const updateUser = userRepo.create({
    ...foundUser,
    ...userData,
  });

  await userRepo.save(updateUser);

  const userValid: TUserResponse = userSchemaResponse.parse(updateUser);

  return userValid;
};
