import Container from "@/components/Container";
import FacetsFilter from "@/components/Facets/Filter";
import React from "react";
import { StyledFacets } from "./Facets.styled";

const Facets: React.FC = () => {
  return (
    <Container>
      <StyledFacets data-testid="facets-ui-wrapper">
        <FacetsFilter />
      </StyledFacets>
    </Container>
  );
};

export default Facets;
