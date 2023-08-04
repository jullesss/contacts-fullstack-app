import { contactRepo, userRepo } from "../data-source";
import { Contact } from "../entities/contact.entity";
import { TUser } from "../interfaces/user.interface";

const deleteUsersService = async (userInfo: TUser): Promise<void> => {
  const findContacts: Contact[] | null = await contactRepo.find({
    where: {
      user: userInfo,
    },
  });

  await contactRepo.remove(findContacts);
  await userRepo.delete(userInfo);
  return;
};

export { deleteUsersService };
