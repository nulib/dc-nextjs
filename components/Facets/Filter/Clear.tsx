import styles from "@/components/Facets/Filter/Clear.module.css";
import React from "react";
import { useFilterState } from "@/context/filter-context";
import { useLayoutState } from "@/context/layout-context";
import { useRouter } from "next/router";
interface FilterClearProps {
  isModal?: boolean;
}
const FilterClear: React.FC<FilterClearProps> = ({ isModal = false }) => {
  const { filterDispatch } = useFilterState();
  const {
    layoutState: { searchFixed },
  } = useLayoutState();
  const router = useRouter();
  const {
    query: { q },
  } = router;
  const handleClear = () => {
    isModal
      ? filterDispatch({
          type: "updateUserFacets",
          userFacetsUnsubmitted: {},
        })
      : router.push({
          pathname: "/search",
          query: { ...(q && { q }) },
        });
  };
  return (
    <button
      onClick={handleClear}
      data-is-fixed={searchFixed}
      data-is-modal={isModal}
      className={styles.filterClearStyled}
    >
      Reset
    </button>
  );
};
export default FilterClear;
