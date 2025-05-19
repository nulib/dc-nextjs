import { styled } from "@/stitches.config";

const StyledIIIFContentState = styled("div", {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "$gr2",
    paddingTop: "$gr2",

    label: {
      display: "flex",
      gap: "$gr2",
      fontSize: "$gr3",

      "&[aria-disabled=true]": {
        color: "$black20",

        textarea: {
          opacity: "0.5",
        },
      },

      "&[data-element=textarea]": {
        display: "flex",
        flexDirection: "column",
        padding: "$gr1 0 0",

        textarea: {
          background: "$gray6",
          border: "none",
          resize: "none",
          height: "85px",
          borderRadius: "3px",
          padding: "1rem",
          fontSize: "$gr3 !important",
          fontFamily: "$northwesternSansRegular",
        },
      },
    },
  },
});

const StyledIIIFContentStateButton = styled("div", {
  fontFamily: "$northwesternSansRegular",
  alignItems: "center",

  button: {
    background: "$purple",
    color: "$white !important",
    fontWeight: "400",
    padding: "$gr2 $gr2",
    textDecoration: "none",

    "&:hover, &:focus": {
      background: "$purple120",
    },

    span: {
      right: "-$gr3 !important",
      fontSize: "$gr2",
    },
  },
});

const StyledIIIFContentStateOptions = styled("div", {
  fontSize: "$gr3",
  display: "flex",
  flexDirection: "column",
  gap: "$gr1",

  label: {
    fontSize: "$gr3",
    gap: "$gr1",
    alignItems: "center",
    whiteSpace: "nowrap",

    em: {
      color: "$black50",
      fontStyle: "normal",
      fontFamily: "$northwesternSansBold",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },

  input: {
    marginRight: "$gr1",
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
  gap: "$gr2",
  fontSize: "$gr3",
  padding: "0 0 $gr2",

  div: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    gap: "$gr1",

    span: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",

      "&:last-child": {
        color: "$black50",
        fontSize: "$gr2",
        fontFamily: "$northwesternSansRegular",
      },
    },
  },

  img: {
    objectFit: "cover",
    borderRadius: "2px",
    marginTop: "-2px",
    color: "transparent",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
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
};
