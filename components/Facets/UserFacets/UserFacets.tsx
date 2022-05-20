import * as Popover from "@radix-ui/react-popover";
import {
  PopoverContent,
  PopoverToggle,
  ValueWrapper,
} from "./UserFacets.styled";
import { useEffect, useState } from "react";
import FacetsCurrentUserValue from "./Value";
import { IconChevronDown } from "@/components/Shared/SVG/Icons";
import { UserFacets } from "@/types/context/search-context";
import { getFacetById } from "@/lib/utils/facet-helpers";
import { useFilterState } from "@/context/filter-context";
import { useSearchState } from "@/context/search-context";

interface FacetsCurrentUserProps {
  screen: "modal" | "search";
}

export interface CurrentFacet {
  id: string;
  label: string;
  value: string;
}

const FacetsUserFacets: React.FC<FacetsCurrentUserProps> = ({ screen }) => {
  const [currentOptions, setCurrentOptions] = useState<CurrentFacet[]>([]);

  const { searchDispatch, searchState } = useSearchState();
  const { filterDispatch, filterState } = useFilterState();

  let facets: UserFacets | undefined;

  switch (screen) {
    case "search":
      facets = searchState.userFacets;
      break;
    case "modal":
      facets = filterState.userFacetsUnsubmitted;
      break;
    default:
      console.error(
        `Screen value "${screen} is not valid on <FacetsCurrentUser>"`
      );
      break;
  }

  useEffect(() => {
    if (!facets) return;

    const current: CurrentFacet[] = [];
    for (const [facetId, facetKeys] of Object.entries(facets)) {
      const facet = getFacetById(facetId);
      if (facet) {
        const { id, label } = facet;
        facetKeys.forEach((value) => {
          current.push({ id, label, value });
        });
      }
    }
    setCurrentOptions(current);
  }, [facets]);

  function handleRemoval(instance: CurrentFacet) {
    if (instance && facets) {
      const { id, value } = instance;
      const newObj: UserFacets = { ...facets };

      newObj[id] = newObj[id].filter((key) => key !== value);

      if (screen === "search")
        searchDispatch({
          type: "updateUserFacets",
          userFacets: newObj,
        });

      if (screen === "modal")
        filterDispatch({
          type: "updateUserFacets",
          userFacetsUnsubmitted: newObj,
        });
    }
    return;
  }

  /**
   * If user has no selected facet options, return an empty fragement.
   */

  if (currentOptions.length === 0) return <></>;

  const currentFacets = currentOptions.map((instance, index) => {
    return (
      <FacetsCurrentUserValue
        handleRemoval={handleRemoval}
        instance={instance}
        key={index}
      />
    );
  });

  /**
   * Render currentFacets...
   * If search screen, return popover element adjacent to filter button.
   */

  return (
    <ValueWrapper data-testid="facet-user-component">
      {screen === "search" && (
        <Popover.Root>
          <PopoverToggle data-testid="facet-user-component-popover-toggle">
            <IconChevronDown />
            <span>{currentOptions.length}</span>
          </PopoverToggle>
          <PopoverContent
            align="start"
            alignOffset={-95}
            data-testid="facet-user-component-popover-content"
          >
            {currentFacets}
          </PopoverContent>
        </Popover.Root>
      )}
      {screen === "modal" && currentFacets}
    </ValueWrapper>
  );
};

export default FacetsUserFacets;
