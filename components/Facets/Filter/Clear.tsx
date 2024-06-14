import { FilterClearStyled } from "@/components/Facets/Filter/Clear.styled";
import React from "react";
import { useFilterState } from "@/context/filter-context";
import { useRouter } from "next/router";
import { useSearchState } from "@/context/search-context";

interface FilterClearProps {
  isModal?: boolean;
}

const FilterClear: React.FC<FilterClearProps> = ({ isModal = false }) => {
  const {
    searchState: { searchFixed },
  } = useSearchState();
  const { filterDispatch } = useFilterState();

  const router = useRouter();
  const {
    query: { q },
  } = router;

  const handleClear = () => {
    console.log("Clear click");
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
