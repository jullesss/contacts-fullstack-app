import { contactRepo } from "../data-source";
import { Contact } from "../entities/contact.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import { TContactResponse } from "../interfaces/contact.interface";
import { contactSchemaResponse } from "../schemas/contact.schema";

const listContactService = async (
  dataId: number,
  userInfo: User
): Promise<TContactResponse> => {
  const contact: Contact | null = await contactRepo.findOne({
    where: {
      id: dataId,
      user: userInfo,
    },
  });

  if (!contact) {
    throw new AppError("Contato não encontrado", 404);
  }

  return contactSchemaResponse.parse(contact);
};

export { listContactService };
