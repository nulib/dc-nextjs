import { FacetExtras, StyledFacets, Width, Wrapper } from "./Facets.styled";
import React, { useEffect, useRef, useState } from "react";

import Container from "@/components/Shared/Container";
import FacetsFilter from "@/components/Facets/Filter/Filter";
import SearchPublicOnlyWorks from "@/components/Search/PublicOnlyWorks";
import WorkType from "@/components/Facets/WorkType/WorkType";

const Facets: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  const facetsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        setIsFixed(rect.top < 70);
      }
    };

    handleResize();

    window.addEventListener("scroll", handleResize);

    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef} data-filter-fixed={isFixed}>
      <Container
        className="facets-ui-container"
        maxWidth={isFixed ? facetsRef.current?.clientWidth : undefined}
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
