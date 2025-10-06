import { IconStyled } from "../Shared/Icon";
import { Wrapper as WorkTypeWrapper } from "@/components/Facets/WorkType/WorkType.styled";
import { keyframes } from "@stitches/react";
import { styled } from "@/stitches.config";
import { timingFunction } from "@/styles/transitions";

/* eslint sort-keys: 0 */

const StyledOptionsBar = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: "$gr3",
  flexWrap: "wrap",
  alignItems: "center",

  "@md": {
    gap: "$gr2",
  },

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
        flexGrow: "1",
        justifyContent: "space-between",
      },
    },
  },
});

const StyledOptionsExtras = styled("div", {
  display: "flex",

  "@sm": {
    display: "none",
  },
});

const slideInFromLeft = keyframes({
  "0%": { transform: "translateX(-100vw)" },
  "100%": { transform: "translateX0)" },
});

const StyledOptions = styled("div", {
  transition: "$dcScrollHeight",
  margin: "0 0 $gr5",

  ".facets-ui-container": {
    transition: "$dcAll",
    height: "unset",
  },

  "&[data-filter-fixed='true']": {
    flexGrow: "0",
    flexShrink: "1",
    height: "unset",
    margin: "0",

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
      zIndex: "1",
      transform: "translateX(0)",
      backfaceVisibility: "hidden",
      webkitFontSmoothing: "subpixel-antialiased",
      animation: `${slideInFromLeft} 1s ${timingFunction};`,

      "@sm": {
        top: "$gr5",
        marginTop: "$gr4",
      },
    },
  },
});

export {
  StyledOptions,
  StyledOptionsBar,
  StyledOptionsExtras,
  StyledOptionsFacets,
  StyledOptionsWidth,
};
