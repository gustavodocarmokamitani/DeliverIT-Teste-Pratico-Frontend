import React from "react";
import * as S from "./Header.styles";
import calculator from "../../assets/calculator.svg";

interface HeaderProps {
  image: keyof typeof AssetMap;
  title: string;
  subTitle: string;
}

export const AssetMap = {
  calculator,
};

const Header: React.FC<HeaderProps> = ({ image, title, subTitle }) => {
  const img = AssetMap[image];
  return (
    <S.Header>
      <S.IconWrapper>
        <img width={45} height={45} src={img} alt={image} />
      </S.IconWrapper>
      <h1>{title}</h1>
      <h3>{subTitle}</h3>
    </S.Header>
  );
};

export default Header;
