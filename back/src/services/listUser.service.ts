import { TUser, TUserResponse } from "../interfaces/user.interface";
import { userSchemaResponse } from "../schemas/user.schema";

const listUsersService = async (data: TUser): Promise<TUserResponse> => {
  return userSchemaResponse.parse(data);
};

export { listUsersService };
