import { FilterClearStyled } from "@/components/Facets/Filter/Clear.styled";
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
    <FilterClearStyled
      onClick={handleClear}
      isFixed={searchFixed}
      isModal={isModal}
    >
      Reset
    </FilterClearStyled>
  );
};

export default FilterClear;
