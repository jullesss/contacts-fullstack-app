import { contactRepo, userRepo } from "../data-source";
import { Contact } from "../entities/contact.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import {
  TContactRequest,
  TContactResponse,
} from "../interfaces/contact.interface";
import { contactSchema } from "../schemas/contact.schema";

const createContactService = async (
  data: TContactRequest,
  userInfo: User
): Promise<TContactResponse> => {
  const email = data.email;
  const phone = data.phone;

  const foundContactByEmail: Contact | null = await contactRepo.findOne({
    where: {
      email: email,
      user: userInfo,
    },
  });

  if (foundContactByEmail) {
    throw new AppError("Já existe um contato cadastrado com esse email", 409);
  }

  const foundContactByPhone: Contact | null = await contactRepo.findOne({
    where: {
      phone: phone,
      user: userInfo,
    },
  });

  if (foundContactByPhone) {
    throw new AppError("Já existe um contato cadastrado com esse número", 409);
  }

  const contact = contactRepo.create({
    ...data,
    user: userInfo,
  });

  await contactRepo.save(contact);

  return contactSchema.parse(contact);
};

export { createContactService };
