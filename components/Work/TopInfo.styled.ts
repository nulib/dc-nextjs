import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ActionButtons = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  padding: "1rem 0",
});

const MetadataWrapper = styled("div", {
  border: "3px dashed $black10",
  height: "200px",
  padding: "2rem",
  width: "100%",
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
