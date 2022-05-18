import {
  Find,
  FindInput,
  Options,
  StyledMultiFacet,
} from "./MultiFacet.styled";
import { ApiResponseAggregation } from "@/types/api/response";
import { ChangeEvent } from "react";
import Heading from "@/components/Heading/Heading";
import { IconSearch } from "../SVG/Icons";
import Option from "./Option";
import React from "react";
import { debounce } from "@/lib/utils/debounce";

interface MultiFacetProps extends ApiResponseAggregation {
  filterValue: string;
  setAggsFilterValue: (arg0: string) => void;
}

const MultiFacet: React.FC<MultiFacetProps> = ({
  filterValue,
  id,
  buckets,
  setAggsFilterValue,
}) => {
  const handleFindChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setAggsFilterValue(e.target.value);
  };

  /* eslint-disable */
  const debouncedHandler = React.useCallback(
    debounce(handleFindChange, 1000),
    []
  );
  /* eslint-enable */

  return (
    <StyledMultiFacet data-testid="facet-multi-component" id={`facet--${id}`}>
      <Heading as="h4">{id}</Heading>
      <Find className="facet-find" data-testid="facet-find">
        <IconSearch />
        <FindInput
          aria-label={`Find ${id}`}
          placeholder={`Find ${id}`}
          onChange={handleFindChange}
          type="text"
          value={filterValue}
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
