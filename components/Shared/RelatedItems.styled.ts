import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const RelatedItemsStyled = styled("section", {
  marginBottom: "$5",

  "> h2": {
    color: "$black50",
    fontFamily: "$displayExtraLight",
    fontSize: "$5",
    fontWeight: "400",
    marginBottom: "$5",
  },

  "> div": {
    padding: "0 0 $4",
  },

  [`& .bloom-header-label`]: {
    display: "block",
    color: "$purple",
    fontFamily: "$displayBold",
  },

  figcaption: {
    fontFamily: "$sansRegular !important",
    fontWeight: "400",

    "> span": {
      fontSize: "$2",
      color: "$black50",
      marginTop: "6px",
    },

    "> span:first-child": {
      fontSize: "$3",
      color: "$purple",
      fontWeight: "400",
      lineHeight: "1.15em",
    },
  },

  [`& a:hover figcaption, & a:focus figcaption`]: {
    color: "$purple !important",
  },
});

export { RelatedItemsStyled };
