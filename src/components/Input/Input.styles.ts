import styled from "styled-components";

interface InputComponentProps {
  type?: string;
}

export const InputComponent = styled.div<InputComponentProps>`
  display: flex;
  flex-direction: column;

  margin: 0.5rem 0;

  label {
    font-weight: 600;
  }

  input {
    height: 35px;
    margin-top: 0.5rem;
    padding: ${(props) =>
      props.type !== "date" ? "0 0.5rem" : "0 110px 0 0.5rem"};

    background-color: #f8fafc;
    border: 1px solid #d9e0e8;
    border-radius: 10px;

    &:focus {
      outline: 2px solid #9ebde0ff;
    }
  }
`;
