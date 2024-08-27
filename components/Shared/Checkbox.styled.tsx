import * as Checkbox from "@radix-ui/react-checkbox";

import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

export const CheckboxRoot = styled(Checkbox.Root, {
  display: "flex",
  marginRight: "$gr1",
  width: "$gr3",
  height: "$gr3",
  flexGrow: "0",
  flexShrink: "0",
  backgroundColor: "$white",
  border: "1px solid $black10",
  padding: "0",
  cursor: "pointer",
  borderRadius: "3px",
  color: "$white",

  svg: {
    padding: "2px",
  },

  "&:hover, &:focus": {
    borderColor: "$black20",
    boxShadow: "2px 2px 5px #0002",
    color: "$white",
  },
});

export const CheckboxIndicator = styled(Checkbox.Indicator, {
  display: "flex",
  width: "$gr3",
  height: "$gr3",
  backgroundColor: "$purple",
  margin: "-1px 0 0 -1px",
  borderRadius: "3px",
});
