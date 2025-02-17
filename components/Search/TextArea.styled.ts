import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const Clear = styled("button", {
  position: "absolute",
  display: "flex",
  right: "0",
  height: "$gr5",
  width: "$gr5",
  marginRight: "$gr2",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  cursor: "pointer",
  border: "none",
  background: "linear-gradient(90deg, #f0f0f000 0, transparent  38.2%)",
  zIndex: "1",
  fill: "$black50",

  "&:focus, &:hover": {
    fill: "$brightRed",
  },

  svg: {
    fill: "inherit",
    padding: "5px",
    marginLeft: "$gr2",
    transition: "$dcAll",
  },
});

const StyledTextArea = styled("div", {
  position: "relative",
  display: "flex",
  flexGrow: "1",

  variants: {
    isFocused: {
      true: {
        color: "$black",
      },
      false: {
        textarea: {
          height: "$gr5 !important",
          color: "$black50",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
  },

  textarea: {
    background: "transparent",
    padding: "15px $gr5 10px",
    border: "none",
    fontSize: "$gr3",
    lineHeight: "147%",
    height: "$gr5",
    zIndex: "1",
    fontFamily: "$northwesternSansRegular",
    resize: "none",
    overflow: "hidden",
    width: "100%",
    outline: "none",
    transition: "$dcAll",
    boxSizing: "border-box",

    "&::placeholder": {
      overflow: "hidden",
      color: "$black50 !important",
      textOverflow: "ellipsis",
    },
  },
});

export { Clear, StyledTextArea };
