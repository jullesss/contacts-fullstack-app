import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserController,
  updateUsersController,
} from "../controllers/user.controller";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid.middleware";
import { userSchemaRequest } from "../schemas/user.schema";
import { ensureTokenMiddleware } from "../middlewares/ensureToken.middleware";
import { ensureIsTheOwner } from "../middlewares/ensureIsTheOwner.middleware";

const userRoutes = Router();

userRoutes.post("", ensureDataIsValid(userSchemaRequest), createUserController);
userRoutes.get("", ensureTokenMiddleware, ensureIsTheOwner, listUserController);
userRoutes.delete(
  "",
  ensureTokenMiddleware,
  ensureIsTheOwner,
  deleteUserController
);
userRoutes.patch(
  "",
  ensureTokenMiddleware,
  ensureIsTheOwner,
  updateUsersController
);

export { userRoutes };
