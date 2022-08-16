/* eslint sort-keys: 0 */

import { styled } from "@/stitches.config";

const Content = styled("div", {
  width: "61.8%",

  h2: {
    fontFamily: "$displayBold",
    margin: "0 0 $gr2",
    fontSize: "$gr6",
    fontWeight: "400",
    lineHeight: "1.15",
  },

  p: {
    fontFamily: "$sansLight",
    fontSize: "$4",
    lineHeight: "1.55em",
    margin: "0 0 $gr4",
    padding: "0",
  },
});

const Images = styled("div", {
  width: "38.2%",
  display: "grid",
  gridTemplateColumns: "1fr 2fr 3fr 3fr 3fr 1fr",
  gridTemplateRows: "repeat(6,auto)",
  gridGap: "$gr2",
  marginLeft: "$gr5",

  "img, video": {
    width: "100%",
    height: "auto",
    display: "inline-block",
    borderRadius: "3px",
    objectFit: "cover",

    "&:nth-child(1)": {
      gridColumn: "4/5",
      gridRow: "3/7",
      height: "150px",
      width: "auto",
    },
    "&:nth-child(2)": {
      gridColumn: "3/4",
      gridRow: "4/6",
    },
    "&:nth-child(3)": {
      gridColumn: "5/7",
      gridRow: "3/5",
    },
    "&:nth-child(4)": {
      gridColumn: "2/4",
      gridRow: "3/4",
    },
    "&:nth-child(5)": {
      alignSelf: "end",
      gridColumn: "1/4",
      gridRow: "1/3",
      height: "110px",
    },
    "&:nth-child(6)": {
      alignSelf: "end",
      gridColumn: "4/6",
      gridRow: "1/3",
    },
  },
});

const Inner = styled("div", {
  display: "flex",
  padding: "$gr6",
  width: "auto",
  alignItems: "center",
});

const OverviewStyled = styled("section", {});

export { Content, Images, Inner, OverviewStyled };
