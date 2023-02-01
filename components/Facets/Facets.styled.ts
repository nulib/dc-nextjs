import { StyledToggle } from "@/components/Shared/Switch.styled";
import { Wrapper as WorkTypeWrapper } from "@/components/Facets/WorkType/WorkType.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledFacets = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  margin: "1.618rem 0",
  position: "relative",
  left: "0",
  transition: "$dcAll",
  zIndex: "1",

  [`& ${WorkTypeWrapper}`]: {
    borderRight: "1px solid $black10",
    paddingRight: "$gr2",
    transition: "$dcWidth",
  },

  "@sm": {
    [`& ${WorkTypeWrapper}`]: {
      width: "0",
      opacity: "0",
    },
  },
});

const Width = styled("span", {
  position: "absolute",
  width: "100%",
});

const Wrapper = styled("div", {
  ".facets-ui-container": {
    transition: "$dcAll",
  },

  "&[data-filter-fixed='true']": {
    margin: "1.618rem 0",
    flexGrow: "0",
    flexShrink: "1",
    height: "38px",

    [`& ${WorkTypeWrapper}`]: {
      width: "0",
      opacity: "0",
    },

    [`& ${StyledFacets}`]: {
      position: "fixed",
      top: "50px",
      left: "50%",
      zIndex: "1",
      transform: "translate(-50%)",
      backfaceVisibility: "hidden",
      webkitFontSmoothing: "subpixel-antialiased",
    },

    [`& ${StyledToggle}`]: {
      width: "0",
      opacity: "0",
    },
  },
});

const FacetExtras = styled("div", {
  display: "flex",
  flexGrow: "1",
  justifyContent: "flex-end",
});

export { FacetExtras, StyledFacets, Width, Wrapper };
