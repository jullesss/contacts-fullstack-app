import React from "react";
import { api } from "../../services/api";
import { Modal } from "../../components/modal/index.tsx";
import { Contact } from "pages/Dashboard/index.tsx";

export interface ModalDeleteContact {
  toDeleteContact: Contact | undefined;
  toggleModal: () => void;
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

export const ModalDeleteContact = ({
  toggleModal,
  toDeleteContact,
  setContacts,
}: ModalDeleteContact) => {
  const deleteContact = async () => {
    const id = toDeleteContact?.id;
    const token = localStorage.getItem("my-contacts:token");
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    await api.delete(`contact/${id}`);
    toggleModal();
    const contactsResponse = await api.get<Contact[]>("contact");
    setContacts(contactsResponse.data);
  };

  return (
    <Modal toggleModal={toggleModal}>
      <div>
        <p>Tem certeza que deseja excluir esse contato?</p>
      </div>

      <div className="buttonsDiv">
        <button onClick={toggleModal}>Cancelar</button>
        <button onClick={deleteContact}>Tenho, excluir</button>
      </div>
    </Modal>
  );
};
