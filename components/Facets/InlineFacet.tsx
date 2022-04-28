/**
 * @todo
 * a generic "inline" facet component, hard-coded for now and will be handled
 * in issue https://github.com/nulib/repodev_planning_and_docs/issues/2819
 */

import { ApiResponseAggregation } from "@/types/api/response";
import { StyledInlineFacet } from "./InlineFacet.styled";

const FacetsInlineFacet: React.FC<ApiResponseAggregation> = (props) => {
  console.log(props);

  const { id } = props;
  return (
    <StyledInlineFacet data-testid="facet-inline-component" id={`facet--${id}`}>
      <li>
        <strong>All</strong>
      </li>
      <li>Images</li>
      <li>Audio</li>
      <li>Video</li>
    </StyledInlineFacet>
  );
};

export default FacetsInlineFacet;
