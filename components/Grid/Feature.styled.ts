import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const GridFeatureItems = styled("div", {
  display: "flex",
  width: "100%",

  figure: {
    padding: "0",
    margin: "0",
  },

  "@md": {
    flexDirection: "column",
  },
});

const GridFeaturePrimary = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "50%",
  flexShrink: "0",

  "@md": {
    width: "100%",
  },
});

const GridFeatureSecondary = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  width: "50%",
  flexShrink: "1",

  "@md": {
    width: "100%",
  },

  "> *": {
    width: "50%",
    padding: "0 0 $gr4 $gr5",

    "@md": {
      padding: "$gr4 0 0 0",

      "&:nth-child(2n + 1)": {
        paddingRight: "calc($gr4 / 2)",
      },

      "&:nth-child(2n + 2)": {
        paddingLeft: "calc($gr4 / 2)",
      },
    },
  },
});

const GridFeatureStyled = styled("div", {
  position: "relative",
  zIndex: "0",
});

export {
  GridFeatureItems,
  GridFeaturePrimary,
  GridFeatureSecondary,
  GridFeatureStyled,
};
