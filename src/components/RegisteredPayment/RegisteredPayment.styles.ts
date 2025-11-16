import styled from "styled-components";

interface ContentProps {
  bgColor: string; 
}

export const Content = styled.div<ContentProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  background: ${(props) => props.bgColor}; 
  border-radius: 15px;
  padding: 0 1rem;
  font-size: 0.8rem;
  font-weight: 600;
`;
