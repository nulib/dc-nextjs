import Container from "@/components/Container";
import Filter from "@/components/Facets/Filter";
import React from "react";
import { StyledFacets } from "./Facets.styled";

const Facets: React.FC = () => {
  //const workType = aggregations.filter((agg) => agg.id === "workType")[0];
  return (
    <Container>
      <StyledFacets data-testid="facets-ui-wrapper">
        <Filter />
        {/* <InlineFacet {...workType} /> */}
      </StyledFacets>
    </Container>
  );
};

export default Facets;
