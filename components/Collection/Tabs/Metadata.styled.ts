import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ActionHeader = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const GroupedList = styled("ul", {
  listStyle: "none",
  padding: 0,

  "& li": {
    paddingBottom: "$gr2",
    fontSize: "$gr4",
  },
});

export { ActionHeader, GroupedList };
