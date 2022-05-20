import Container from "@/components/Shared/Container";
import FacetsFilter from "@/components/Facets/Filter";
import React from "react";
import { StyledFacets } from "./Facets.styled";
import WorkType from "@/components/Facets/WorkType/WorkType";

const Facets: React.FC = () => {
  return (
    <Container>
      <StyledFacets data-testid="facets-ui-wrapper">
        <FacetsFilter />
        <WorkType />
      </StyledFacets>
    </Container>
  );
};

export default Facets;
