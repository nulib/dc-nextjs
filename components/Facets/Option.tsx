import { useEffect, useRef, useState } from "react";
import { FacetOption } from "@/types/components/facets";
import { UserFacetsUnsubmitted } from "@/types/filter-context";
import { useFilterState } from "@/context/filter-context";
import { useSearchState } from "@/context/search-context";

const Option: React.FC<FacetOption> = ({ bucket, facet, index, type }) => {
  const inputRef = useRef(null);
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

  const handleChange = (e) => {
    const facetOption: UserFacetsUnsubmitted = {
      [facet]: [key],
    };
    setChecked(!checked);
    filterDispatch({
      type: "updateUserFacetsUnsubmitted",
      userFacetsUnsubmitted: facetOption,
    });
  };

  return (
    <li>
      <input
        id={id}
        name={`facet--${facet}`}
        type={type}
        onChange={handleChange}
        ref={inputRef}
      />
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
