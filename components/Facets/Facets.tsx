import { ApiResponseAggregation } from "@/types/api/response";
import Container from "@/components/Container";
import Filter from "@/components/Facets/Filter";
import InlineFacet from "@/components/Facets/InlineFacet";
import React from "react";
import { StyledFacets } from "./Facets.styled";

interface FacetsProps {
  aggregations?: ApiResponseAggregation[];
}

const Facets: React.FC<FacetsProps> = ({ aggregations }) => {
  if (!aggregations) return <></>;

  const workType = aggregations.filter((agg) => agg.id === "workType")[0];
  return (
    <Container>
      <StyledFacets data-testid="facets-ui-wrapper">
        <Filter aggregations={aggregations} />
        <InlineFacet {...workType} />
      </StyledFacets>
    </Container>
  );
};

export default Facets;
