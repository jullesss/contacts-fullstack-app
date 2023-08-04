import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Modal } from "../../components/modal/index.tsx";
import { RegisterData, schema } from "../../components/modalSignUp/validator";
import { api } from "../../services/api.ts";
import { Contact } from "pages/Dashboard/index.tsx";

export interface ModalEditUser {
  personalInfo: Contact | undefined;
  toggleModal: () => void;
  children: string;
}
export const ModalEditUser = ({ toggleModal, personalInfo }: ModalEditUser) => {
  const { register, handleSubmit } = useForm<RegisterData>({
    resolver: zodResolver(schema),
  });

  const editUser = async (data: RegisterData) => {
    await api.patch<RegisterData>("/user", data);
    toggleModal();
  };

  return (
    <Modal toggleModal={toggleModal}>
      <form onSubmit={handleSubmit(editUser)}>
        <label htmlFor="firstName">Nome</label>
        <input
          type="text"
          id="firstName"
          {...register("firstName")}
          placeholder={personalInfo?.firstName}
        />

        <label htmlFor="lastName">Sobrenome</label>
        <input
          type="text"
          id="lastName"
          {...register("lastName")}
          placeholder={personalInfo?.lastName}
        />

        <label htmlFor="phone">Telefone</label>
        <input
          type="text"
          id="phone"
          {...register("phone")}
          placeholder={personalInfo?.phone}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder={personalInfo?.email}
        />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          {...register("password")}
          placeholder="******"
        />

        <button type="submit" className="submitBtn">
          Editar dados
        </button>
      </form>
    </Modal>
  );
};
