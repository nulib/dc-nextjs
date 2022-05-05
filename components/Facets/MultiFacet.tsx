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
import { buildFacetFilterQuery } from "lib/queries/facet-filter";

const MultiFacet: React.FC<ApiResponseAggregation> = ({ id, buckets }) => {
  const handleFindChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value", e.target.value);
    //const query = buildFacetFilterQuery();
  };

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
