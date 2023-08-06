import { styled } from "styled-components";

export const Main = styled.main`
  width: 1000px;
  max-width: 100%;
  height: 500px;
  max-height: fit-content;

  margin: 0 auto;
  margin-top: 7rem;
  display: flex;
  border-radius: 50px;
  box-shadow: 10px 10px 200px 0px rgba(3, 184, 152, 1);

  div {
    width: 500px;
  }

  figure {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50px 0px 0px 50px;
  }

  @media (max-width: 1040px) {
    width: 800px;
    height: 400px;

    div {
      width: 400px;
      height: 400px;
    }

    @media (max-width: 850px) {
      width: 500px;
      padding: 0px 30px;
      box-shadow: none;

      div {
        width: 100%;
        border-radius: 50px;
        box-shadow: 10px 10px 200px 0px rgba(3, 184, 152, 1);
      }

      #figureDiv {
        display: none;
      }
    }
  }
`;

export const DivForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  flex-direction: column;
  background-color: var(--color-grey-1);
  color: var(--color-grey-4);
  border-radius: 0px 50px 50px 0px;
  height: 100%;
  max-width: 100%;

  section {
    height: 80%;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    max-height: 100%;
    max-width: 100%;
  }

  @media (max-width: 1040px) {
    section {
      height: 100%;
      width: 80%;
    }

    #loginTitle {
      text-align: center;
    }
  }
`;
