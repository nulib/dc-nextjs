import { Find, FindInput, StyledGenericFacet } from "./GenericFacet.styled";
import { ChangeEvent } from "react";
import FacetOptions from "@/components/Facets/Facet/Options";
import { FacetsInstance } from "@/types/components/facets";
import Heading from "@/components/Heading/Heading";
import { IconSearch } from "@/components/Shared/SVG/Icons";
import React from "react";
import { debounce } from "@/lib/utils/debounce";

interface GenericFacetProps {
  facet: FacetsInstance;
}

const GenericFacet: React.FC<GenericFacetProps> = ({ facet }) => {
  const { id, label } = facet;
  const [aggsFilterValue, setAggsFilterValue] = React.useState("");

  const handleFindChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setAggsFilterValue(e.target.value);
  };

  /* eslint-disable */
  const debouncedHandler = React.useCallback(
    debounce(handleFindChange, 200),
    [],
  );
  /* eslint-enable */

  return (
    <StyledGenericFacet data-testid="facet-multi-component" id={`facet--${id}`}>
      <Heading as="h3">{facet ? label : id}</Heading>
      <Find className="facet-find" data-testid="facet-find">
        <IconSearch />
        <FindInput
          aria-label={`Find ${id}`}
          placeholder={`Find ${label}`}
          onChange={(e: ChangeEvent<HTMLInputElement>) => debouncedHandler(e)}
          type="text"
        />
      </Find>
      <FacetOptions aggsFilterValue={aggsFilterValue} facet={facet} />
    </StyledGenericFacet>
  );
};

export default GenericFacet;
