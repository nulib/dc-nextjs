import Container from "@/components/Shared/Container";
import { FooterStyled } from "@/components/Footer/Footer.styled";
import { Footer as NUFooter } from "@nulib/design-system";
import React from "react";

export default function Footer() {
  return (
    <FooterStyled>
      <Container>
        <NUFooter />
      </Container>
    </FooterStyled>
  );
}
