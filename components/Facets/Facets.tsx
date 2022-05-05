import Container from "@/components/Container";
import Filter from "@/components/Facets/Filter";
import React from "react";
import { StyledFacets } from "./Facets.styled";

<<<<<<< HEAD
interface FacetsProps {
  aggregations?: ApiResponseAggregation[];
}

const Facets: React.FC<FacetsProps> = ({ aggregations }) => {
  if (!aggregations) return <></>;

  const workType = aggregations.filter((agg) => agg.id === "workType")[0];
=======
const Facets: React.FC = () => {
  // const workType = aggregations.filter((agg) => agg.id === "workType")[0];
>>>>>>> b955cfa (Add aggregations to search context.)
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
