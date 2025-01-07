import { color } from "framer-motion";
import { styled } from "@/stitches.config";

const StyledIIIFContentState = styled("div", {
  marginRight: "$gr3",
});

const StyledIIIFContentStateButton = styled("button", {
  background: "transparent",
  border: "none",
  display: "flex",
  fontFamily: "$northwesternSansRegular",
  fontSize: "$gr3",
  color: "$black50",
  gap: "$gr2",
  height: "$gr4",
  alignItems: "center",
  borderRadius: "1em",
  padding: "0 $gr2",

  "&:hover, &:active": {
    backgroundColor: "$purple10",
    color: "$purple",
    cursor: "pointer",
  },

  svg: {
    fill: "$purple",
    height: "$gr3",
  },
});

const StyledIIIFContentStateURI = styled("div", {
  background: "$gray6",
  borderRadius: "1em",
  padding: "$gr2",
  paddingRight: "$gr3",
  marginBottom: "$gr2",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",

  input: {
    background: "transparent",
    border: "none",
    flexGrow: 1,
    fontFamily: "$northwesternSansRegular",
    fontSize: "$gr2",
    paddingRight: "$gr2",
    color: "$black50",
    maskImage:
      "linear-gradient(to right, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))",
  },

  button: {
    fontFamily: "$northwesternSansBold",
    fontSize: "$gr2",
    fontWeight: "400",
  },
});

const StyledIIIFContentStateOptions = styled("div", {
  fontSize: "$gr3",
  display: "flex",
  flexDirection: "column",
  gap: "$gr1",
  padding: "$gr1 $gr2",

  label: {
    display: "inline-flex",
    fontSize: "$gr2",
    gap: "$gr1",
    alignItems: "center",

    em: {
      color: "$black50",
      fontStyle: "normal",
      fontFamily: "$northwesternSansBold",
    },
  },

  textarea: {
    height: "$gr6 !important",
    border: "1px solid $black20",
    padding: "$gr2",
    borderRadius: "3px",
  },
});

const StyledIIIFContentStateActiveFile = styled("div", {
  display: "flex",
  alignItems: "center",
  fontFamily: "$northwesternSansBold",

  em: {
    marginRight: "$gr1",
  },
});

const StyledIIIFContentStateInner = styled("div", {
  flexGrow: 1,
});

export {
  StyledIIIFContentState,
  StyledIIIFContentStateActiveFile,
  StyledIIIFContentStateButton,
  StyledIIIFContentStateInner,
  StyledIIIFContentStateOptions,
  StyledIIIFContentStateURI,
};
