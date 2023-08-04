import React from "react";
import { api } from "../../services/api";
import { Modal } from "../../components/modal/index.tsx";
import { useNavigate } from "react-router-dom";
import { Contact } from "pages/Dashboard/index.tsx";

export interface ModalDeleteAcc {
  personalInfo: Contact | undefined;
  toggleModal: () => void;
}

export const ModalDeleteAcc = ({ toggleModal }: ModalDeleteAcc) => {
  const navigate = useNavigate();

  const deleteAcc = async () => {
    const token = localStorage.getItem("my-contacts:token");
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    await api.delete("user");
    localStorage.removeItem("my-contacts:token");
    navigate("/");
  };

  return (
    <Modal toggleModal={toggleModal}>
      <div>
        <p>Tem certeza que deseja excluir permanenetemente sua conta?</p>
        <p>Tenha em mente que todos os seus contatos serão excluídos também.</p>
      </div>

      <div>
        <button onClick={toggleModal}>Cancelar</button>
        <button onClick={deleteAcc}>Tenho, excluir</button>
      </div>
    </Modal>
  );
};
