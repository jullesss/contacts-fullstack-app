import { Router } from "express";
import { createTokenController } from "../controllers/token.controller";

const sessionRoute = Router();

sessionRoute.post("", createTokenController);

export { sessionRoute };
