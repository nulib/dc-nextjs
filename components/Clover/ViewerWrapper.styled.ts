import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ViewerWrapperStyled = styled("section", {
  position: "relative",
  zIndex: "1",

  ".clover-viewer-painting": {
    background: "#f0f0f0",
  },

  "& label[for='information-toggle']": {
    boxShadow: "none",
  },
});

const AnnouncementContent = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& svg": {
    height: "$gr4",
    fill: "$black80",
    marginRight: "$gr1",
  },
});

export { AnnouncementContent, ViewerWrapperStyled };
