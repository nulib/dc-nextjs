import { ContainerStyled } from "@/components/Shared/Container";
import { StyledInterstitial } from "@/components/Chat/Response/Interstitial.styled";
import { styled } from "@/stitches.config";

const SearchResultsLabel = styled(StyledInterstitial, {
  marginBottom: "$gr4",
  textAlign: "center",
  justifyContent: "space-between",
  width: "100%",

  div: {
    display: "flex",
    alignItems: "center",
    gap: "$gr2",
  },
});

const StyledBackButton = styled("button", {
  display: "inline-flex",
  padding: "0 $gr2",
  height: "38px",
  alignItems: "center",
  gap: "$gr1",
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
  position: "absolute",
  top: "0",
  right: "-100%",
  width: "100%",
  height: "100%",
  zIndex: "1",
  transition: "all 382ms ease-in-out",
  opacity: "0",
  variants: {
    isOpen: {
      true: {
        right: "0",
        opacity: "1",
      },
      false: {
        opacity: "0",
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
  padding: "$gr4 0",
  background: "white",
});

export {
  StyledSearchPanel,
  StyledSearchPanelContent,
  SearchResultsLabel,
  StyledBackButton,
};
