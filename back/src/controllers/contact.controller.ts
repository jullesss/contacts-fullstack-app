import { Response, Request } from "express";
import { createContactService } from "../services/createContact.service";
import { listContactService } from "../services/listContact.services";
import { listAllContactsService } from "../services/listAllContacts.service";
import { deleteContactService } from "../services/deleteContact.service";
import { updateContactService } from "../services/updateContact.service";

const createContactController = async (req: Request, res: Response) => {
  const userInfo = res.locals.userInfo;
  const newContact = await createContactService(req.body, userInfo);

  return res.status(201).json(newContact);
};

const listContactController = async (req: Request, res: Response) => {
  const userInfo = res.locals.userInfo;
  const dataId = Number(req.params.id);
  const contact = await listContactService(dataId, userInfo);

  return res.json(contact);
};

const listAllContactsController = async (req: Request, res: Response) => {
  const userInfo = res.locals.userInfo;
  const contacts = await listAllContactsService(userInfo);

  return res.json(contacts);
};

const updateContactController = async (req: Request, res: Response) => {
  const userInfo = res.locals.userInfo;
  const dataId = Number(req.params.id);
  const bodyData = req.body;

  const updateContact = await updateContactService(dataId, bodyData, userInfo);

  return res.json(updateContact);
};

const deleteContactController = async (req: Request, res: Response) => {
  const userInfo = res.locals.userInfo;
  const dataId = Number(req.params.id);
  await deleteContactService(dataId, userInfo);
  res.status(204).send();
};

export {
  createContactController,
  listContactController,
  listAllContactsController,
  deleteContactController,
  updateContactController,
};
