import { contactRepo } from "../data-source";
import { Contact } from "../entities/contact.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import { TContactResponse } from "../interfaces/contact.interface";
import { contactSchemaResponse } from "../schemas/contact.schema";

const deleteContactService = async (
  dataId: number,
  userInfo: User
): Promise<void> => {
  const contact: Contact | null = await contactRepo.findOne({
    where: {
      id: dataId,
      user: userInfo,
    },
  });

  if (contact) {
    await contactRepo.remove(contact);
  } else {
    throw new AppError("Contato não encontrado", 404);
  }
};

export { deleteContactService };
