import React from "react";
import { Dispatch } from "react";
import { Contact } from "../../pages/Dashboard/index.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../services/api";
import { Modal } from "../../components/modal/index.tsx";
import { EditContactData, schemaaaa } from "./validator.ts";

export interface ModalEditContact {
  toEditContact: Contact | undefined;
  /*   contact: Contact | undefined;
   */ toggleModal: () => void;
  setContact: Dispatch<React.SetStateAction<Contact[]>>;
  children: string;
}

export const ModalEditContact = ({
  setContact,
  toggleModal,
  toEditContact,
}: ModalEditContact) => {
  const { register, handleSubmit } = useForm<EditContactData>({
    resolver: zodResolver(schemaaaa),
  });
  console.log(toEditContact);
  const id: number | undefined = toEditContact?.id;

  const editContact = async (data: EditContactData) => {
    const response = await api.patch<Contact>(`/contact/${id}/`, data);

    setContact((previousContact) => [response.data, ...previousContact]);
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
          type="text"
          id="phone"
          {...register("phone")}
          placeholder={toEditContact?.phone}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
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
