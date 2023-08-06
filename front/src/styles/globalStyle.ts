import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  
  :root {
	--color-primary: #f89c12;
	--color-secondary: #03b898;
	--color-grey-4: #212529;
	--color-grey-2: #e9ecef;
	--color-grey-1: #f8f9fa;
    font-size: 60%;   
  }

  span{
    font-size: 55%;   
  }

  @media (min-width: 700px) {
    :root {
      font-size: 62.5%; 
    }
  }
  
  * {
    margin:0;
    padding: 0;
    outline:0;
    box-sizing: border-box;
  }

  body,html{
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
  }

  .dashCover{
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: var(--color-grey-1);
    padding: 0px 30px 30px 30px;
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .personalDetailsDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 130px;
    text-align: right;
    gap: 10px;
    @media (max-width: 400px) {
      align-items: end;
    }
  }

    .personalDetailsIcons {
    display: flex;
    align-items: center;
    height: 50px;
    justify-content: right;
    gap: 30px;

    @media (max-width: 400px) {
      flex-direction: column;
      justify-content: center;
      height: 100px;
      width: 20px;
    }
    .trash,
    .edit {
      transform: scale(1.5);
    }

    .trash:hover {
      color: red;
    }

    .edit:hover {
      color: var(--color-primary);
    }
  }

  .personalMainDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    > h3 {
      margin-bottom: 10px;
    }
  }

  li{
    list-style: none;
  }

  body, button, input {
    font-family: 'REM', sans-serif;
    background: var(--color-grey-2);
    color: var(--color-grey-4);
    -webkit-font-smoothing: antialiased;

    overflow-x: hidden;
  }

  body, input, textarea, button {
    font-size: 1.6rem;
  }

  h1, h2, h3, h4, h5, h6, input, button, label {
    font-weight: 600;
  }

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    max-width: fit-content;
    margin-top: 10px;
    font-style: bold;
    color: var(--color-primary);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    height: 50%;
    max-width: 100%;
  }

  input,
  .submitBtn {
    border-radius: 50px;
    border: none;
    height: 40px;
    text-align: center;
  }

  input:focus {
    border: 2px solid var(--color-secondary);
  }

  .submitBtn {
    padding: 0px 30px;
    background-color: var(--color-secondary);
    color: var(--color-grey-2);
  }
  .submitBtn:hover {
    background-color: var(--color-primary);
    color: var(--color-grey-1);
  }

@media (max-width: 400px) {
  .accCreatedAt {
      display: none;
    }
}

`;
