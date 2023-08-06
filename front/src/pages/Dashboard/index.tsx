import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { api } from "../../services/api";
import { ModalAddContact } from "../../components/modalAddContact/index.tsx";
import { ModalEditUser } from "../../components/modalEditUser/index.tsx";
import { ModalEditContact } from "../../components/modalEditContact/index.tsx";
import { ModalDeleteAcc } from "../../components/modalDeleteAcc/index.tsx";
import { ModalDeleteContact } from "../../components/modalDeleteContact/index.tsx";
import { Header, Main, PersonalInfoSection } from "./index.ts";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const personalInfoResponse = await api.get<User>("user");
      setPersonalInfo(personalInfoResponse.data);
      getContacts();
    })();
  }, []);

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
    event.preventDefault();

    if (searchValue !== "") {
      const searchResults = contacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          contact.phone.toLowerCase().includes(searchValue.toLowerCase())
      );

      setContacts(searchResults);
    } else {
      getContacts();
    }
    setSearchValue("");
  };

  const logout = () => {
    localStorage.removeItem("my-contacts:token");
    navigate("/");
  };

  return (
    <div className="dashCover">
      <Header>
        <nav>
          <div>
            <img src="./contactIcon.svg" alt="ícone de contato" />
            <p>My Contacts</p>
          </div>
          <div id="logoutBtn" onClick={logout}>
            <FiLogOut />
          </div>
        </nav>
      </Header>
      <PersonalInfoSection>
        <div className="personalMainDiv">
          <h3>
            {personalInfo?.firstName} {personalInfo?.lastName}
          </h3>
          <h5> {personalInfo?.phone} </h5>
          <h5> {personalInfo?.email} </h5>
        </div>
        <div className="personalDetailsDiv">
          <div className="personalDetailsIcons">
            <div className="edit" onClick={toggleEditModal}>
              <BiEditAlt />
            </div>
            <div className="trash" onClick={toggleDeleteAccModal}>
              <BsTrash />
            </div>
          </div>
          <span className="accCreatedAt">
            {" "}
            Conta crida em <p> {personalInfo?.createdAt}</p>
          </span>
        </div>
      </PersonalInfoSection>
      <Main>
        <div className="divSearch">
          <div className="divSearchExplanation">
            <label htmlFor="searchContact">Pesquise um contato</label>
            <span>Por nome/email/telefone...</span>
          </div>
          <div className="divSubmit">
            <input
              type="text"
              id="searchContact"
              placeholder="Digite aqui..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button id="searchBtn" onClick={search} type="submit">
              <AiOutlineSearch />
            </button>
          </div>
        </div>
        <button id="createCttBtn" type="button" onClick={toggleModal}>
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
                <div id="contactMainDiv" className="personalMainDiv">
                  <p>
                    {" "}
                    {contact.firstName} {contact.lastName}
                  </p>
                  <div>
                    <h5>{contact.phone}</h5>
                    <h5>{contact.email}</h5>
                  </div>
                </div>
                <div className="personalDetailsDiv">
                  <div className="personalDetailsIcons">
                    <div
                      className="edit"
                      onClick={() => openEditContactModal(contact)}
                    >
                      <BiEditAlt />
                    </div>
                    <div
                      className="trash"
                      onClick={() => openDeleteContactModal(contact)}
                    >
                      <BsTrash />
                    </div>
                  </div>
                  <span className="accCreatedAt">
                    Criado em {contact.createdAt}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <p>Nenhum contato :o</p>
          )}
        </ul>
      </Main>
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
          setContacts={setContacts}
          toEditContact={toEditContact}
          toggleModal={toggleEditContactModal}
        >
          Editar
        </ModalEditContact>
      )}

      {isOpenDeleteContactModal && (
        <ModalDeleteContact
          setContacts={setContacts}
          toDeleteContact={toDeleteContact}
          toggleModal={toggleDeleteContactModal}
        ></ModalDeleteContact>
      )}
    </div>
  );
};
