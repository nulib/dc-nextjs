import React, { useRef } from "react";
import {
  StyledOptions,
  StyledOptionsBar,
  StyledOptionsExtras,
  StyledOptionsFacets,
  StyledOptionsWidth,
} from "@/components/Search/Options.styled";

import Container from "@/components/Shared/Container";
import Facets from "@/components/Facets";
import FacetsWorkType from "@/components/Facets/WorkType/WorkType";
import SearchPublicOnlyWorks from "@/components/Search/PublicOnlyWorks";
import { createPortal } from "react-dom";
import { useLayoutState } from "@/context/layout-context";
import { useSearchState } from "@/context/search-context";

interface SearchOptionsProps {
  activeTab?: string;
}

const SearchOptions: React.FC<SearchOptionsProps> = ({ activeTab }) => {
  const {
    searchState: { panel },
  } = useSearchState();
  const {
    layoutState: { searchFixed },
  } = useLayoutState();

  const optionsRef = useRef<HTMLDivElement>(null);

  const content = (
    <StyledOptions data-filter-fixed={searchFixed}>
      <Container
        className="facets-ui-container"
        maxWidth={searchFixed ? optionsRef.current?.clientWidth : undefined}
      >
        <StyledOptionsBar data-testid="facets-ui-wrapper" ref={optionsRef}>
          <StyledOptionsFacets isTabResults={activeTab === "results"}>
            <Facets />
            <StyledOptionsExtras>
              <FacetsWorkType />
              <SearchPublicOnlyWorks />
            </StyledOptionsExtras>
          </StyledOptionsFacets>
          <StyledOptionsWidth ref={optionsRef} />
        </StyledOptionsBar>
      </Container>
    </StyledOptions>
  );

  // When used in the Panel component, create a portal to the body
  // because the Panel component has a transform applied, breaking the fixed positioning
  return searchFixed && panel.open
    ? createPortal(content, document.body)
    : content;
};

export default SearchOptions;
