import * as Radio from "@radix-ui/react-radio-group";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const Wrapper = styled(Radio.Root, { position: "relative" });

const StyledWorkType = styled("ul", {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",

  li: {
    listStyle: "none",
    cursor: "pointer",
    marginLeft: "0.25rem",

    button: {
      position: "relative",
      display: "block",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
      fontFamily: "$sans",
      fontWeight: "700",
      zIndex: "1",
      padding: "0",
      transition: "all 200ms ease-in-out",
      opacity: "0.5",

      [`&[aria-checked="true"]`]: {
        opacity: "1",
      },

      ["&:hover"]: {
        opacity: "1",
        color: "$purple",
      },

      label: {
        cursor: "pointer",
        padding: "0 0.75rem",
      },
    },
  },
});

const Highlight = styled("div", {
  backgroundColor: "$purple",
  position: "absolute",
  bottom: "10px",
  borderRadius: "1rem",
  height: "2rem",
  transition: "all 100ms ease-in-out",
  zIndex: "0",
});

export { Highlight, StyledWorkType, Wrapper };
