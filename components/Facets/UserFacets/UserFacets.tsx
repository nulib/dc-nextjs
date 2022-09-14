import * as Dropdown from "@radix-ui/react-dropdown-menu";
import {
  DropdownContent,
  DropdownToggle,
  ValueWrapper,
} from "./UserFacets.styled";
import { useEffect, useState } from "react";
import FacetsCurrentUserValue from "@/components/Facets/UserFacets/Value";
import { IconChevronDown } from "@/components/Shared/SVG/Icons";
import { UrlFacets } from "@/types/context/filter-context";
import { getFacetById } from "@/lib/utils/facet-helpers";
import { useFilterState } from "@/context/filter-context";
import { useRouter } from "next/router";

interface FacetsCurrentUserProps {
  screen: "modal" | "search";
  urlFacets?: UrlFacets;
}

export interface CurrentFacet {
  id: string;
  label: string;
  value: string;
}

const FacetsCurrentUser: React.FC<FacetsCurrentUserProps> = ({
  screen,
  urlFacets,
}) => {
  const [currentOptions, setCurrentOptions] = useState<CurrentFacet[]>([]);
  const router = useRouter();
  const { filterDispatch, filterState } = useFilterState();

  let facets: UrlFacets | undefined;

  switch (screen) {
    case "search":
      facets = urlFacets;
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
        facetKeys &&
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
      const newObj: UrlFacets = { ...facets };

      newObj[id] = newObj[id].filter((key) => key !== value);

      if (screen === "search")
        router.push({
          pathname: "/search",
          query: { ...router.query, ...newObj },
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
   * If user has no selected facet options, return an empty fragment.
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
        <Dropdown.Root modal={false}>
          <DropdownToggle data-testid="facet-user-component-popover-toggle">
            <IconChevronDown />
            <span>{currentOptions.length}</span>
          </DropdownToggle>
          <DropdownContent
            align="start"
            alignOffset={-95}
            portalled={true}
            data-testid="facet-user-component-popover-content"
          >
            {currentFacets}
          </DropdownContent>
        </Dropdown.Root>
      )}
      {screen === "modal" && currentFacets}
    </ValueWrapper>
  );
};

export default FacetsCurrentUser;
