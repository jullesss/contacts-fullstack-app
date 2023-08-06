import React from "react";
import { Contact } from "../../pages/Dashboard/index.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../services/api";
import { Modal } from "../../components/modal/index.tsx";
import { EditContactData, schema } from "./validator.ts";

export interface ModalEditContact {
  toEditContact: Contact | undefined;
  toggleModal: () => void;
  children: string;
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

export const ModalEditContact = ({
  toggleModal,
  toEditContact,
  setContacts,
}: ModalEditContact) => {
  const { register, handleSubmit } = useForm<EditContactData>({
    resolver: zodResolver(schema),
  });
  const id: number | undefined = toEditContact?.id;

  const editContact = async (data: EditContactData) => {
    const newData = {
      firstName:
        data.firstName == "" ? toEditContact?.firstName : data.firstName,
      lastName: data.lastName == "" ? toEditContact?.lastName : data.lastName,
      phone: data.phone == "" ? toEditContact?.phone : data.phone,
      email: data.email == "" ? toEditContact?.email : data.email,
    };
    await api.patch<Contact>(`/contact/${id}/`, newData);
    const contactsResponse = await api.get<Contact[]>("contact");
    setContacts(contactsResponse.data);
    toggleModal();
  };

  return (
    <Modal toggleModal={toggleModal}>
      <form onSubmit={handleSubmit(editContact)}>
        <label htmlFor="firstName">Nome</label>
        <input
          type="text"
          id="firstName"
          {...register("firstName")}
          placeholder={toEditContact?.firstName}
        />

        <label htmlFor="lastName">Sobrenome</label>
        <input
          type="text"
          id="lastName"
          {...register("lastName")}
          placeholder={toEditContact?.lastName}
        />

        <label htmlFor="phone">Telefone</label>
        <input
          type="number"
          id="phone"
          {...register("phone")}
          placeholder={toEditContact?.phone}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...register("email")}
          placeholder={toEditContact?.email}
        />

        <button type="submit" className="submitBtn">
          Editar contato
        </button>
      </form>
    </Modal>
  );
};
