import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const ViewerWrapperStyled = styled("section", {
  position: "relative",
  zIndex: "1",

  ".clover-viewer-painting": {
    background: "#f0f0f0",
  },

  ".clover-viewer-header": {
    display: "none",
  },

  ".clover-viewer-media-wrapper": {
    "div[role='radiogroup']": {
      paddingBottom: "0",
    },
  },

  ".clover-iiif-annotation-item": {
    button: {
      border: "none",
      background: "none",
      cursor: "pointer",
    },

    "&[data-format='text/html']": {
      "button > div": {
        display: "flex",
        flexDirection: "column",
        gap: "$gr1",
        lineHeight: "1.35em",

        em: {
          display: "flex",
          fontSize: "$gr2",
          lineHeight: "1rem",
          color: "$black50",
        },
      },
    },
  },

  ".clover-iiif-image-openseadragon-annotation": {
    fontSize: "$gr3",

    label: {
      display: "flex",
      flexDirection: "column",
      gap: "$gr1",
      lineHeight: "1.35em !important",

      em: {
        fontSize: "$gr2",
        fontWeight: "500",
        color: "$black20",
        lineHeight: "1rem",
      },
    },
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
