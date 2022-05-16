import { ApiResponseAggregation } from "@/types/api/response";
import Container from "@/components/Container";
import FacetsFilter from "@/components/Facets/Filter";
import React from "react";
import { StyledFacets } from "./Facets.styled";

interface FacetsProps {
  aggregations?: ApiResponseAggregation[];
}

const Facets: React.FC<FacetsProps> = ({ aggregations }) => {
  return (
    <Container>
      <StyledFacets data-testid="facets-ui-wrapper">
        <FacetsFilter />
      </StyledFacets>
    </Container>
  );
};

export default Facets;
