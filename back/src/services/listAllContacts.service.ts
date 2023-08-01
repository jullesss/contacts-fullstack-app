import { contactRepo } from "../data-source";
import { Contact } from "../entities/contact.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import { TContactListResponse } from "../interfaces/contact.interface";
import { contactSchemaResponseList } from "../schemas/contact.schema";

const listAllContactsService = async (
  userInfo: User
): Promise<TContactListResponse> => {
  const contactList: Contact[] | null = await contactRepo.find({
    where: {
      user: userInfo,
    },
  });

  if (!contactList) {
    throw new AppError("Nenhum contato encontrado", 404);
  }

  return contactSchemaResponseList.parse(contactList);
};

export { listAllContactsService };
