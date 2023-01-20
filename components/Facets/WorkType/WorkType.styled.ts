import * as Radio from "@radix-ui/react-radio-group";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const Wrapper = styled(Radio.Root, {
  position: "relative",
  height: "2rem",
  opacity: "1",
  transition: "$dcAll",
});

const StyledWorkType = styled("ul", {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  padding: "0",
  margin: "0",

  li: {
    listStyle: "none",
    cursor: "pointer",

    button: {
      position: "relative",
      display: "block",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "$gr3",
      fontFamily: "$northwesternSansRegular",
      height: "2rem",
      zIndex: "1",
      padding: "0",
      transition: "$dcAll",
      color: "$black50",

      [`&[aria-checked="true"]`]: {
        color: "$black",
        fontFamily: "$northwesternSansBold",
      },

      ["&:hover"]: {
        opacity: "1",
        color: "$purple",
      },

      label: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height: "2rem",
        cursor: "pointer",
        padding: "0 1rem",
      },
    },
  },
});

const Highlight = styled("div", {
  backgroundColor: "$purple",
  position: "absolute",
  top: "0",
  borderRadius: "1rem",
  height: "2rem",
  transition: "$dcAll",
  zIndex: "0",
});

export { Highlight, StyledWorkType, Wrapper };
