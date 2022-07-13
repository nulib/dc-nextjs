import { Wrapper as WorkTypeWrapper } from "@/components/Facets/WorkType/WorkType.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledFacets = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  margin: "1.618rem 0",
  position: "relative",
  zIndex: "1",
});

const Width = styled("span", {
  position: "absolute",
  width: "100%",
});

const Wrapper = styled("div", {
  ".facets-ui-container": {
    transition: "$all",
  },

  "&[data-filter-fixed='true']": {
    margin: "1.618rem 0",
    height: "38px",

    [`& ${WorkTypeWrapper}`]: {
      width: "0",
      opacity: "0",
    },

    [`& ${StyledFacets}`]: {
      position: "fixed",
      top: "50px",
      zIndex: "1",
    },
  },
});

export { StyledFacets, Width, Wrapper };
