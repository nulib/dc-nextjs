import {
  Find,
  FindInput,
  Options,
  StyledGenericFacet,
} from "./GenericFacet.styled";
import { ApiResponseAggregation } from "@/types/api/response";
import { ChangeEvent } from "react";
import Heading from "@/components/Heading/Heading";
import { IconSearch } from "@/components/Shared/SVG/Icons";
import Option from "./Option";
import React from "react";
import { debounce } from "@/lib/utils/debounce";
import { getFacetById } from "@/lib/utils/facet-helpers";

interface GenericFacetProps extends ApiResponseAggregation {
  filterValue: string;
  setAggsFilterValue: (arg0: string) => void;
}

const GenericFacet: React.FC<GenericFacetProps> = ({
  filterValue,
  id,
  buckets,
  setAggsFilterValue,
}) => {
  const facet = getFacetById(id);

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
    <StyledGenericFacet data-testid="facet-multi-component" id={`facet--${id}`}>
      <Heading as="h3">{facet ? facet.label : id}</Heading>
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
          <Option bucket={bucket} facet={id} index={index} key={bucket.key} />
        ))}
      </Options>
    </StyledGenericFacet>
  );
};

export default GenericFacet;
