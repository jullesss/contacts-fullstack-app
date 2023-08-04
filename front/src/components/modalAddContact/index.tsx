import React from "react";
import { Dispatch } from "react";
import { Contact } from "../../pages/Dashboard";
import { useForm } from "react-hook-form";
import { ContactData, schema } from "./validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../services/api";
import { Modal } from "../../components/modal/index.tsx";

export interface ModalAddContact {
  toggleModal: () => void;
  setContact: Dispatch<React.SetStateAction<Contact[]>>;
}

export const ModalAddContact = ({
  setContact,
  toggleModal,
}: ModalAddContact) => {
  const { register, handleSubmit } = useForm<ContactData>({
    resolver: zodResolver(schema),
  });

  const createContact = async (data: ContactData) => {
    const response = await api.post<Contact>("/contact", data);

    setContact((previousContact) => [response.data, ...previousContact]);
    toggleModal();
  };

  return (
    <Modal toggleModal={toggleModal}>
      <form onSubmit={handleSubmit(createContact)}>
        <label htmlFor="firstName">Nome</label>
        <input type="text" id="firstName" {...register("firstName")} />

        <label htmlFor="lastName">Sobrenome</label>
        <input type="text" id="lastName" {...register("lastName")} />

        <label htmlFor="phone">Telefone</label>
        <input type="text" id="phone" {...register("phone")} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />

        <button type="submit" className="submitBtn">
          Feito!
        </button>
      </form>
    </Modal>
  );
};
