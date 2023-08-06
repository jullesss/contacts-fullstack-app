import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Modal } from "../../components/modal/index.tsx";
import {
  UpdateData,
  updateUserSchema,
} from "../../components/modalSignUp/validator";
import { api } from "../../services/api.ts";
import { User } from "pages/Dashboard/index.tsx";

export interface ModalEditUser {
  personalInfo: User | undefined;
  toggleModal: () => void;
  children: string;
  setPersonalInfo: React.Dispatch<React.SetStateAction<User | undefined>>;
}
export const ModalEditUser = ({
  toggleModal,
  personalInfo,
  setPersonalInfo,
}: ModalEditUser) => {
  const { register, handleSubmit } = useForm<UpdateData>({
    resolver: zodResolver(updateUserSchema),
  });

  const editUser = async (data: UpdateData) => {
    const newData = {
      firstName:
        data.firstName == "" ? personalInfo?.firstName : data.firstName,
      lastName: data.lastName == "" ? personalInfo?.lastName : data.lastName,
      phone: data.phone == "" ? personalInfo?.phone : data.phone,
      email: data.email == "" ? personalInfo?.email : data.email,
      password: data.password == "" ? personalInfo?.password : data.password,
    };
    const response = await api.patch<User>("/user", newData);
    setPersonalInfo(response.data);
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
          type="number"
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
