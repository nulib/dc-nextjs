import { ContainerStyled } from "@/components/Shared/Container";
import { StyledInterstitial } from "@/components/Chat/Response/Interstitial.styled";
import { styled } from "@/stitches.config";

const SearchResultsLabel = styled("div", {
  fontFamily: "$northwesternSansRegular",
  fontWeight: "400",
  fontSize: "$gr3",
  display: "flex",
  alignItems: "center",
  color: "$purple60",
  borderRadius: "1em",
  backgroundPosition: "61.8%",
  flexGrow: "1",
  margin: "0 0 $gr4",
  paddingRight: 0,
  textAlign: "center",
  justifyContent: "space-between",
  width: "100%",
  gap: "$gr4",

  "@sm": {
    flexDirection: "column",
    alignItems: "center",
  },

  strong: {
    fontFamily: "$northwesternSansBold",
    fontWeight: "400",
    color: "$purple",
  },

  em: {
    fontStyle: "italic",
    color: "$purple",
  },
});

const SearchResultsLabelMessage = styled("div", {
  lineHeight: "1.35em",
  flexGrow: "1",
});

const StyledBackButton = styled("button", {
  display: "inline-flex",
  padding: "0",
  height: "38px",
  alignItems: "center",
  gap: "$gr2",
  color: "$purple",
  background: "transparent",
  fontFamily: "$northwesternSansBold",
  fontSize: "$gr3",
  border: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",

  svg: {
    height: "1rem",
    width: "1rem",
    stroke: "$purple30",
    transition: "$dcAll",
    margin: "-2px 0 0",

    path: {
      stroke: "inherit",
      strokeWidth: "48px",
    },
  },

  "&:hover": {
    svg: {
      marginLeft: "-3px",
      marginRight: "3px",
      stroke: "$purple",
    },
  },
});

const StyledSearchPanel = styled("aside", {
  width: "100%",
  height: "100%",
  transition: "opacity 382ms ease-in-out",
  opacity: "0",
  variants: {
    isOpen: {
      true: {
        opacity: "1",
        height: "100%",
        transform: "translateX(0)",
      },
      false: {
        opacity: "0",
        height: "0",
        transform: "translateX(100%)",
      },
    },
  },

  [`& ${ContainerStyled}`]: {
    "&.search-panel": {
      height: "100%",
    },
  },
});

const StyledSearchPanelContent = styled("div", {
  height: "100%",
  background: "white",
});

const StyledIncludeResults = styled("div", {
  display: "flex",
  alignItems: "center",
  fontSize: "$gr2",
  color: "$black50",
  cursor: "pointer",
  paddingInlineStart: "calc(1rem + $gr1)",

  input: {
    margin: "0",
  },
});

export {
  StyledSearchPanel,
  StyledSearchPanelContent,
  SearchResultsLabel,
  SearchResultsLabelMessage,
  StyledBackButton,
  StyledIncludeResults,
};
