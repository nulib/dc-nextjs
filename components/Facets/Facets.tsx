import styles from "@/components/Facets/Facets.module.css";
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
    <div
      ref={wrapperRef}
      data-filter-fixed={isFixed}
      className={styles.wrapper}
    >
      <Container
        maxWidth={isFixed ? facetsRef.current?.clientWidth : undefined}
        className={"facets-ui-container"}
      >
        <div
          data-testid="facets-ui-wrapper"
          ref={facetsRef}
          className={styles.styledFacets}
        >
          <span ref={facetsRef} className={styles.width} />
          <FacetsFilter />
          <div className={styles.facetExtras}>
            <WorkType />
            <SearchPublicOnlyWorks />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Facets;
