import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ActionButtons = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  padding: "1rem 0",

  "@sm": {
    flexDirection: "column",
    "& button": {
      marginRight: "0",
    },
  },
});

const MetadataWrapper = styled("div", {
  "& dt": {
    fontSize: "0.75rem",
    fontWeight: "bold",
    paddingBottom: "0.5rem",
    textTransform: "uppercase",
  },
  "& dd": {
    marginInlineStart: "0",
    paddingBottom: "1.25rem",
  },
});

const TopInfoWrapper = styled("section", {
  display: "grid",
  gap: "2rem",
  gridTemplateColumns: "2fr 1fr",
  margin: "2rem 0",

  "@md": {
    gridTemplateColumns: "1fr",
  },
});

export { ActionButtons, MetadataWrapper, TopInfoWrapper };
