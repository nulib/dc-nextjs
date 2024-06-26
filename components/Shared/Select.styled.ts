import * as SelectPrimitive from "@radix-ui/react-select";
import { blackA, mauve, violet } from "@radix-ui/colors";
import { styled } from "@stitches/react";

/* eslint sort-keys: 0 */

export const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 13,
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: "white",
  color: "$black80",
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  "&:hover": { backgroundColor: "$black10" },
  "&:focus": { boxShadow: `0 0 0 2px black` },
  "&[data-placeholder]": { color: "$black80" },
});

export const StyledIcon = styled(SelectPrimitive.SelectIcon, {
  color: "$black80",
});

export const StyledContent = styled(SelectPrimitive.Content, {
  overflow: "hidden",
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
});

export const StyledViewport = styled(SelectPrimitive.Viewport, {
  padding: 5,
});

export const StyledItem = styled(SelectPrimitive.Item, {
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  color: "$black80",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 35px 0 25px",
  position: "relative",
  userSelect: "none",

  "&[data-disabled]": {
    color: mauve.mauve8,
    pointerEvents: "none",
  },

  "&[data-highlighted]": {
    backgroundColor: "$black20",
    color: "$black80",
  },
});

export const StyledLabel = styled(SelectPrimitive.Label, {
  padding: "0 25px",
  fontSize: 12,
  lineHeight: "25px",
  color: mauve.mauve11,
});

export const StyledSeparator = styled(SelectPrimitive.Separator, {
  height: 1,
  backgroundColor: violet.violet6,
  margin: 5,
});

export const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const scrollButtonStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 25,
  backgroundColor: "white",
  color: violet.violet11,
  cursor: "default",
};

export const StyledScrollUpButton = styled(
  SelectPrimitive.ScrollUpButton,
  scrollButtonStyles,
);

export const StyledScrollDownButton = styled(
  SelectPrimitive.ScrollDownButton,
  scrollButtonStyles,
);
