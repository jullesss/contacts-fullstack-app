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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
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
        <input
          type="text"
          id="firstName"
          {...register("firstName")}
          placeholder="Ex.: Jun"
        />
        {errors.firstName && <span>{errors.firstName.message} </span>}

        <label htmlFor="lastName">Sobrenome</label>
        <input
          type="text"
          id="lastName"
          {...register("lastName")}
          placeholder="Khai"
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
          placeholder="aaa@aaa.com"
        />
        {errors.email && <span>{errors.email.message} </span>}

        <label htmlFor="password">Senha</label>
        <input
          type="text"
          id="password"
          {...register("password")}
          placeholder="aXy2*zloç!"
        />
        {errors.password && <span>{errors.password.message} </span>}

        <button type="submit" className="submitBtn">
          Criar conta
        </button>
      </form>
    </Modal>
  );
};
