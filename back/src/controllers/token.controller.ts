import { Request, Response } from "express";
import { createTokenService } from "../services/createToken.service";

const createTokenController = async (req: Request, res: Response) => {
  const token = await createTokenService(req.body);

  return res.json(token);
};

export { createTokenController };
