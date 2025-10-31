import Container from "@/components/Shared/Container";
import { FooterContent } from "@/components/Footer/Content";
import { FooterStyled } from "@/components/Footer/Footer.styled";
import React from "react";

export default function Footer() {
  return (
    <FooterStyled>
      <Container data-testid="footer">
        <FooterContent />
      </Container>
    </FooterStyled>
  );
}
