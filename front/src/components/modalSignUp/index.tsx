import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../services/api";
import { Modal } from "../../components/modal/index.tsx";
import { RegisterData, schema } from "./validator";

export interface ModalRegisterUser {
  toggleModal: () => void;
  children: string;
}

export const ModalRegisterUser = ({ toggleModal }: ModalRegisterUser) => {
  const { register, handleSubmit } = useForm<RegisterData>({
    resolver: zodResolver(schema),
  });

  const createUser = async (data: RegisterData) => {
    await api.post<RegisterData>("/user", data);
    toggleModal();
  };

  return (
    <Modal toggleModal={toggleModal}>
      <form onSubmit={handleSubmit(createUser)}>
        <label htmlFor="firstName">Nome</label>
        <input type="text" id="firstName" {...register("firstName")} />

        <label htmlFor="lastName">Sobrenome</label>
        <input type="text" id="lastName" {...register("lastName")} />

        <label htmlFor="phone">Telefone</label>
        <input type="text" id="phone" {...register("phone")} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="password">Senha</label>
        <input type="password" id="password" {...register("password")} />

        <button type="submit" className="submitBtn">
          Criar conta
        </button>
      </form>
    </Modal>
  );
};
