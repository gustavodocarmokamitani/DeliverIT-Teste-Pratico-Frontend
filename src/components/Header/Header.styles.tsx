import styled from "styled-components";

export const Header = styled.div`
  width: 100%;
  height: 350px;
  
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
  
  h1 {
    font-weight: 600;
  }

  h3 {
    color: #6c7c9a;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 100px;

  border-radius: 50%;
  background-color: #e0edf940;
`;
