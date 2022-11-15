import { Content, HeroBasicStyled } from "components/Hero/Basic.styled";
import React from "react";

interface Props {
  bgImage: string;
  children: React.ReactNode;
}

const HeroBasic: React.FC<Props> = ({ bgImage, children }) => {
  return (
    <HeroBasicStyled
      css={{
        heroBgImage: bgImage,
      }}
    >
      <Content>{children}</Content>
    </HeroBasicStyled>
  );
};

export default HeroBasic;
