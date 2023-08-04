import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { DivForm, Main } from "./style";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginData, schema } from "./validator";
import { AuthContext } from "../../contexts/AuthContext";
import { ModalRegisterUser } from "../../components/modalSignUp/index.tsx";

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = () => setIsOpenModal(!isOpenModal);

  const { signIn } = useContext(AuthContext);

  return (
    <>
      <Main>
        <div>
          <figure>
            <img src="./test.jpg" alt="" />
          </figure>
        </div>
        <DivForm>
          <section>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(signIn)}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" {...register("email")} />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" {...register("password")} />
              <button type="submit" className="submitBtn">
                Entrar
              </button>
            </form>
            <h4>
              Ainda não tem conta? Faça seu cadastro{" "}
              <button onClick={toggleModal}>aqui</button>
            </h4>
          </section>
        </DivForm>
      </Main>
      {isOpenModal && (
        <ModalRegisterUser toggleModal={toggleModal}>
          Criar conta
        </ModalRegisterUser>
      )}
    </>
  );
};
