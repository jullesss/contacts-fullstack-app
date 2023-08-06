import styled from "styled-components";

export const Container = styled.div`
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  section {
    background-color: var(--color-grey-1);
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.25);
    width: 300px;
    max-width: 100%;
    border-radius: 30px;
    padding: 30px;
  }

  .buttonsDiv {
    display: flex;
    justify-content: center;
    gap: 30px;
  }

  .textDiv {
    p {
      margin-bottom: 20px;
    }
  }
`;
