import Container from "@/components/Shared/Container";
import { FooterContent } from "@/components/Footer/Content";
import { FooterStyled } from "@/components/Footer/Footer.styled";
import React from "react";
import SiteContentMessage from "@/components/Footer/SiteContentMessage/SiteContentMessage";

export default function Footer() {
  return (
    <FooterStyled>
      <Container data-testid="footer">
        <FooterContent />
      </Container>
      <SiteContentMessage />
    </FooterStyled>
  );
}
