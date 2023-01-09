import { FacetExtras, StyledFacets, Width, Wrapper } from "./Facets.styled";
import React, { useRef } from "react";
import Container from "@/components/Shared/Container";
import FacetsFilter from "@/components/Facets/Filter/Filter";
import SearchPublicOnlyWorks from "@/components/Search/PublicOnlyWorks";
import WorkType from "@/components/Facets/WorkType/WorkType";
import { useSearchState } from "@/context/search-context";

const Facets: React.FC = () => {
  const {
    searchState: { searchFixed },
  } = useSearchState();

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
          <FacetExtras>
            <WorkType />
            <SearchPublicOnlyWorks />
          </FacetExtras>
        </StyledFacets>
      </Container>
    </Wrapper>
  );
};

export default Facets;
