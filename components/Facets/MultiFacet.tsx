import {
  Find,
  FindInput,
  Options,
  StyledMultiFacet,
} from "./MultiFacet.styled";
import { ApiResponseAggregation } from "@/types/api/response";
import { ApiSearchRequest } from "@/types/api/request";
import { ChangeEvent } from "react";
import { DC_API_SEARCH_URL } from "@/lib/endpoints";
import Heading from "@/components/Heading/Heading";
import { IconSearch } from "../SVG/Icons";
import Option from "./Option";
import React from "react";
import { buildFacetFilterQuery } from "lib/queries/facet-filter";
import { debounce } from "@/utils/debounce";
import useFetch from "@/hooks/useFetch";
import { useFilterState } from "@/context/filter-context";
import { useSearchState } from "@/context/search-context";

const MultiFacet: React.FC<ApiResponseAggregation> = ({ id, buckets }) => {
  const { searchState } = useSearchState();
  const { filterState } = useFilterState();
  const [query, setQuery] = React.useState<ApiSearchRequest>();

  // const { data, error, loading } = useFetch({
  //   body: query,
  //   url: DC_API_SEARCH_URL,
  // });

  // console.log("data", data);

  const handleFindChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // const query = buildFacetFilterQuery({
    //   facetId: id,
    //   filterTerm: e.target.value,
    //   searchTerm: searchState.q,
    //   userFacets: filterState.userFacetsUnsubmitted,
    // });
    // setQuery(query);
  };

  const debouncedHandler = React.useCallback(
    debounce(handleFindChange, 1000),
    []
  );

  return (
    <StyledMultiFacet data-testid="facet-multi-component" id={`facet--${id}`}>
      <Heading as="h4">{id}</Heading>
      <Find className="facet-find" data-testid="facet-find">
        <IconSearch />
        <FindInput
          aria-label={`Find ${id}`}
          placeholder={`Find ${id}`}
          onChange={debouncedHandler}
          type="text"
        />
      </Find>
      <Options className="facet-options" data-testid="facet-options">
        {buckets.map((bucket, index) => (
          <Option
            bucket={bucket}
            facet={id}
            index={index}
            key={bucket.key}
            type="checkbox"
          />
        ))}
      </Options>
    </StyledMultiFacet>
  );
};

export default MultiFacet;
