import React, { useRef } from "react";
import {
  StyledOptions,
  StyledOptionsBar,
  StyledOptionsExtras,
  StyledOptionsFacets,
  StyledOptionsTabs,
  StyledOptionsWidth,
} from "@/components/Search/Options.styled";

import Container from "@/components/Shared/Container";
import Facets from "@/components/Facets";
import FacetsWorkType from "@/components/Facets/WorkType/WorkType";
import SearchPublicOnlyWorks from "@/components/Search/PublicOnlyWorks";
import { useSearchState } from "@/context/search-context";
import { createPortal } from "react-dom";

interface SearchOptionsProps {
  tabs: React.ReactNode;
  activeTab?: string;
  renderTabList?: boolean;
}

const SearchOptions: React.FC<SearchOptionsProps> = ({
  tabs,
  activeTab,
  renderTabList,
}) => {
  const {
    searchState: { searchFixed, panel },
  } = useSearchState();

  const optionsRef = useRef<HTMLDivElement>(null);

  const content = (
    <StyledOptions data-filter-fixed={searchFixed}>
      <Container
        className="facets-ui-container"
        maxWidth={searchFixed ? optionsRef.current?.clientWidth : undefined}
      >
        <StyledOptionsBar data-testid="facets-ui-wrapper" ref={optionsRef}>
          {renderTabList && <StyledOptionsTabs>{tabs}</StyledOptionsTabs>}
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
