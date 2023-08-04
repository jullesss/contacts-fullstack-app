import React from "react";
import { api } from "../../services/api";
import { Modal } from "../../components/modal/index.tsx";
import { Contact } from "pages/Dashboard/index.tsx";

export interface ModalDeleteContact {
  toDeleteContact: Contact | undefined;
  toggleModal: () => void;
}

export const ModalDeleteContact = ({
  toggleModal,
  toDeleteContact,
}: ModalDeleteContact) => {
  const deleteContact = async () => {
    const id = toDeleteContact?.id;
    const token = localStorage.getItem("my-contacts:token");
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    await api.delete(`contact/${id}`);
  };

  return (
    <Modal toggleModal={toggleModal}>
      <div>
        <p>Tem certeza que deseja excluir esse contato?</p>
      </div>

      <div>
        <button onClick={toggleModal}>Cancelar</button>
        <button onClick={deleteContact}>Tenho, excluir</button>
      </div>
    </Modal>
  );
};
