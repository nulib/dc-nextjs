import * as Checkbox from "@radix-ui/react-checkbox";
import React, { useEffect, useState } from "react";
import { FacetOption } from "@/types/components/facets";
import { useFilterState } from "@/context/filter-context";
import { useSearchState } from "@/context/search-context";

const Option: React.FC<FacetOption> = ({ bucket, facet, index, type }) => {
  const { doc_count, key } = bucket;
  const id = `${facet}-${index}`;

  const { searchState } = useSearchState();
  const { filterDispatch } = useFilterState();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const { userFacets } = searchState;
    if (userFacets[facet])
      if (userFacets[facet].includes(key)) setChecked(true);
  }, [searchState, facet, key]);

  const handleCheckedChange = (checkedStatus: boolean) => {
    setChecked(checkedStatus);
    filterDispatch({
      type: checkedStatus ? "addUserFacet" : "removeUserFacet",
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
