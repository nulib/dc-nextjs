import * as Checkbox from "@radix-ui/react-checkbox";

import { Indicator, OptionCount, OptionText } from "./GenericFacet.styled";

import { FacetOption } from "@/types/components/facets";
import { IconCheck } from "@/components/Shared/SVG/Icons";
import React from "react";
import { UserFacets } from "@/types";
import { getFacetById } from "@/lib/utils/facet-helpers";
import { useFilterState } from "@/context/filter-context";

const Option: React.FC<FacetOption> = ({ bucket, facet, index }) => {
  const { doc_count, key } = bucket;
  const id = `${facet}-${index}`;

  const {
    filterDispatch,
    filterState: { userFacetsUnsubmitted },
  } = useFilterState();

  const isChecked = !!(
    userFacetsUnsubmitted[facet] && userFacetsUnsubmitted[facet].includes(key)
  );

  const handleCheckedChange = (checkedStatus: boolean) => {
    const newObj: UserFacets = { ...userFacetsUnsubmitted };

    /**
     * Checkbox is checked
     */
    if (checkedStatus) {
      if (!newObj[facet]) {
        newObj[facet] = [key];
      } else {
        newObj[facet].push(key);
      }

      /**
       * Update most recently selected Facet
       */
      const facetObject = getFacetById(facet);
      if (facetObject) {
        filterDispatch({
          facet: facetObject,
          type: "updateRecentFacet",
        });
      }
    } else {
      /**
       * Not checked, remove value from the array
       */
      newObj[facet] = [...newObj[facet]].filter((arrValue) => arrValue !== key);
    }

    filterDispatch({
      type: "updateUserFacets",
      userFacetsUnsubmitted: newObj,
    });
  };

  return (
    <li>
      <Checkbox.Root
        checked={isChecked}
        id={id}
        name={`facet--${facet}`}
        onCheckedChange={handleCheckedChange}
      >
        <Indicator>
          <IconCheck />
        </Indicator>
      </Checkbox.Root>
      <label htmlFor={id} data-selected={isChecked}>
        <OptionText>{key}</OptionText>
        <OptionCount>({doc_count})</OptionCount>
      </label>
    </li>
  );
};

export default Option;
