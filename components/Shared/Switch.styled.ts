import * as Switch from "@radix-ui/react-switch";

import { styled } from "stitches.config";

/* eslint sort-keys: 0 */

const StyledSwitch = styled(Switch.Root, {
  all: "unset",
  height: "2rem",
  width: "3.236rem",
  backgroundColor: "$black10",
  borderRadius: "9999px",
  position: "relative",
  WebkitTapHighlightColor: "transparent",
  cursor: "pointer",

  "&:focus": {
    boxShadow: `0 0 0 2px $secondaryAlt`,
  },

  '&[data-state="checked"]': {
    backgroundColor: "$darkBlueA",
    boxShadow: "inset 2px 2px 5px #0002",
  },
});

const StyledThumb = styled(Switch.Thumb, {
  display: "block",
  height: "calc(2rem - 14px)",
  width: "calc(2rem - 14px)",
  backgroundColor: "$white",
  borderRadius: "100%",
  boxShadow: `2px 2px 5px #0002`,
  transition: "$dcAll",
  transform: "translateX(7px)",
  willChange: "transform",

  '&[data-state="checked"]': {
    transform: "translateX(calc(1.236rem + 7px))",
  },
});

const Wrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  paddingLeft: "$gr4",

  "@md": {
    paddingLeft: "$gr3",
  },
});

const Label = styled("label", {
  fontSize: "$gr3",
  lineHeight: "1em",
  userSelect: "none",
  cursor: "pointer",
  color: "$black50",
  paddingRight: "$gr2",
});

const StyledToggle = styled("form", {});

export { Label, StyledSwitch, StyledThumb, StyledToggle, Wrapper };
