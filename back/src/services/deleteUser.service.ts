import { userRepo } from "../data-source";
import { TUser } from "../interfaces/user.interface";

const deleteUsersService = async (userInfo: TUser): Promise<void> => {
  await userRepo.delete(userInfo);
  return;
};

export { deleteUsersService };
