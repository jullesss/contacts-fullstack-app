import { Request, Response } from "express";
import { createUserService } from "../services/createUser.service";
import {
  TUser,
  TUserResponse,
  TUserUpdateRequest,
} from "../interfaces/user.interface";
import { listUsersService } from "../services/listUser.service";
import { deleteUsersService } from "../services/deleteUser.service";
import { updateUserService } from "../services/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const newUser = await createUserService(req.body);
  return res.status(201).json(newUser);
};

const listUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: TUser = res.locals.userInfo;
  const user: TUserResponse = await listUsersService(data);
  return res.json(user);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userInfo = res.locals.userInfo;
  await deleteUsersService(userInfo);
  return res.status(204).send();
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserUpdateRequest = req.body;
  const foundUser = res.locals.userInfo;

  const updateUser: TUserResponse = await updateUserService(
    userData,
    foundUser
  );

  return res.status(200).json(updateUser);
};

export {
  createUserController,
  listUserController,
  deleteUserController,
  updateUsersController,
};
