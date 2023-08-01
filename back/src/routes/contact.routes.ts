import { Router } from "express";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid.middleware";
import {
  contactSchema,
  contactSchemaRequest,
  contactSchemaUpdateRequest,
} from "../schemas/contact.schema";
import {
  createContactController,
  deleteContactController,
  listAllContactsController,
  listContactController,
  updateContactController,
} from "../controllers/contact.controller";
import { ensureTokenMiddleware } from "../middlewares/ensureToken.middleware";
import { ensureIsTheOwner } from "../middlewares/ensureIsTheOwner.middleware";

const contactRoutes = Router();

contactRoutes.post(
  "",
  ensureTokenMiddleware,
  ensureDataIsValid(contactSchemaRequest),
  ensureIsTheOwner,
  createContactController
);
contactRoutes.get(
  "/:id/",
  ensureTokenMiddleware,
  ensureIsTheOwner,
  listContactController
);
contactRoutes.get(
  "/",
  ensureTokenMiddleware,
  ensureIsTheOwner,
  listAllContactsController
);
contactRoutes.delete(
  "/:id/",
  ensureTokenMiddleware,
  ensureIsTheOwner,
  deleteContactController
);
contactRoutes.patch(
  "/:id/",
  ensureTokenMiddleware,
  ensureDataIsValid(contactSchemaUpdateRequest),
  ensureIsTheOwner,
  updateContactController
);
export { contactRoutes };
