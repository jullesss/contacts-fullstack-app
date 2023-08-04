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
        <input
          type="text"
          id="firstName"
          {...register("firstName")}
          placeholder="Ex.: Vin"
        />

        <label htmlFor="lastName">Sobrenome/Referência</label>
        <input
          type="text"
          id="lastName"
          {...register("lastName")}
          placeholder="Terapeuta"
        />

        <label htmlFor="phone">Telefone</label>
        <input
          type="text"
          id="phone"
          {...register("phone")}
          placeholder="(99) 99999-9999"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="aaaa@aaa.com"
        />

        <button type="submit" className="submitBtn">
          Feito!
        </button>
      </form>
    </Modal>
  );
};
