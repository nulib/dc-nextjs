import styles from "@/components/Search/Options.module.css";
import React, { useRef } from "react";
import Container from "@/components/Shared/Container";
import Facets from "@/components/Facets";
import FacetsWorkType from "@/components/Facets/WorkType/WorkType";
import SearchPublicOnlyWorks from "@/components/Search/PublicOnlyWorks";
import { createPortal } from "react-dom";
import { useLayoutState } from "@/context/layout-context";
import { useSearchState } from "@/context/search-context";
interface SearchOptionsProps {
  activeTab?: string;
  contentView?: "works" | "content";
}
const SearchOptions: React.FC<SearchOptionsProps> = ({
  activeTab,
  contentView,
}) => {
  const {
    searchState: { panel },
  } = useSearchState();
  const {
    layoutState: { searchFixed },
  } = useLayoutState();
  const optionsRef = useRef<HTMLDivElement>(null);
  const content = (
    <div
      data-filter-fixed={searchFixed && contentView !== "content"}
      className={styles.styledOptions}
    >
      <Container
        maxWidth={searchFixed ? optionsRef.current?.clientWidth : undefined}
        className={"facets-ui-container"}
      >
        <div
          data-testid="facets-ui-wrapper"
          ref={optionsRef}
          className={styles.styledOptionsBar}
        >
          <div
            data-is-tab-results={activeTab === "results"}
            className={styles.styledOptionsFacets}
          >
            {contentView === "content" ? (
              <span className={styles.contentSearchNote}>
                Filters do not apply to content search
              </span>
            ) : (
              <Facets />
            )}
            <div
              data-content-only={contentView === "content"}
              className={styles.styledOptionsExtras}
            >
              {contentView !== "content" && <FacetsWorkType />}
              <SearchPublicOnlyWorks />
            </div>
          </div>
          <span ref={optionsRef} className={styles.styledOptionsWidth} />
        </div>
      </Container>
    </div>
  );
  // When used in the Panel component, create a portal to the body
  // because the Panel component has a transform applied, breaking the fixed positioning
  return searchFixed && panel.open
    ? createPortal(content, document.body)
    : content;
};
export default SearchOptions;
