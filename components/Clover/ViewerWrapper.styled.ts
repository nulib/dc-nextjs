import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ViewerWrapperStyled = styled("section", {
  position: "relative",
  zIndex: "1",
  margin: "1px 0 0 0",

  "[class*='-css']": {
    boxShadow: "3px 3px 11px #0002",
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
