import { contactRepo, userRepo } from "../data-source";
import { Contact } from "../entities/contact.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import { TContactResponse } from "../interfaces/contact.interface";
import { TUserUpdateRequest } from "../interfaces/user.interface";
import { contactSchemaResponse } from "../schemas/contact.schema";

const updateContactService = async (
  dataId: number,
  bodyData: TUserUpdateRequest,
  userInfo: User
): Promise<TContactResponse> => {
  const { phone, email } = bodyData;

  const contact: Contact | null = await contactRepo.findOne({
    where: {
      id: dataId,
      user: userInfo,
    },
  });

  if (!contact) {
    throw new AppError("Contato não encontrado", 404);
  }

  const foundContactByEmail: Contact | null = await contactRepo.findOne({
    where: {
      email: email!,
      user: userInfo,
    },
  });

  if (foundContactByEmail && foundContactByEmail.id != dataId) {
    throw new AppError("Já existe um contato cadastrado com esse email", 409);
  }

  const foundContactByPhone: Contact | null = await contactRepo.findOne({
    where: {
      phone: phone!,
      user: userInfo,
    },
  });

  if (foundContactByPhone && foundContactByPhone.id != dataId) {
    throw new AppError("Já existe um contato cadastrado com esse número", 409);
  }

  const oldContact = await contactRepo.findOneBy({ id: dataId });

  if (!oldContact) {
    throw new AppError("Contato não encontrado", 404);
  }

  const updateContact = contactRepo.create({
    ...oldContact,
    ...bodyData,
  });

  await contactRepo.save(updateContact);

  const contactValid: TContactResponse =
    contactSchemaResponse.parse(updateContact);

  return contactValid;
};

export { updateContactService };
