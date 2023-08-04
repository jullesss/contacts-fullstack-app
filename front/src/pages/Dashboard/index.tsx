import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { api } from "../../services/api";
import { ModalAddContact } from "../../components/modalAddContact/index.tsx";
import { ModalEditUser } from "../../components/modalEditUser/index.tsx";
import { ModalEditContact } from "../../components/modalEditContact/index.tsx";

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: string;
}

export const Dashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [personalInfo, setPersonalInfo] = useState<Contact>();

  const [toEditContact, setToEditContact] = useState<Contact>();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = () => setIsOpenModal(!isOpenModal);

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const toggleEditModal = () => setIsOpenEditModal(!isOpenEditModal);

  const [isOpenEditContactModal, setIsOpenEditContactModal] = useState(false);
  const toggleEditContactModal = () =>
    setIsOpenEditContactModal(!isOpenEditContactModal);

  useEffect(() => {
    (async () => {
      const personalInfoResponse = await api.get<Contact>("user");
      setPersonalInfo(personalInfoResponse.data);

      const contactsResponse = await api.get<Contact[]>("contact");
      setContacts(contactsResponse.data);
    })();
  }, []);

  const openEditContactModal = (contact: Contact) => {
    setIsOpenEditContactModal(!isOpenEditContactModal);
    setToEditContact(contact);
  };

  return (
    <>
      <section>
        <h3>
          {personalInfo?.firstName} {personalInfo?.lastName}
        </h3>
        <h4> {personalInfo?.phone} </h4>
        <h4> {personalInfo?.email} </h4>
        <span> Conta crida em {personalInfo?.createdAt}</span>
        <div onClick={toggleEditModal}>
          <BiEditAlt />
          <div>
            <BsTrash />
          </div>
        </div>
      </section>
      <main>
        <button type="button" onClick={toggleModal}>
          Criar novo contato
        </button>
        {isOpenModal && (
          <ModalAddContact
            setContact={setContacts}
            toggleModal={toggleModal}
          ></ModalAddContact>
        )}
        <ul>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <li key={contact.id}>
                <div>
                  {contact.firstName} {contact.lastName} {contact.phone}
                  {contact.email} <span>Criado em {contact.createdAt}</span>
                </div>
                <div onClick={() => openEditContactModal(contact)}>
                  <BiEditAlt />
                </div>
                <div>
                  <BsTrash />
                </div>
              </li>
            ))
          ) : (
            <p>Nenhum contato cadastrado</p>
          )}
        </ul>
      </main>
      {isOpenEditModal && (
        <ModalEditUser
          personalInfo={personalInfo}
          toggleModal={toggleEditModal}
        >
          Editar
        </ModalEditUser>
      )}

      {isOpenEditContactModal && (
        <ModalEditContact
          toEditContact={toEditContact}
          setContact={setContacts}
          /*           contact={contact}
           */ toggleModal={toggleEditContactModal}
        >
          Editar
        </ModalEditContact>
      )}
    </>
  );
};
