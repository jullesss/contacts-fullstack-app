import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { api } from "../../services/api";
import { ModalAddContact } from "../../components/modalAddContact/index.tsx";
import { ModalEditUser } from "../../components/modalEditUser/index.tsx";
import { ModalEditContact } from "../../components/modalEditContact/index.tsx";
import { ModalDeleteAcc } from "../../components/modalDeleteAcc/index.tsx";
import { ModalDeleteContact } from "../../components/modalDeleteContact/index.tsx";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: string;
  password: string;
}

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: string;
}

export const Dashboard = () => {
  const [personalInfo, setPersonalInfo] = useState<User>();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(
    () => {
      (async () => {
        const personalInfoResponse = await api.get<User>("user");
        setPersonalInfo(personalInfoResponse.data);
        getContacts();
      })();
    },
    [
      /* contacts */
    ]
  );

  const getContacts = async () => {
    const contactsResponse = await api.get<Contact[]>("contact");
    setContacts(contactsResponse.data);
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = () => setIsOpenModal(!isOpenModal);

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const toggleEditModal = () => setIsOpenEditModal(!isOpenEditModal);

  const [isOpenDeleteAccModal, setIsOpenDeleteAccModal] = useState(false);
  const toggleDeleteAccModal = () => {
    setIsOpenDeleteAccModal(!isOpenDeleteAccModal);
  };

  const [toEditContact, setToEditContact] = useState<Contact>();
  const [isOpenEditContactModal, setIsOpenEditContactModal] = useState(false);
  const toggleEditContactModal = () =>
    setIsOpenEditContactModal(!isOpenEditContactModal);
  const openEditContactModal = (contact: Contact) => {
    toggleEditContactModal();
    setToEditContact(contact);
  };

  const [toDeleteContact, setToDeleteContact] = useState<Contact>();
  const [isOpenDeleteContactModal, setIsOpenDeleteContactModal] =
    useState(false);
  const toggleDeleteContactModal = () =>
    setIsOpenDeleteContactModal(!isOpenDeleteContactModal);
  const openDeleteContactModal = (contact: Contact) => {
    toggleDeleteContactModal();
    setToDeleteContact(contact);
  };

  const search = (event: { preventDefault: () => void }) => {
    console.log(searchValue);
    event.preventDefault();

    if (searchValue !== "") {
      const searchResults = contacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          contact.phone.toLowerCase().includes(searchValue.toLowerCase())
      );
      console.log(searchResults);
      setContacts(searchResults);

      if (searchResults.length === 0) {
        setContacts(contacts);
        setSearchValue("");
      }
    } else {
      getContacts();
    }
    setSearchValue("");
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
        </div>
        <div onClick={toggleDeleteAccModal}>
          <BsTrash />
        </div>
      </section>
      <main>
        <div>
          <label htmlFor="searchContact">Pesquise um contato</label>
          <input
            type="text"
            id="searchContact"
            placeholder="Digite o nome..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={search} type="submit">
            Pesquisar
          </button>
        </div>
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
                <div onClick={() => openDeleteContactModal(contact)}>
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
          setPersonalInfo={setPersonalInfo}
        >
          Editar
        </ModalEditUser>
      )}

      {isOpenDeleteAccModal && (
        <ModalDeleteAcc
          personalInfo={personalInfo}
          toggleModal={toggleDeleteAccModal}
        />
      )}

      {isOpenEditContactModal && (
        <ModalEditContact
          toEditContact={toEditContact}
          toggleModal={toggleEditContactModal}
        >
          Editar
        </ModalEditContact>
      )}

      {isOpenDeleteContactModal && (
        <ModalDeleteContact
          toDeleteContact={toDeleteContact}
          toggleModal={toggleDeleteContactModal}
        ></ModalDeleteContact>
      )}
    </>
  );
};
