import { IconStyled } from "../Shared/Icon";
import { Wrapper as WorkTypeWrapper } from "@/components/Facets/WorkType/WorkType.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledOptionsBar = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  position: "relative",
  left: "0",
  transition: "$dcScrollLeft",
  zIndex: "1",
  gap: "$gr3",

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

const StyledOptionsWidth = styled("span", {
  position: "absolute",
  width: "100%",
});

const StyledOptionsFacets = styled("div", {
  variants: {
    isTabResults: {
      false: {
        display: "none",
      },
      true: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      },
    },
  },
});

const StyledOptionsExtras = styled("div", {
  display: "flex",

  "@sm": {
    marginTop: "$gr4",
    flexDirection: "column-reverse",
    alignItems: "center",
  },
});

const StyledOptionsTabs = styled("div", {
  [`div[role="tablist"]`]: {
    display: "flex",
    flexShrink: "0",
    flexGrow: "0",
    flexWrap: "nowrap",
    height: "38px",
    boxShadow: "0px 3px 15px #0002",
    borderRadius: "50px",
    overflow: "hidden",

    button: {
      cursor: "pointer",
      backgroundColor: "$purple",
      border: "0",
      color: "$white",
      fontFamily: "$northwesternSansRegular",
      fontSize: "$gr3",
      padding: "0 $gr3",
      transition: "$dcAll",
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",

      "&[data-state=active]": {
        backgroundColor: "$purple",

        [`& ${IconStyled}`]: {
          color: "$purple30",
          fill: "$purple30",
        },
      },

      "&[data-state=inactive]": {
        backgroundColor: "$white",
        color: "$black50",

        [`& ${IconStyled}`]: {
          color: "$black20",
          fill: "$black20",
        },
      },

      "&:first-child": {
        paddingLeft: "$gr1",
      },

      "&:hover": {
        backgroundColor: "$purple120",
        color: "$white",

        [`& ${IconStyled}`]: {
          color: "$white",
          fill: "$white",
        },
      },
    },

    "@sm": {
      marginBottom: "$gr3",
    },
  },
});

const StyledOptions = styled("div", {
  height: "38px",
  transition: "$dcScrollHeight",
  padding: "$gr4 0 0",
  margin: "0 0 $gr6",

  "@sm": {
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

    [`& ${StyledOptionsExtras}`]: {
      width: "0",
      opacity: "0",
    },

    [`& ${StyledOptionsBar}`]: {
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

export {
  StyledOptions,
  StyledOptionsBar,
  StyledOptionsExtras,
  StyledOptionsFacets,
  StyledOptionsTabs,
  StyledOptionsWidth,
};
