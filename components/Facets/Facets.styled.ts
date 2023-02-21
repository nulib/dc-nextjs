import { Wrapper as WorkTypeWrapper } from "@/components/Facets/WorkType/WorkType.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledFacets = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  position: "relative",
  margin: "$gr4 0",
  left: "0",
  transition: "$dcScrollLeft",
  zIndex: "1",

  [`& ${WorkTypeWrapper}`]: {
    borderRight: "1px solid $black10",
    paddingRight: "$gr2",
    transition: "$dcWidth",

    "@sm": {
      marginTop: "$gr3",
      borderRight: "none",
      paddingRight: "0",
    },
  },

  "@sm": {
    padding: "$gr4 0",
    flexDirection: "column",
    alignItems: "center",
  },
});

const Width = styled("span", {
  position: "absolute",
  width: "100%",
});

const FacetExtras = styled("div", {
  display: "flex",

  "@sm": {
    marginTop: "$gr4",
    flexDirection: "column-reverse",
    alignItems: "center",
  },
});

const Wrapper = styled("div", {
  height: "38px",
  transition: "$dcScrollHeight",
  margin: "$gr4 0",

  "@sm": {
    margin: "-$gr4 0 $gr4",
    backgroundColor: "$gray6",
    height: "225px",
  },

  ".facets-ui-container": {
    transition: "$dcAll",
  },

  "&[data-filter-fixed='true']": {
    flexGrow: "0",
    flexShrink: "1",
    height: "38px",

    "@sm": {
      backgroundColor: "transparent",
      margin: "0",
    },

    [`& ${FacetExtras}`]: {
      width: "0",
      opacity: "0",
    },

    [`& ${StyledFacets}`]: {
      position: "fixed",
      margin: "0",
      top: "$gr6",
      left: "50%",
      zIndex: "1",
      transform: "translate(-50%)",
      backfaceVisibility: "hidden",
      webkitFontSmoothing: "subpixel-antialiased",

      "@sm": {
        top: "$gr5",
      },
    },
  },
});

export { FacetExtras, StyledFacets, Width, Wrapper };
