import React, { useRef } from "react";
import { StyledFacets, Width, Wrapper } from "./Facets.styled";
import Container from "@/components/Shared/Container";
import FacetsFilter from "@/components/Facets/Filter/Filter";
import WorkType from "@/components/Facets/WorkType/WorkType";
import { useSearchState } from "@/context/search-context";

const Facets: React.FC = () => {
  const { searchState } = useSearchState();
  const { searchFixed } = searchState;

  const facetsRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper data-filter-fixed={searchFixed}>
      <Container
        className="facets-ui-container"
        maxWidth={searchFixed ? facetsRef.current?.clientWidth : undefined}
      >
        <StyledFacets data-testid="facets-ui-wrapper" ref={facetsRef}>
          <Width ref={facetsRef} />
          <FacetsFilter />
          <WorkType />
        </StyledFacets>
      </Container>
    </Wrapper>
  );
};

export default Facets;
