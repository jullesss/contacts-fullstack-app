import React from "react";
import { Dispatch } from "react";
import { Contact } from "../../pages/Dashboard/index.tsx";
import { useForm } from "react-hook-form";
import { ContactData, contactSchema } from "./validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../services/api";
import { Modal } from "../../components/modal/index.tsx";
import { toast } from "react-toastify";

export interface ModalAddContact {
  toggleModal: () => void;
  setContact: Dispatch<React.SetStateAction<Contact[]>>;
}

export const ModalAddContact = ({
  setContact,
  toggleModal,
}: ModalAddContact) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });

  const createContact = async (data: ContactData) => {
    try {
      const response = await api.post<Contact>("/contact", data);
      setContact((previousContact) => [response.data, ...previousContact]);
      toggleModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
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
        {errors.firstName && <span>{errors.firstName.message} </span>}

        <label htmlFor="lastName">Sobrenome/Referência</label>
        <input
          type="text"
          id="lastName"
          {...register("lastName")}
          placeholder="Terapeuta"
        />
        {errors.lastName && <span>{errors.lastName.message} </span>}

        <label htmlFor="phone">Telefone</label>
        <input
          type="number"
          id="phone"
          {...register("phone")}
          placeholder="(99) 99999-9999"
        />
        {errors.phone && <span>{errors.phone.message} </span>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="aaaa@aaa.com"
        />
        {errors.email && <span>{errors.email.message} </span>}

        <button type="submit" className="submitBtn">
          Feito!
        </button>
      </form>
    </Modal>
  );
};
