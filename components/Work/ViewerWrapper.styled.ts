import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ViewerWrapperStyled = styled("section", {
  position: "relative",
  zIndex: "0",
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
