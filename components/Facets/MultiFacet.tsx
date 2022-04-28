import { ApiResponseAggregation } from "@/types/api/response";
import Heading from "@/components/Heading/Heading";
import {
  Find,
  FindInput,
  Options,
  StyledMultiFacet,
} from "./MultiFacet.styled";
import Option from "./Option";
import { IconSearch } from "../SVG/Icons";

const MultiFacet: React.FC<ApiResponseAggregation> = ({ id, buckets }) => {
  return (
    <StyledMultiFacet data-testid="facet-multi-component" id={`facet--${id}`}>
      <Heading as="h4">{id}</Heading>
      <Find className="facet-find" data-testid="facet-find">
        <IconSearch />
        <FindInput
          aria-label={`Find ${id}`}
          placeholder={`Find ${id}`}
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
