import * as Checkbox from "@radix-ui/react-checkbox";
import { FacetOption } from "@/types/components/facets";
import React from "react";
import { UserFacets } from "@/types";
import { useFilterState } from "@/context/filter-context";

const Option: React.FC<FacetOption> = ({ bucket, facet, index, type }) => {
  const { doc_count, key } = bucket;
  const id = `${facet}-${index}`;

  const { filterDispatch, filterState } = useFilterState();

  const { userFacetsUnsubmitted } = filterState;

  const isChecked =
    userFacetsUnsubmitted[facet] && userFacetsUnsubmitted[facet].includes(key);

  const handleCheckedChange = (checkedStatus: boolean) => {
    const newObj: UserFacets = { ...userFacetsUnsubmitted };

    // Checkbox is checked
    if (checkedStatus) {
      if (!newObj[facet]) {
        newObj[facet] = [key];
      } else {
        newObj[facet].push(key);
      }
    }
    // Not checked, remove value from the array
    else {
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
        <Checkbox.Indicator>x</Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={id}>{key}</label>
      <span>{doc_count}</span>
    </li>
  );
};

export default Option;
