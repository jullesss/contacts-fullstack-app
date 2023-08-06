import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  height: 50px;

  nav {
    width: 900px;
    max-width: 100%;
    padding: 15px 0px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-grey-2);

    div {
      display: flex;
      align-items: center;
    }

    img {
      width: 35px;
      height: 35px;
    }

    #logoutBtn {
      transform: scale(1.5);
    }
  }
`;

export const PersonalInfoSection = styled.section`
  width: 870px;
  max-width: 100%;
  padding: 60px 60px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  margin: 40px 60px 10px 60px;
  border: 1px solid var(--color-secondary);
  border-radius: 40px;

  @media (max-width: 400px) {
    padding: 30px 40px;
    border-radius: 20px;
  }
`;

export const Main = styled.main`
  width: 870px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;

  .divSearch {
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-grey-2);
    padding-bottom: 10px;

    .divSearchExplanation {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .divSubmit {
      margin-right: 20px;
    }

    #searchBtn {
      background-color: #9fe6be;
      padding: 3px 3px 0px 3px;
      border-radius: 5px;
      transform: scale(1.8);
      margin-left: 20px;
    }

    @media (max-width: 500px) {
      flex-direction: column;
      height: 110px;
      padding-bottom: 15px;

      .divSearchExplanation {
        align-items: center;
      }

      #divSubmit {
        margin-right: 0px;
      }

      input {
        width: 80%;
      }
    }
  }
  #createCttBtn {
    background-color: var(--color-primary);
    padding: 10px 20px;
    border-radius: 20px;
    color: var(--color-grey-1);
  }

  ul {
    margin: 10px 0px;
    width: 100%;
    height: fit-content;
  }

  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px 30px;
    border-bottom: 1px solid var(--color-grey-2);
  }

  #contactMainDiv {
    width: 60%;
    display: flex;
    justify-content: space-evenly;

    > div {
      display: flex;
      flex-direction: row;
      gap: 15px;

      @media (max-width: 500px) {
        flex-direction: column;
        gap: 5px;
      }
    }
  }
`;
