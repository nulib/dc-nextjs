import Container from "@/components/Shared/Container";
import { FooterStyled } from "@/components/Footer/Footer.styled";
import { Footer as NUFooter } from "@nulib/design-system";
import React from "react";
import SiteContentMessage from "./SiteContentMessage/SiteContentMessage";

export default function Footer() {
  return (
    <FooterStyled>
      <Container>
        <NUFooter isCopyright />
      </Container>
      <SiteContentMessage />
    </FooterStyled>
  );
}
