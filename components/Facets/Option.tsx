import * as Checkbox from "@radix-ui/react-checkbox";
import React, { useEffect, useState } from "react";
import { FacetOption } from "@/types/components/facets";
import { UserFacets } from "@/types";
import { useFilterState } from "@/context/filter-context";
import { useSearchState } from "@/context/search-context";

const Option: React.FC<FacetOption> = ({ bucket, facet, index, type }) => {
  const { doc_count, key } = bucket;
  const id = `${facet}-${index}`;

  const { searchState } = useSearchState();
  const { filterDispatch, filterState } = useFilterState();
  const [checked, setChecked] = useState<boolean>(false);

  const { userFacetsUnsubmitted } = filterState;

  // useEffect(() => {
  //   const { userFacets } = searchState;
  //   if (userFacets[facet])
  //     if (userFacets[facet].includes(key)) setChecked(true);
  // }, [searchState, facet, key]);

  const handleCheckedChange = (checkedStatus: boolean) => {
    setChecked(checkedStatus);
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
      userFacetsUnsubmitted: { [facet]: [key] },
    });
  };

  return (
    <li>
      <Checkbox.Root
        checked={checked}
        id={id}
        name={`facet--${facet}`}
        onCheckedChange={handleCheckedChange}
      >
        <Checkbox.Indicator>{checked && <>x</>}</Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={id}>{key}</label>
      <span>{doc_count}</span>
      {checked && (
        <>
          <strong>checked</strong>
        </>
      )}
    </li>
  );
};

export default Option;
