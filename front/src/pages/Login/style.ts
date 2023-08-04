import { styled } from "styled-components";

export const Main = styled.main`
  width: fit-content;
  height: 500px;
  max-height: fit-content;
  margin: 0 auto;
  margin-top: 7rem;
  display: flex;
  border-radius: 50px;
  box-shadow: 10px 10px 200px 0px rgba(3, 184, 152, 1);
  max-width: 100%;
  /*   height: fit-content;
 */
  background-color: antiquewhite;

  div {
    width: 500px;
  }

  figure {
    width: 100%;
    object-fit: contain;
  }

  img {
    width: 100%;
    border-radius: 50px 0px 0px 50px;
  }
`;

export const DivForm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  flex-direction: column;
  background-color: var(--color-grey-1);
  color: var(--color-grey-4);
  border-radius: 0px 50px 50px 0px;
  height: 100%;

  section {
    height: 80%;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    max-height: 100%;
    max-width: 100%;
  }
`;
