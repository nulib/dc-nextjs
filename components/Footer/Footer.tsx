import Container from "@/components/Shared/Container";
import { FooterStyled } from "@/components/Footer/Footer.styled";
import { Footer as NUFooter } from "@nulib/design-system";
import React from "react";
import colors from "@/styles/colors";

export default function Footer() {
  return (
    <FooterStyled>
      <Container>
        <NUFooter css={{ background: colors.black80 }} />
      </Container>
    </FooterStyled>
  );
}
